import React, { useState } from 'react';
import { ChevronDown, XCircle, Filter, Sparkles, SlidersHorizontal, X } from 'lucide-react';
import { useNavigate } from 'react-router';

function ShopFilters({ colors = [], categories = [], currentFilters, onFilterChange, loading }) {
    const navigate = useNavigate();
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCategoryChange = (selectedCategory) => {
        if (selectedCategory === 'all') {
            navigate('/shop', { replace: true });
        } else {
            navigate(`/shop/${selectedCategory}`, { replace: true });
        }
    };

    const clearAllFilters = () => {
        handleCategoryChange('all');
        onFilterChange('color', 'all');
        onFilterChange('sortOrder', 'default');
    };

    const hasActiveFilters = currentFilters.category !== 'all' || 
                            currentFilters.color !== 'all' || 
                            (currentFilters.sortOrder && currentFilters.sortOrder !== 'default');

    return (
        <div className="relative mb-8">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/50 via-purple-50/30 to-rose-50/50 rounded-3xl blur-sm"></div>
            <div className="absolute top-4 right-4 w-24 h-24 bg-pink-200/20 rounded-full blur-2xl"></div>
            <div className="absolute bottom-4 left-4 w-32 h-32 bg-purple-200/20 rounded-full blur-3xl"></div>

            <div className="relative bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-rose-600 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                                <SlidersHorizontal className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-white tracking-tight">Shop Filters</h2>
                                <p className="text-white/80 text-sm">Customize your shopping experience</p>
                            </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                            {hasActiveFilters && (
                                <button
                                    onClick={clearAllFilters}
                                    className="flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:scale-105"
                                >
                                    <X className="w-4 h-4" />
                                    Clear All
                                </button>
                            )}
                            
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="md:hidden bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-full transition-all duration-200"
                            >
                                <Filter className={`w-5 h-5 text-white transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Content */}
                <div className={`p-6 transition-all duration-300 ${isExpanded ? 'block' : 'hidden md:block'}`}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        
                        {/* Category Filter */}
                        <div className="group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    value={currentFilters.category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="appearance-none w-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-pink-300 focus:border-pink-500 rounded-xl px-4 py-3 pr-12 focus:outline-none transition-all duration-200 font-medium text-gray-700 shadow-sm hover:shadow-md group-hover:bg-white"
                                    disabled={loading}
                                >
                                    <option value="all">✨ All Categories</option>
                                    {categories.map((category, index) => (
                                        <option key={category._id || index} value={category._id || category}>
                                            {category.name || category}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-5 h-5 text-pink-400 group-hover:text-pink-600 transition-colors" />
                                </div>
                                {loading && (
                                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Color Filter */}
                        <div className="group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                                Color
                            </label>
                            <div className="relative">
                                <select
                                    value={currentFilters.color}
                                    onChange={(e) => onFilterChange('color', e.target.value)}
                                    className="appearance-none w-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 rounded-xl px-4 py-3 pr-12 focus:outline-none transition-all duration-200 font-medium text-gray-700 shadow-sm hover:shadow-md group-hover:bg-white"
                                    disabled={loading}
                                >
                                    <option value="all">🎨 All Colors</option>
                                    {colors.map((color) => (
                                        <option key={color._id} value={color._id}>
                                            {color.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-5 h-5 text-blue-400 group-hover:text-blue-600 transition-colors" />
                                </div>
                                {loading && (
                                    <div className="absolute inset-0 bg-white/50 backdrop-blur-sm rounded-xl flex items-center justify-center">
                                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Sort by Price */}
                        <div className="group">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-3">
                                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                                Sort by Price
                            </label>
                            <div className="relative">
                                <select
                                    value={currentFilters.sortOrder || 'default'}
                                    onChange={(e) => onFilterChange('sortOrder', e.target.value)}
                                    className="appearance-none w-full bg-white/90 backdrop-blur-sm border-2 border-gray-200 hover:border-green-300 focus:border-green-500 rounded-xl px-4 py-3 pr-12 focus:outline-none transition-all duration-200 font-medium text-gray-700 shadow-sm hover:shadow-md group-hover:bg-white"
                                >
                                    <option value="default">💫 Default Order</option>
                                    <option value="asc">💰 Price: Low to High</option>
                                    <option value="desc">💎 Price: High to Low</option>
                                </select>
                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none">
                                    <ChevronDown className="w-5 h-5 text-green-400 group-hover:text-green-600 transition-colors" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Active Filters Display */}
                    {hasActiveFilters && (
                        <div className="border-t border-gray-200/50 pt-6">
                            <div className="flex items-center gap-3 mb-4">
                                <Sparkles className="w-5 h-5 text-purple-500" />
                                <h3 className="text-sm font-semibold text-gray-800">Active Filters</h3>
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                {currentFilters.category !== 'all' && (
                                    <div className="group relative">
                                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-pink-100 to-purple-100 text-pink-800 border border-pink-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
                                            <span className="mr-2 text-xs opacity-75">Category:</span>
                                            <span className="font-semibold">
                                                {categories.find(c => (c._id || c) === currentFilters.category)?.name ||
                                                    categories.find(c => c === currentFilters.category) ||
                                                    currentFilters.category.charAt(0).toUpperCase() + currentFilters.category.slice(1).replace('-', ' ')}
                                            </span>
                                            <button
                                                onClick={() => handleCategoryChange('all')}
                                                className="ml-2 p-1 rounded-full hover:bg-pink-200 transition-colors group-hover:scale-110"
                                                type="button"
                                                aria-label="Clear category filter"
                                            >
                                                <XCircle className="w-4 h-4 text-pink-600" />
                                            </button>
                                        </span>
                                    </div>
                                )}

                                {currentFilters.color !== 'all' && (
                                    <div className="group relative">
                                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                                            <span className="mr-2 text-xs opacity-75">Color:</span>
                                            <span className="font-semibold">
                                                {colors.find(c => c._id === currentFilters.color)?.name || 'Selected'}
                                            </span>
                                            <button
                                                onClick={() => onFilterChange('color', 'all')}
                                                className="ml-2 p-1 rounded-full hover:bg-blue-200 transition-colors group-hover:scale-110"
                                                type="button"
                                                aria-label="Clear color filter"
                                            >
                                                <XCircle className="w-4 h-4 text-blue-600" />
                                            </button>
                                        </span>
                                    </div>
                                )}

                                {currentFilters.sortOrder && currentFilters.sortOrder !== 'default' && (
                                    <div className="group relative">
                                        <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200/50 shadow-sm hover:shadow-md transition-all duration-200">
                                            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                                            <span className="mr-2 text-xs opacity-75">Price:</span>
                                            <span className="font-semibold">
                                                {currentFilters.sortOrder === 'asc' ? 'Low to High' : 'High to Low'}
                                            </span>
                                            <button
                                                onClick={() => onFilterChange('sortOrder', 'default')}
                                                className="ml-2 p-1 rounded-full hover:bg-green-200 transition-colors group-hover:scale-110"
                                                type="button"
                                                aria-label="Clear price sort"
                                            >
                                                <XCircle className="w-4 h-4 text-green-600" />
                                            </button>
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom decoration */}
                <div className="h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-rose-500"></div>
            </div>
        </div>
    );
}

export default ShopFilters;