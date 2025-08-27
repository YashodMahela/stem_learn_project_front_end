import SimpleProductCard from "./SimpleProductCard";
import CategoryButton from "./CategoryButton";
import { useState } from "react";
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

    // Handle loading
    if (categoriesLoading || productsLoading) {
        return (
            <div className="flex justify-center items-center py-16">
                <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></span>
                <span className="ml-4 text-pink-700 font-semibold">Loading trending products...</span>
            </div>
        );
    }

    // Handle error
    if (categoriesError || productsError) {
        return (
            <div className="text-center py-8 text-red-500">
                <p>⚠️ Failed to load data.</p>
                <pre>{JSON.stringify(categoriesFetchError || productsFetchError, null, 2)}</pre>
            </div>
        );
    }

    // Filter products
    const filteredProducts =
        selectedCategoryId === "ALL"
            ? products
            : products.filter((product) => product.categoryId === selectedCategoryId);

    return (
        <section className="px-4 lg:px-16 py-12">
            <div className="bg-white/90 rounded-2xl shadow-xl p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">🔥 Trending Now</h2>
                        <p className="text-gray-600 text-base max-w-xl">
                            Discover the most popular picks this week. Shop the latest styles, colors, and categories everyone loves!
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-x-4 max-w-full overflow-x-auto pb-2">
                        <CategoryButton
                            key="ALL"
                            category={{ _id: "ALL", name: "All" }}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-x-6 md:gap-y-10">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <div className="transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl">
                                <SimpleProductCard key={product._id} product={product} />
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-gray-500 text-lg">
                            No trending products found in this category.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default TrendingSection;