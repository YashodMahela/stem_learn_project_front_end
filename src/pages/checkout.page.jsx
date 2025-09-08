import { Navigate } from "react-router"; 
import { useSelector } from "react-redux"; 
import CartItem from "@/components/CartItem"; 
import ShippingAddressForm from "@/components/ShippingAddressForm";
import { ShoppingBag, CreditCard, Truck, Shield, ArrowLeft } from "lucide-react";
import { Link } from "react-router";

function CheckoutPage() {
    const cart = useSelector((state) => state.cart.cartItems);
    
    if (cart.length === 0) {
        return <Navigate to="/" />;
    }

    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    const shipping = subtotal > 100 ? 0 : 15; // Free shipping over $100
    const tax = subtotal * 0.08; // 8% tax
    const total = subtotal + shipping + tax;

    return (
        <main className="relative min-h-screen py-8 px-4 lg:px-16">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-rose-50/30"></div>
            <div className="absolute top-20 right-20 w-40 h-40 bg-pink-200/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-32 left-20 w-56 h-56 bg-purple-200/20 rounded-full blur-3xl"></div>
            
            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Link 
                            to="/shop/cart" 
                            className="flex items-center gap-2 text-pink-600 hover:text-pink-800 font-medium transition-colors group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Back to Cart
                        </Link>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 mb-6">
                        <div className="bg-gradient-to-r from-pink-600 to-purple-600 p-3 rounded-full shadow-lg">
                            <CreditCard className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-5xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                            Checkout
                        </h1>
                    </div>
                    
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        🛍️ You're just one step away from getting your amazing products delivered to your doorstep!
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full border border-green-200">
                            <ShoppingBag className="w-4 h-4" />
                            <span className="font-medium text-sm">Cart</span>
                        </div>
                        <div className="w-8 h-0.5 bg-gradient-to-r from-green-400 to-pink-400"></div>
                        <div className="flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-lg">
                            <CreditCard className="w-4 h-4" />
                            <span className="font-medium text-sm">Checkout</span>
                        </div>
                        <div className="w-8 h-0.5 bg-gray-300"></div>
                        <div className="flex items-center gap-2 bg-gray-100 text-gray-500 px-4 py-2 rounded-full">
                            <Truck className="w-4 h-4" />
                            <span className="font-medium text-sm">Delivery</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    
                    {/* Order Summary - Left Column */}
                    <div className="xl:col-span-2 space-y-8">
                        
                        {/* Order Items */}
                        <section className="relative">
                            <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                                {/* Section Header */}
                                <div className="bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-6">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                                            <ShoppingBag className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">Your Order</h2>
                                            <p className="text-white/80 text-sm">
                                                {cart.length} {cart.length === 1 ? 'item' : 'items'} ready for checkout
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Cart Items - Vertical Layout */}
                                <div className="p-8">
                                    <div className="space-y-6">
                                        {cart.map((item, index) => (
                                            <div 
                                                key={item.id || index}
                                                className="transform transition-all duration-300"
                                                style={{
                                                    animationDelay: `${index * 100}ms`,
                                                }}
                                            >
                                                <CartItem item={item} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Order Summary Totals */}
                                <div className="border-t border-gray-200/50 bg-gradient-to-br from-gray-50/50 to-white/50 p-8">
                                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full"></div>
                                        Order Summary
                                    </h3>
                                    
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                                            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">Shipping</span>
                                            <div className="text-right">
                                                {shipping === 0 ? (
                                                    <div>
                                                        <span className="font-semibold text-green-600">FREE</span>
                                                        <p className="text-xs text-green-600">Orders over $100</p>
                                                    </div>
                                                ) : (
                                                    <span className="font-semibold text-gray-900">${shipping.toFixed(2)}</span>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-600">Tax (8%)</span>
                                            <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
                                        </div>
                                        
                                        <div className="border-t border-gray-200 pt-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xl font-bold text-gray-900">Total</span>
                                                <span className="text-2xl font-black bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                                    ${total.toFixed(2)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Shipping & Payment - Right Column */}
                    <div className="xl:col-span-1">
                        <div className="sticky top-8 space-y-8">
                            
                            {/* Shipping Address Form */}
                            <section className="relative">
                                <div className="bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-white/20 backdrop-blur-sm p-2 rounded-full">
                                                <Truck className="w-5 h-5 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-white">Delivery Details</h3>
                                                <p className="text-white/80 text-xs">Where should we send your order?</p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="p-6">
                                        <ShippingAddressForm />
                                    </div>
                                </div>
                            </section>

                            {/* Security Badge */}
                            <section className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200/50 rounded-2xl p-6 text-center">
                                <div className="flex items-center justify-center gap-3 mb-4">
                                    <Shield className="w-8 h-8 text-green-600" />
                                    <h4 className="text-lg font-bold text-green-800">Secure Checkout</h4>
                                </div>
                                <p className="text-green-700 text-sm leading-relaxed">
                                    🔒 Your payment information is encrypted and secure. 
                                    We never store your card details.
                                </p>
                            </section>

                            {/* Features */}
                            <section className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200/50 rounded-2xl p-6">
                                <h4 className="text-lg font-bold text-purple-800 mb-4 text-center">Why Shop With Us?</h4>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                                        <span className="text-purple-700 text-sm font-medium">Free shipping on orders $100+</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                                        <span className="text-purple-700 text-sm font-medium">30-day return guarantee</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                                        <span className="text-purple-700 text-sm font-medium">24/7 customer support</span>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default CheckoutPage;