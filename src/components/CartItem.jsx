import { Card } from "@/components/ui/card";

function CartItem({ item }) {
    return (
        <Card className="p-4 bg-gradient-to-br from-pink-50 via-white to-rose-100 rounded-xl shadow-lg transition-transform duration-200 hover:-translate-y-1 hover:shadow-2xl">
            <div className="flex items-center gap-4">
                <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded-lg border border-pink-100 shadow"
                />
                <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-lg mb-1">{item.product.name}</p>
                    <p className="text-pink-700 font-bold text-base mb-1">${item.product.price}</p>
                    <p className="text-sm text-gray-500">Quantity: <span className="font-semibold text-pink-700">{item.quantity}</span></p>
                </div>
            </div>
        </Card>
    );
}

export default CartItem;
