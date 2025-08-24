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
    const products = data?.products || data || []; // Your API might return products directly
    const totalProducts = data?.total || data?.length || products.length || 0;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center py-12">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        console.error('API Error:', error);
        return (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                Error: {error.message || error.data?.message || 'Failed to load products'}
                <details className="mt-2 text-sm">
                    <summary>Error Details</summary>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </details>
            </div>
        );
    }

    // Check if products is actually an array
    if (!Array.isArray(products)) {
        console.error('Products is not an array:', products);
        return (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded mb-6">
                Data format issue: Expected array of products but got: {typeof products}
                <details className="mt-2 text-sm">
                    <summary>Data Details</summary>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </details>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-12 w-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-6a2 2 0 00-2 2v1a2 2 0 01-2 2H8a2 2 0 01-2-2v-1a2 2 0 00-2-2H4" />
                    </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to see more results.</p>
                
                {/* Debug info */}
                <details className="mt-4 text-sm text-left max-w-md mx-auto">
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
        <div className="relative">
            {/* Loading overlay when fetching new data */}
            {isFetching && (
                <div className="absolute inset-0 bg-white bg-opacity-75 z-10 flex justify-center items-center">
                    <LoadingSpinner />
                </div>
            )}

            {/* Results count */}
            <div className="mb-6">
                <p className="text-gray-600">
                    {totalProducts} {totalProducts === 1 ? 'product' : 'products'} found
                </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product, index) => {
                    if (!product._id && !product.id) {
                        console.warn('Product missing ID:', product);
                        return null;
                    }
                    return (
                        <SimpleProductCard 
                            key={product._id || product.id || index} 
                            product={product} 
                        />
                    );
                })}
            </div>

            {/* Pagination (if needed) */}
            {data?.totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                    <div className="text-sm text-gray-500">
                        Page {data.page} of {data.totalPages}
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductListView;