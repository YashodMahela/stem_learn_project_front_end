import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import { useGetOrdersByUserIdQuery } from "@/lib/api";
import { Link } from "react-router";

function MyOrdersPage() {
    const { user } = useUser();
    const userId = user?.id;
    console.log("Current User ID:", userId);
    
    // Fetch orders data
    const { data: ordersData, isLoading, isError, error } = useGetOrdersByUserIdQuery(userId, {
        skip: !userId,
    });
    
    // Extract the orders array from the response
    const orders = ordersData?.orders || []; // ✅ Access the orders property
    
    
    return (
        <main className="bg-gradient-to-br from-pink-50 via-white to-rose-100 min-h-screen py-12 px-4 lg:px-16">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-extrabold text-pink-700 mb-6 text-center tracking-tight">
                    My Orders
                </h2>
                <SignedOut>
                    <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">Please Sign In</h3>
                        <p className="text-gray-500 mb-6">You need to be signed in to view your orders.</p>
                        <Link
                            to="/sign-in"
                            className="px-6 py-2 rounded-full bg-pink-700 text-white font-semibold hover:bg-pink-900 transition text-lg"
                        >
                            Sign In
                        </Link>
                    </div>
                </SignedOut>
                <SignedIn>
                    <div className="bg-white rounded-2xl shadow-xl p-8">
                        {isLoading && (
                            <div className="flex justify-center items-center py-16">
                                <span className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-pink-600"></span>
                                <span className="ml-4 text-pink-700 font-semibold">Loading your orders...</span>
                            </div>
                        )}
                        {isError && (
                            <div className="text-center py-8 text-red-500">
                                <p>⚠️ Failed to load orders.</p>
                                <pre>{JSON.stringify(error, null, 2)}</pre>
                            </div>
                        )}
                        {!isLoading && !isError && (
                            <>
                                {/* ✅ Now checking the extracted orders array */}
                                {orders && orders.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {orders.map((order) => (
                                            <div key={order._id} className="border border-pink-100 rounded-xl shadow-lg p-6 bg-gradient-to-br from-pink-50 via-white to-rose-100">
                                                <div className="flex justify-between items-center mb-2">
                                                    <span className="font-bold text-pink-700">Order #{order._id.slice(-6).toUpperCase()}</span>
                                                    <span className="text-xs bg-pink-100 text-pink-700 px-2 py-1 rounded-full font-semibold">
                                                        {order.orderStatus || "Processing"}
                                                    </span>
                                                </div>
                                                <div className="mb-2 text-gray-700">
                                                    <span className="font-semibold">Date:</span>{" "}
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </div>
                                                <div className="mb-2 text-gray-700">
                                                    <span className="font-semibold">Total:</span>{" "}
                                                    <span className="text-pink-700 font-bold">${order.totalPrice?.toFixed(2) || "N/A"}</span>
                                                </div>
                                                <div className="mb-2 text-gray-700">
                                                    <span className="font-semibold">Shipping:</span>{" "}
                                                    {order.shippingAddress?.line_1}, {order.shippingAddress?.city}
                                                </div>
                                                <div className="mt-4">
                                                    <h4 className="font-semibold text-gray-900 mb-2">Items:</h4>
                                                    <ul className="list-disc pl-5 text-gray-700">
                                                        {order.items.map((item, idx) => (
                                                            <li key={idx}>
                                                                <span className="font-bold text-pink-700">
                                                                    Product ID: {item.productId}
                                                                </span>
                                                                {" x "}{item.quantity}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-500 text-lg">
                                        {/* ✅ Better debugging message */}
                                        You have no orders yet.
                                        <div className="mt-2 text-xs text-gray-400">
                                            Debug: ordersData = {JSON.stringify(ordersData)}
                                        </div>
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