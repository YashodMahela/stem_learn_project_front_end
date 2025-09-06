import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Alert } from "./ui/alert";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useCreateOrderMutation } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router';

const shippingAddresFormSchema = z.object({
    line_1: z.string().min(1).max(50),
    line_2: z.string().min(1).max(50).optional(),
    city: z.string().min(1).max(50),
    phone: z.string().min(1).max(15),
});

function ShippingAddressForm() {

    const form = useForm({
        resolver: zodResolver(shippingAddresFormSchema),
        defaultValues: {
            line_1: "",
            line_2: "",
            city: "",
            phone: "",
        },
    });

    const [createOrder, { isLoading }] = useCreateOrderMutation();
    const cart = useSelector((state) => state.cart.cartItems);
    const { isSignedIn, user } = useUser();
    const navigate = useNavigate(); 
    if (!isSignedIn) {
        return (<div>Please sign in to continue</div>);
    }

    async function onSubmit(values) {
        try {
            if (!cart || cart.length === 0) {
                // alert("Your cart is empty!");
                return (<Alert variant="destructive">Your cart is empty!</Alert>);
            }

            // Calculate total amount - FIXED to use 'price' instead of 'amount'
            const totalAmount = cart.reduce((total, item) => {
                const price = item.product?.price || 0; // Your products use 'price'
                const quantity = item.quantity || 0;
                const itemTotal = price * quantity;
                return total + itemTotal;
            }, 0);


            if (totalAmount <= 0) {
                // alert("Invalid total amount. Please check your cart.");
                return (<Alert variant="destructive">Invalid total amount. Please check your cart.</Alert>);
            }

            const orderData = {
                shippingAddress: values,
                totalAmount: totalAmount, // This will no longer be null
                userId: user?.id,
                orderItems: cart.map((item) => ({
                    productId: item.product?._id,
                    quantity: item.quantity,
                })),
            };


            const result = await createOrder(orderData).unwrap();
            console.log("Order created successfully:", result.order.id);
            if(result){
                navigate(`/payment/${result.order.id}`);
            }
            
    
        } catch (error) {
            console.error("Order creation error:", error);
            alert("Failed to create order. Please try again.");
        }
    }


    return (
        <div className="bg-gradient-to-br from-pink-50 via-white to-rose-100 min-h-screen py-12 px-4 lg:px-16">
            <h2 className="text-2xl font-extrabold text-pink-700 mb-2 tracking-tight text-center">
                Shipping Address
            </h2>
            <p className="text-gray-500 mb-8 text-center">
                Please enter your shipping details to complete your order.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="line_1"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700">
                                    Address Line 1
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Apartment, suite, etc."
                                        {...field}
                                        className="bg-gray-50 border border-pink-200 focus:border-pink-500 focus:ring-pink-100 rounded-lg"
                                    />
                                </FormControl>
                                <FormDescription className="text-xs text-gray-400">
                                    Street address, P.O. box, company name, c/o
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="line_2"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700">
                                    Address Line 2
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Building, floor, unit (optional)"
                                        {...field}
                                        className="bg-gray-50 border border-pink-200 focus:border-pink-500 focus:ring-pink-100 rounded-lg"
                                    />
                                </FormControl>
                                <FormDescription className="text-xs text-gray-400">
                                    Apartment, suite, unit, building, floor, etc.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700">
                                    City
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="City"
                                        {...field}
                                        className="bg-gray-50 border border-pink-200 focus:border-pink-500 focus:ring-pink-100 rounded-lg"
                                    />
                                </FormControl>
                                <FormDescription className="text-xs text-gray-400">
                                    Enter your city
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-semibold text-gray-700">
                                    Phone Number
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="e.g. 07x-xxxxxxx"
                                        {...field}
                                        className="bg-gray-50 border border-pink-200 focus:border-pink-500 focus:ring-pink-100 rounded-lg"
                                    />
                                </FormControl>
                                <FormDescription className="text-xs text-gray-400">
                                    We'll use this to contact you about your order
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-pink-700 hover:bg-pink-900 text-white font-bold py-3 rounded-lg shadow-lg transition duration-200"
                            disabled={isLoading}
                        >
                            {isLoading ? "Submitting..." : "Submit & Continue"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}

export default ShippingAddressForm;
