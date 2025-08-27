import React from 'react';
import { useGetFilteredProductsQuery } from '../lib/api';
import SimpleProductCard from './SimpleProductCard';
import LoadingSpinner from './LoadingSpinner';

function ProductListView({ filters }) {
    const { 
        data, 
        error, 
        isLoading, 
        isFetching 
    } = useGetFilteredProductsQuery(filters);
    const products = data?.products || data || [];
    const totalProducts = data?.total || data?.length || products.length || 0;

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
                <img src="https://undraw.co/api/illustrations/empty_cart.svg" alt="No products" className="h-32 mb-6 opacity-80" />
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

    return (
        <div className="relative bg-white rounded-2xl shadow-xl p-6">
            {/* Loading overlay when fetching new data */}
            {isFetching && (
                <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex justify-center items-center rounded-2xl">
                    <LoadingSpinner />
                </div>
            )}

            {/* Results count */}
            <div className="mb-6 flex items-center gap-2">
                <svg className="h-6 w-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M3 17h18" />
                </svg>
                <span className="text-gray-700 font-medium">
                    {totalProducts} {totalProducts === 1 ? 'product' : 'products'} found
                </span>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {products.map((product, index) => {
                    if (!product._id && !product.id) {
                        return null;
                    }
                    return (
                        <div
                            key={product._id || product.id || index}
                            className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl"
                        >
                            <SimpleProductCard product={product} />
                        </div>
                    );
                })}
            </div>

            {/* Pagination (if needed) */}
            {data?.totalPages > 1 && (
                <div className="mt-10 flex justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 rounded-full shadow text-sm text-gray-600">
                        <span>Page</span>
                        <span className="font-bold text-pink-700">{data.page}</span>
                        <span>of</span>
                        <span className="font-bold text-pink-700">{data.totalPages}</span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductListView;