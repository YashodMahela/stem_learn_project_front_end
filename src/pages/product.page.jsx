
import React, { useState, useEffect } from 'react';
import { ShoppingCart, ArrowLeft, Star, Minus, Plus } from 'lucide-react';
import { useGetProductByIdQuery } from '../lib/api';
import { useParams } from 'react-router';

function ProductPage() {
    const { productId } = useParams();
    const {
        data: product,
        error,
    } = useGetProductByIdQuery(productId);

    console.log("Product:", product);
    // const [product, setProduct] = useState({
    //     "_id": "68a8b8b7f65a860ea074be98",
    //     "categoryId": "684ebece862a8fe09aa7b322",
    //     "name": "Nike Air Red",
    //     "price": 120,
    //     "stripePriceId": "price_123_air_red",
    //     "color_id": "68a887fd641b8ac5781b9ed1",
    //     "image": "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/015653e0-d381-4821-a6d3-aeadbd7f8a44/ZM+SUPERFLY+10+ACADEMY+IC.png",
    //     "stock": 50,
    //     "reviews": [],
    //     "description": "Stylish Nike Air sneakers in red color for everyday comfort.",
    //     "__v": 0
    // });
    const [loading, setLoading] = useState(false);
    // const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        // In a real app, you would fetch the product data here
        // fetchProduct();
        setLoading(false);
    }, []);

    const handleGoBack = () => {
        // In a real app with React Router, you would use navigate(-1)
        window.history.back();
    };

    const handleAddToCart = async () => {
        setAddingToCart(true);
        try {
            // Replace with your actual add to cart API call
            const response = await fetch('/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product._id,
                    quantity: quantity,
                }),
            });

            if (response.ok) {
                // Show success message or redirect
                alert('Product added to cart successfully!');
            } else {
                throw new Error('Failed to add to cart');
            }
        } catch (err) {
            alert('Error adding to cart: ' + err.message);
        } finally {
            setAddingToCart(false);
        }
    };

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity >= 1 && newQuantity <= product.stock) {
            setQuantity(newQuantity);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-rose-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
                    <p className="text-gray-600 mb-6">{error}</p>
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
        return null;
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
                                            <button
                                                onClick={handleAddToCart}
                                                disabled={addingToCart}
                                                className="w-full bg-rose-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-rose-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                            >
                                                {addingToCart ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                                        Adding to Cart...
                                                    </>
                                                ) : (
                                                    <>
                                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                                        Add to Cart
                                                    </>
                                                )}
                                            </button>

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
                    {/* <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Information</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                            <div className="space-y-2 text-gray-600">
                                <div className="flex justify-between">
                                    <span>Product ID:</span>
                                    <span className="font-mono text-sm">{product._id}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Category ID:</span>
                                    <span className="font-mono text-sm">{product.categoryId}</span>
                                </div>
                                {product.color_id && (
                                    <div className="flex justify-between">
                                        <span>Color ID:</span>
                                        <span className="font-mono text-sm">{product.color_id}</span>
                                    </div>
                                )}
                                {product.stripePriceId && (
                                    <div className="flex justify-between">
                                        <span>Stripe Price ID:</span>
                                        <span className="font-mono text-sm">{product.stripePriceId}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping & Returns</h3>
                            <div className="space-y-2 text-gray-600">
                                <p>• Free shipping on orders over $100</p>
                                <p>• 30-day return policy</p>
                                <p>• Ships within 1-2 business days</p>
                                <p>• Customer support available 24/7</p>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default ProductPage;