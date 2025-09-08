import React, { useState } from 'react';
import { ArrowLeft, Star, Minus, Plus } from 'lucide-react';
import { useGetProductByIdQuery } from '../lib/api';
import { useParams } from 'react-router';
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Button } from "@/components/ui/button";

function ProductPage() {
    const dispatch = useDispatch();
    const { id } = useParams(); // Route is /shop/products/:id

    console.log("URL Params:", useParams());
    console.log("Product ID from params:", id);

    const {
        data: product,
        error,
        isLoading
    } = useGetProductByIdQuery(id, {
        skip: !id // ✅ Skip query if id is undefined
    });

    console.log("Product:", product);
    console.log("Error:", error);
    console.log("Is Loading:", isLoading);

    const [quantity, setQuantity] = useState(1);

    const handleGoBack = () => {
        window.history.back();
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    // ✅ Show loading state while fetching
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    // ✅ Handle missing ID
    if (!id) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Invalid Product URL</h2>
                    <p className="text-gray-600 mb-6">No product ID found in the URL</p>
                    <button
                        onClick={() => window.location.href = '/shop'}
                        className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">
                        {error?.data?.message || error?.message || 'Unable to load product'}
                    </p>
                    <button
                        onClick={() => window.location.href = '/shop'}
                        className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">The requested product could not be found</p>
                    <button
                        onClick={() => window.location.href = '/shop'}
                        className="bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
                    >
                        Back to Shop
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back Button */}
                <button
                    onClick={handleGoBack}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </button>

                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Product Image */}
                        <div className="md:w-1/2">
                            <div className="aspect-square bg-gray-100 flex items-center justify-center">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="max-w-full max-h-full object-contain"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/400x400?text=No+Image';
                                    }}
                                />
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="md:w-1/2 p-8">
                            <div className="flex flex-col h-full">
                                <div>
                                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                        {product.name}
                                    </h1>
                                    <div className="flex items-center mb-4">
                                        <span className="text-3xl font-bold text-rose-600">
                                            ${product.price}
                                        </span>
                                    </div>

                                    {/* Stock Status */}
                                    <div className="flex items-center mb-6">
                                        <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${product.stock > 0
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-red-100 text-red-800'
                                            }`}>
                                            {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                                        </span>
                                    </div>

                                    {/* Description */}
                                    <div className="mb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Reviews */}
                                    {product.reviews && product.reviews.length > 0 && (
                                        <div className="mb-6">
                                            <div className="flex items-center">
                                                <div className="flex">
                                                    {[...Array(5)].map((_, i) => (
                                                        <Star
                                                            key={i}
                                                            className="w-5 h-5 text-yellow-400 fill-current"
                                                        />
                                                    ))}
                                                </div>
                                                <span className="ml-2 text-sm text-gray-600">
                                                    ({product.reviews.length} reviews)
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Add to Cart Section */}
                                <div className="mt-auto">
                                    {product.stock > 0 ? (
                                        <div className="space-y-4">
                                            {/* Quantity Selector */}
                                            <div className="flex items-center space-x-4">
                                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                                <div className="flex items-center border border-gray-300 rounded-lg">
                                                    <button
                                                        onClick={() => handleQuantityChange(-1)}
                                                        disabled={quantity <= 1}
                                                        className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <span className="px-4 py-2 text-center min-w-[3rem]">
                                                        {quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => handleQuantityChange(1)}
                                                        disabled={quantity >= product.stock}
                                                        className="p-2 text-gray-600 hover:text-gray-900 disabled:text-gray-300 disabled:cursor-not-allowed"
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Add to Cart Button */}
                                            <Button
                                                className="w-full"
                                                onClick={() =>
                                                    dispatch(
                                                        addToCart({
                                                            _id: product._id,
                                                            name: product.name,
                                                            price: product.price,
                                                            image: product.image,
                                                        })
                                                    )
                                                }
                                            >
                                                Add To Cart
                                            </Button>

                                            <div className="text-center text-sm text-gray-600">
                                                Total: <span className="font-semibold">${(product.price * quantity).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    ) : (
                                        <button
                                            disabled
                                            className="w-full bg-gray-400 text-white py-4 px-6 rounded-lg font-semibold cursor-not-allowed"
                                        >
                                            Out of Stock
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Product Information */}
                <div className="mt-8 bg-white rounded-lg shadow-lg p-8">
                    {/* Your additional content here */}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;