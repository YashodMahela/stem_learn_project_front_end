import { Navigate } from "react-router";
import { useSelector } from "react-redux";
import CartItem from "@/components/CartItem";
import ShippingAddressForm from "@/components/ShippingAddressForm";

function CheckoutPage() {
    const cart = useSelector((state) => state.cart.cartItems);

    if (cart.length === 0) {
        return <Navigate to="/" />;
    }

    return (
        <main className="bg-gradient-to-br from-pink-50 via-white to-rose-100 min-h-screen py-12 px-4 lg:px-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold text-pink-700 mb-6 text-center tracking-tight">
                    Checkout
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Order Details */}
                    <section className="bg-white rounded-2xl shadow-xl p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Order Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {cart.map((item, index) => (
                                <CartItem key={index} item={item} />
                            ))}
                        </div>
                    </section>
                    {/* Shipping Address Form */}
                    <section>
                        <ShippingAddressForm />
                    </section>
                </div>
            </div>
        </main>
    );
}

export default CheckoutPage;
