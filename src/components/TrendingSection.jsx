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
        return <p className="text-center py-8">Loading...</p>;
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
        <section className="px-4 lg:px-16 py-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
                <h2 className="text-2xl sm:text-3xl">Trending</h2>
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 md:gap-x-4 md:gap-y-8">
                {filteredProducts.map((product) => (
                    <SimpleProductCard key={product._id} product={product} />
                ))}
            </div>
        </section>
    );
}

export default TrendingSection;
