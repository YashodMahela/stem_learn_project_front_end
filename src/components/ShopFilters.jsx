import React from 'react';
import { ChevronDown, XCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

function ShopFilters({ colors = [], categories = [], currentFilters, onFilterChange, loading }) {
    const navigate = useNavigate();

    const handleCategoryChange = (selectedCategory) => {
        if (selectedCategory === 'all') {
            navigate('/shop', { replace: true });
        } else {
            navigate(`/shop/${selectedCategory}`, { replace: true });
        }
    };

    return (
        <div className="bg-gradient-to-r from-rose-700 via-rose-800 to-rose-900 p-8 rounded-xl shadow-lg border mb-8">
            <h2 className="text-2xl font-bold text-white mb-6 tracking-tight">Shop Filters</h2>
            <div className="flex flex-wrap gap-8 items-center">

                {/* Category Filter */}
                <div className="flex flex-col min-w-[200px] bg-white/80 rounded-lg p-4 shadow transition hover:shadow-md">
                    <label className="text-md font-semibold text-rose-900 mb-2">
                        Category
                    </label>
                    <div className="relative">
                        <select
                            value={currentFilters.category}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full transition"
                            disabled={loading}
                        >
                            <option value="all">All Categories</option>
                            {categories.map((category, index) => (
                                <option key={category._id || index} value={category._id || category}>
                                    {category.name || category}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400 pointer-events-none" />
                    </div>
                </div>

                {/* Color Filter */}
                <div className="flex flex-col min-w-[200px] bg-white/80 rounded-lg p-4 shadow transition hover:shadow-md">
                    <label className="text-md font-semibold text-rose-900 mb-2">
                        Color
                    </label>
                    <div className="relative">
                        <select
                            value={currentFilters.color}
                            onChange={(e) => onFilterChange('color', e.target.value)}
                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full transition"
                            disabled={loading}
                        >
                            <option value="all">All Colors</option>
                            {colors.map((color) => (
                                <option key={color._id} value={color._id}>
                                    {color.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400 pointer-events-none" />
                    </div>
                </div>

                {/* Sort by Price */}
                <div className="flex flex-col min-w-[200px] bg-white/80 rounded-lg p-4 shadow transition hover:shadow-md">
                    <label className="text-md font-semibold text-rose-900 mb-2">
                        Sort by Price
                    </label>
                    <div className="relative">
                        <select
                            value={currentFilters.sortOrder || 'default'}
                            onChange={(e) => {
                                onFilterChange('sortOrder', e.target.value);
                            }}
                            className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent w-full transition"
                        >
                            <option value="default">Default</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-rose-400 pointer-events-none" />
                    </div>
                </div>

                {/* Active Filters Display */}
                {(currentFilters.category !== 'all' || currentFilters.color !== 'all' || (currentFilters.sortOrder && currentFilters.sortOrder !== 'default')) && (
                    <div className="flex flex-wrap gap-3 ml-auto">
                        {currentFilters.category !== 'all' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 shadow">
                                <span className="mr-2">Category:</span>
                                {categories.find(c => (c._id || c) === currentFilters.category)?.name ||
                                    categories.find(c => c === currentFilters.category) ||
                                    currentFilters.category.charAt(0).toUpperCase() + currentFilters.category.slice(1).replace('-', ' ')}
                                <button
                                    onClick={() => handleCategoryChange('all')}
                                    className="ml-2 text-purple-600 hover:text-purple-800"
                                    type="button"
                                    aria-label="Clear category filter"
                                >
                                    <XCircle className="w-4 h-4" />
                                </button>
                            </span>
                        )}
                        {currentFilters.color !== 'all' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 shadow">
                                <span className="mr-2">Color:</span>
                                {colors.find(c => c._id === currentFilters.color)?.name || 'Selected'}
                                <button
                                    onClick={() => onFilterChange('color', 'all')}
                                    className="ml-2 text-blue-600 hover:text-blue-800"
                                    type="button"
                                    aria-label="Clear color filter"
                                >
                                    <XCircle className="w-4 h-4" />
                                </button>
                            </span>
                        )}
                        {currentFilters.sortOrder && currentFilters.sortOrder !== 'default' && (
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 shadow">
                                <span className="mr-2">Price:</span>
                                {currentFilters.sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
                                <button
                                    onClick={() => {
                                        onFilterChange('sortOrder', 'default');
                                    }}
                                    className="ml-2 text-green-600 hover:text-green-800"
                                    type="button"
                                    aria-label="Clear price sort"
                                >
                                    <XCircle className="w-4 h-4" />
                                </button>
                            </span>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ShopFilters;