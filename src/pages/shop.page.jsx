import React from 'react';
import { useParams, useSearchParams } from 'react-router';
import ProductListView from '../components/ProductListView';
import ShopFilters from '../components/ShopFilters';
import { useGetAllColorsQuery,useGetAllCategoriesQuery } from '../lib/api';

function ShopPage() {
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    // Get current filters from URL
    const currentFilters = {
        category: category || 'all',
        color: searchParams.get('color') || 'all',
        sortOrder: searchParams.get('sortOrder') || 'asc',
    };

    // Fetch colors for filter dropdown
    const { data: colorsData, isLoading: colorsLoading } = useGetAllColorsQuery();
    const { data: categoriesData, isLoading: categoriesLoading } = useGetAllCategoriesQuery();
    const colors = colorsData || [];
    const categories = categoriesData || [];

    // Handle filter changes
    const handleFilterChange = (filterType, value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        
        if (value === 'all' || value === 'default') {
            newSearchParams.delete(filterType);
        } else {
            newSearchParams.set(filterType, value);
        }
        
        setSearchParams(newSearchParams);
    };

    // Get page title
    const getPageTitle = () => {
        if (currentFilters.category !== 'all') {
            return categories.find(c => (c._id || c) === currentFilters.category)?.name ||
                currentFilters.category.charAt(0).toUpperCase() + currentFilters.category.slice(1).replace('-', ' ');
        }
        return 'All Products';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {getPageTitle()}
                </h1>
            </div>

            {/* Filters */}
            <ShopFilters
                colors={colors}
                categories={categories}
                currentFilters={currentFilters}
                onFilterChange={handleFilterChange}
                loading={colorsLoading || categoriesLoading}
            />

            {/* Products List */}
            <ProductListView filters={currentFilters} />
        </div>
    );
}

export default ShopPage;