import {
    EmbeddedCheckout,
    EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useCallback } from "react";

const STRIPE_PUBLISHABLE_KEY = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const PaymentForm = ({ orderId }) => {
    const fetchClientSecret = useCallback(async () => {
        try {
            console.log("Fetching client secret for orderId:", orderId);
            
            // Create a Checkout Session
            const response = await fetch(`${BASE_URL}/payments/create-checkout-session`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderId }),
            });

            console.log("Response status:", response.status);

            if (!response.ok) {
                const errorData = await response.text();
                console.error("Backend error:", errorData);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Backend response data:", data);

            // Your backend returns 'client_secret', not 'clientSecret'
            return data.client_secret;
            
        } catch (error) {
            console.error("Error fetching client secret:", error);
            throw error;
        }
    }, [orderId]);

    const options = { fetchClientSecret };

    return (
        <div id="checkout">
            <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
                <EmbeddedCheckout />
            </EmbeddedCheckoutProvider>
        </div>
    );
};

export default PaymentForm;