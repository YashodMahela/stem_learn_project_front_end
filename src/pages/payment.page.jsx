import CartItem from "@/components/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router";
import { useSearchParams } from "react-router";
import { useParams } from "react-router";
import PaymentForm from "@/components/PaymentForm";

function PaymentPage() {
    const cart = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const { orderId } = useParams();
    console.log("PaymentPage Order ID:", orderId);
    if (cart.length === 0) {
        return <Navigate to="/" />;
    }
    return (
        <main className="px-8">
            <h2 className="text-4xl font-bold">Review Your Order</h2>
            <div className="mt-4 grid grid-cols-4 gap-x-4">
                {cart.map((item, index) => (
                    <CartItem key={index} item={item} />
                ))}
            </div>
            <div className="mt-4">
                <p>
                    Total Price: $
                    {cart.reduce(
                        (acc, item) => acc + item.product.price * item.quantity,
                        0
                    )}
                </p>
            </div>

            <div className="mt-4">
                <PaymentForm orderId={orderId} />
            </div>
        </main>
    );
}

export default PaymentPage;
