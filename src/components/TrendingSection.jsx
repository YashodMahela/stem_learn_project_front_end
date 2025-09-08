import SimpleProductCard from "./SimpleProductCard";
import CategoryButton from "./CategoryButton";
import { useState } from "react";
import { Link } from "react-router";
import { useGetAllProductsQuery, useGetAllCategoriesQuery } from "../lib/api";

function TrendingSection() {
    const [selectedCategoryId, setSelectedCategoryId] = useState("ALL");
    
    // Fetch categories and products from API
    const {
        data: categories,
        isLoading: categoriesLoading,
        isError: categoriesError,
        error: categoriesFetchError,
    } = useGetAllCategoriesQuery();
    
    const {
        data: products,
        isLoading: productsLoading,
        isError: productsError,
        error: productsFetchError,
    } = useGetAllProductsQuery();

    // Handle loading with enhanced loading state
    if (categoriesLoading || productsLoading) {
        return (
            <section className="px-4 lg:px-16 py-12">
                <div className="bg-gradient-to-br from-white via-pink-50 to-purple-50 rounded-3xl shadow-2xl p-8 border border-pink-100">
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="relative">
                            <div className="animate-spin rounded-full h-12 w-12 border-4 border-pink-200 border-t-pink-600"></div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-20 animate-pulse"></div>
                        </div>
                        <p className="mt-6 text-pink-700 font-semibold text-lg animate-pulse">
                            Loading trending products...
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    // Handle error with improved error UI
    if (categoriesError || productsError) {
        return (
            <section className="px-4 lg:px-16 py-12">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-3xl shadow-2xl p-8 border border-red-200">
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">😕</div>
                        <p className="text-red-600 font-semibold text-lg mb-2">Oops! Something went wrong</p>
                        <p className="text-gray-600">Unable to load trending products right now</p>
                    </div>
                </div>
            </section>
        );
    }

    // Filter and sort products to get newest 6
    const getFilteredProducts = () => {
        let filtered = selectedCategoryId === "ALL" 
            ? [...products] // Create a copy to avoid mutating the original array
            : products.filter((product) => product.categoryId === selectedCategoryId);
        
        // Sort by creation date (assuming createdAt field exists) or by _id for newest first
        filtered = filtered.sort((a, b) => {
            // If createdAt exists, use it; otherwise use _id as proxy for creation order
            const dateA = new Date(a.createdAt || a._id);
            const dateB = new Date(b.createdAt || b._id);
            return dateB - dateA;
        });
        
        // Return only first 6 products
        return filtered.slice(0, 6);
    };

    const filteredProducts = getFilteredProducts();

    return (
        <section className="px-4 lg:px-16 py-12 relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-100/30 via-transparent to-purple-100/30 rounded-3xl"></div>
            
            <div className="relative bg-gradient-to-br from-white/95 via-pink-50/90 to-purple-50/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/50">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full p-2">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                                Trending Now
                            </h2>
                            <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-pulse">
                                HOT
                            </span>
                        </div>
                        <p className="text-gray-700 text-lg max-w-2xl leading-relaxed">
                            ✨ Discover the <span className="font-semibold text-pink-600">newest 6 products</span> that are taking the world by storm! 
                            Fresh picks, trending styles, and must-have items just for you.
                        </p>
                    </div>
                    
                    {/* Category Filters */}
                    <div className="flex flex-wrap items-center gap-2 lg:gap-3">
                        <CategoryButton
                            key="ALL"
                            category={{ _id: "ALL", name: "✨ All" }}
                            onClick={() => setSelectedCategoryId("ALL")}
                            selectedCategoryId={selectedCategoryId}
                        />
                        {categories.map((category) => (
                            <CategoryButton
                                key={category._id}
                                category={category}
                                onClick={() => setSelectedCategoryId(category._id)}
                                selectedCategoryId={selectedCategoryId}
                            />
                        ))}
                    </div>
                </div>

                {/* Products Grid */}
                <div className="relative">
                    {filteredProducts.length > 0 ? (
                        <>
                            {/* Products count indicator */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-2">
                                    <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                                        {filteredProducts.length} Latest Products
                                    </span>
                                    <span className="text-gray-500 text-sm">• Updated just now</span>
                                </div>
                            </div>
                            
                            {/* Responsive Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
                                {filteredProducts.map((product, index) => (
                                    <div 
                                        key={product._id} 
                                        className="group relative transition-all duration-300 hover:-translate-y-2 hover:scale-105"
                                        style={{
                                            animationDelay: `${index * 100}ms`,
                                        }}
                                    >
                                        {/* New badge for first 3 products */}
                                        {index < 3 && (
                                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10 animate-bounce">
                                                NEW
                                            </div>
                                        )}
                                        
                                        {/* Trending position badge */}
                                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm z-10 shadow-lg">
                                            #{index + 1}
                                        </div>
                                        
                                        {/* Enhanced card wrapper */}
                                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-1 shadow-lg group-hover:shadow-2xl transition-all duration-300 border border-white/50">
                                            <SimpleProductCard product={product} />
                                        </div>
                                        
                                        {/* Hover glow effect */}
                                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/0 to-purple-400/0 group-hover:from-pink-400/10 group-hover:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="col-span-full text-center py-20">
                            <div className="text-8xl mb-6 opacity-50">🔍</div>
                            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No trending products found</h3>
                            <p className="text-gray-500 text-lg">
                                No products available in this category yet. Check back soon for the latest trends!
                            </p>
                        </div>
                    )}
                </div>
                
                {/* View More Button */}
                {filteredProducts.length === 6 && (
                    <div className="text-center mt-10">
                        <Link to="/shop" className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                            View More Trending Products ✨
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

export default TrendingSection;