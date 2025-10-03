import React, { useState, useEffect } from 'react';
import { useGetFilteredProductsQuery } from '../lib/api';
import SimpleProductCard from './SimpleProductCard';
import LoadingSpinner from './LoadingSpinner';

function ProductListView({ filters }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(12);

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1);
    }, [filters]);

    const {
        data,
        error,
        isLoading,
        isFetching
    } = useGetFilteredProductsQuery(filters); // Remove pagination params from API call

    // Client-side pagination logic
    const allProducts = data?.products || data || [];
    const totalProducts = allProducts.length;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const products = allProducts.slice(startIndex, endIndex); // Slice for current page
    const currentPageFromData = currentPage;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 shadow">
                <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-1.414 1.414M6.343 17.657l-1.414-1.414M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Error: {error.message || error.data?.message || 'Failed to load products'}</span>
                </div>
                <details className="mt-2 text-sm">
                    <summary>Error Details</summary>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </details>
            </div>
        );
    }

    if (!Array.isArray(products)) {
        return (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-6 shadow">
                <div className="flex items-center gap-2">
                    <svg className="h-5 w-5 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Data format issue: Expected array of products but got: {typeof products}</span>
                </div>
                <details className="mt-2 text-sm">
                    <summary>Data Details</summary>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </details>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-16 bg-white rounded-xl shadow-lg">
                <div className="text-6xl mb-6 opacity-50">🔍</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters to see more results.</p>
                <details className="mt-2 text-sm text-left max-w-md mx-auto">
                    <summary className="cursor-pointer text-blue-600">Debug Info</summary>
                    <div className="bg-gray-100 p-2 rounded mt-2">
                        <p><strong>Filters:</strong> {JSON.stringify(filters)}</p>
                        <p><strong>Raw Data:</strong> {JSON.stringify(data)}</p>
                    </div>
                </details>
            </div>
        );
    }

    // Pagination helpers
    const getVisiblePages = () => {
        const delta = 2;
        const range = [];
        const rangeWithDots = [];
        let l;

        for (let i = Math.max(2, currentPageFromData - delta);
            i <= Math.min(totalPages - 1, currentPageFromData + delta);
            i++) {
            range.push(i);
        }

        if (currentPageFromData - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPageFromData + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else if (totalPages > 1) {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages && page !== currentPage) {
            setCurrentPage(page);
            // Scroll to top of product list
            document.querySelector('.product-list-container')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const handleItemsPerPageChange = (newItemsPerPage) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1);
    };

    return (
        <div className="product-list-container relative bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl p-6 lg:p-8 border border-gray-100">
            {/* Loading overlay when fetching new data */}
            {isFetching && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex justify-center items-center rounded-3xl">
                    <div className="flex flex-col items-center gap-4">
                        <LoadingSpinner />
                        <p className="text-gray-600 font-medium">Loading products...</p>
                    </div>
                </div>
            )}

            {/* Header with results count and items per page */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-full">
                        <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14-4V3m0 4V3m0 4l-4 4m4-4l-4-4" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-900">
                            {totalProducts} {totalProducts === 1 ? 'Product' : 'Products'} Found
                        </h3>
                        <p className="text-gray-600 text-sm">
                            Showing {((currentPageFromData - 1) * itemsPerPage) + 1}-{Math.min(currentPageFromData * itemsPerPage, totalProducts)} of {totalProducts}
                        </p>
                    </div>
                </div>

                {/* Items per page selector */}
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600 font-medium">Show:</span>
                    <select
                        value={itemsPerPage}
                        onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white shadow-sm"
                    >
                        <option value={8}>8</option>
                        <option value={12}>12</option>
                        <option value={16}>16</option>
                        <option value={24}>24</option>
                        <option value={48}>48</option>
                    </select>
                    <span className="text-sm text-gray-600">per page</span>
                </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8 mb-10">
                {products.map((product, index) => {
                    if (!product._id && !product.id) {
                        return null;
                    }
                    return (
                        <div
                            key={product._id || product.id || index}
                            className="group transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/50">
                                <SimpleProductCard product={product} />
                            </div>
                            {/* Hover glow effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/0 to-purple-400/0 group-hover:from-pink-400/10 group-hover:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                        </div>
                    );
                })}
            </div>

            {/* Enhanced Pagination */}
            {totalPages > 1 && (
                <div className="mt-12 space-y-6">
                    {/* Main pagination controls */}
                    <div className="flex justify-center">
                        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-xl border border-gray-200">
                            {/* Previous button */}
                            <button
                                onClick={() => handlePageChange(currentPageFromData - 1)}
                                disabled={currentPageFromData <= 1}
                                className={`p-3 rounded-full transition-all duration-200 flex items-center gap-2 ${currentPageFromData <= 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-pink-100 hover:text-pink-700'
                                    }`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                <span className="hidden sm:block font-medium">Previous</span>
                            </button>

                            {/* Page numbers */}
                            <div className="flex items-center gap-1 px-2">
                                {getVisiblePages().map((page, index) => (
                                    page === '...' ? (
                                        <span key={`dots-${index}`} className="px-2 py-1 text-gray-500">
                                            ...
                                        </span>
                                    ) : (
                                        <button
                                            key={page}
                                            onClick={() => handlePageChange(page)}
                                            className={`w-10 h-10 rounded-full font-semibold transition-all duration-200 ${page === currentPageFromData
                                                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg transform scale-110'
                                                    : 'text-gray-700 hover:bg-pink-100 hover:text-pink-700 hover:scale-105'
                                                }`}
                                        >
                                            {page}
                                        </button>
                                    )
                                ))}
                            </div>

                            {/* Next button */}
                            <button
                                onClick={() => handlePageChange(currentPageFromData + 1)}
                                disabled={currentPageFromData >= totalPages}
                                className={`p-3 rounded-full transition-all duration-200 flex items-center gap-2 ${currentPageFromData >= totalPages
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-700 hover:bg-pink-100 hover:text-pink-700'
                                    }`}
                            >
                                <span className="hidden sm:block font-medium">Next</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Quick jump options */}
                    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">Jump to page:</span>
                            <input
                                type="number"
                                min="1"
                                max={totalPages}
                                value={currentPageFromData}
                                onChange={(e) => {
                                    const page = parseInt(e.target.value);
                                    if (page >= 1 && page <= totalPages) {
                                        handlePageChange(page);
                                    }
                                }}
                                className="w-16 px-2 py-1 border border-gray-300 rounded text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
                            />
                            <span className="text-gray-600">of {totalPages}</span>
                        </div>

                        {/* Quick jump buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={currentPageFromData === 1}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${currentPageFromData === 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-pink-600 hover:bg-pink-100'
                                    }`}
                            >
                                First
                            </button>
                            <button
                                onClick={() => handlePageChange(totalPages)}
                                disabled={currentPageFromData === totalPages}
                                className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${currentPageFromData === totalPages
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-pink-600 hover:bg-pink-100'
                                    }`}
                            >
                                Last
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductListView;