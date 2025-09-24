import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useGetOrdersByUserIdQuery } from "@/lib/api";
import { Link } from "react-router";

function MyOrdersPage() {
    const { user } = useUser();
    const userId = user?.id;

    const { data: ordersData, isLoading, isError, error } = useGetOrdersByUserIdQuery(
        userId,
        { skip: !userId }
    );

    const orders = ordersData?.orders || [];

    return (
        <main className="bg-gradient-to-br from-pink-50 via-white to-rose-100 min-h-screen py-12 px-4 lg:px-16">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-4xl font-extrabold text-pink-700 mb-10 text-center tracking-tight">
                    My Orders
                </h2>

                {/* Signed Out */}
                <SignedOut>
                    <div className="bg-white rounded-3xl shadow-xl p-10 text-center animate-fadeIn">
                        <h3 className="text-3xl font-bold text-gray-900 mb-4">Please Sign In</h3>
                        <p className="text-gray-500 mb-6 text-lg">You need to be signed in to view your orders.</p>
                        <Link
                            to="/sign-in"
                            className="px-6 py-3 rounded-full bg-pink-700 text-white font-semibold hover:bg-pink-900 transition text-lg"
                        >
                            Sign In
                        </Link>
                    </div>
                </SignedOut>

                {/* Signed In */}
                <SignedIn>
                    <div className="space-y-8">
                        {/* Loading State */}
                        {isLoading && (
                            <div className="space-y-4 animate-pulse">
                                {[...Array(3)].map((_, idx) => (
                                    <div key={idx} className="h-48 rounded-2xl bg-pink-100 shadow-md"></div>
                                ))}
                            </div>
                        )}

                        {/* Error State */}
                        {isError && (
                            <div className="text-center py-12 text-red-500">
                                <p className="text-lg font-semibold mb-4">⚠️ Failed to load orders.</p>
                                <pre className="text-xs text-gray-400">{JSON.stringify(error, null, 2)}</pre>
                            </div>
                        )}

                        {/* Orders List */}
                        {!isLoading && !isError && (
                            <>
                                {orders.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {orders.map((order) => (
                                            <div
                                                key={order._id}
                                                className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:-translate-y-1 border border-pink-100"
                                            >
                                                <div className="flex justify-between items-center mb-3">
                                                    <span className="font-bold text-pink-700 text-lg">
                                                        Order #{order._id.slice(-6).toUpperCase()}
                                                    </span>
                                                    <span className="text-xs bg-pink-100 text-pink-700 px-3 py-1 rounded-full font-semibold">
                                                        {order.orderStatus || "Processing"}
                                                    </span>
                                                </div>

                                                <div className="space-y-1 text-gray-700">
                                                    <p>
                                                        <span className="font-semibold">Date:</span>{" "}
                                                        {new Date(order.createdAt).toLocaleDateString()}
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">Total:</span>{" "}
                                                        <span className="text-pink-700 font-bold">
                                                            ${order.totalPrice?.toFixed(2) || "N/A"}
                                                        </span>
                                                    </p>
                                                    <p>
                                                        <span className="font-semibold">Shipping:</span>{" "}
                                                        {order.shippingAddress?.line_1}, {order.shippingAddress?.city}
                                                    </p>
                                                </div>

                                                <div className="mt-4">
                                                    <h4 className="font-semibold text-gray-900 mb-2">Items:</h4>
                                                    <ul className="list-disc pl-5 text-gray-700 space-y-1">
                                                        {order.items.map((item, idx) => (
                                                            <li key={idx}>
                                                                <span className="font-bold text-pink-700">{item.productId}</span>{" "}
                                                                x {item.quantity}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-500 text-lg space-y-2">
                                        <p>You have no orders yet.</p>
                                        <p className="text-gray-400 text-sm">Once you place an order, it will appear here.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </SignedIn>
            </div>
        </main>
    );
}

export default MyOrdersPage;
