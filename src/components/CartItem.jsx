import React, { useState } from 'react';
import { Card } from "@/components/ui/card";

function CartItem({ item }) {
    const [quantity, setQuantity] = useState(item.quantity);



    const totalPrice = (item.product.price * quantity).toFixed(2);

    return (
        <div className="relative group">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-purple-50/20 to-rose-50/30 rounded-2xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <Card className={`relative bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl group-hover:bg-white `}>


                <div className="flex items-center gap-6">
                    {/* Product Image */}
                    <div className="relative shrink-0">
                        <div className="w-20 h-20 rounded-xl overflow-hidden shadow-lg border-2 border-white group-hover:scale-105 transition-transform duration-300">
                            <img
                                src={item.product.image || "/placeholder.svg"}
                                alt={item.product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Quantity badge */}
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-lg">
                            {quantity}
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between">
                            <div>
                                <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-pink-700 transition-colors">
                                    {item.product.name}
                                </h3>
                                <div className="flex items-center gap-3 mt-1">
                                    <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                        Unit: <span className="font-semibold text-pink-600">${item.product.price}</span>
                                    </span>
                                    <span className="text-lg font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                                        Total: ${totalPrice}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Quantity Controls & Actions */}
                        <div className="flex items-center justify-between pt-2">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-medium text-gray-700">Quantity:</span>
                                <div className="flex items-center bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-pink-300 rounded-full shadow-sm">


                                    <span className="w-12 text-center font-bold text-gray-900">
                                        {quantity}
                                    </span>


                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-2">
                                {/* Wishlist Button */}
                                {/* <button
                                    onClick={() => onToggleWishlist?.(item.product.id)}
                                    className="p-2 text-gray-500 hover:text-pink-600 hover:bg-pink-100 rounded-full transition-all duration-200 hover:scale-110 group/heart"
                                >
                                    <Heart className="w-5 h-5 group-hover/heart:fill-current" />
                                </button> */}

                                {/* Remove Button */}
                                {/* <button
                                    onClick={handleRemove}
                                    disabled={isRemoving}
                                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-all duration-200 hover:scale-110 group/trash"
                                >
                                    <Trash2 className="w-5 h-5 group-hover/trash:animate-pulse" />
                                </button> */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-400/0 to-purple-400/0 group-hover:from-pink-400/10 group-hover:to-purple-400/10 transition-all duration-300 pointer-events-none"></div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-pink-400 via-purple-400 to-rose-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></div>
            </Card>
        </div>
    );
}

export default CartItem;