import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Link } from "react-router";

function SimpleProductCard({ product }) {
    const dispatch = useDispatch();

    return (
        <Link to={`/shop/products/${product._id}`} className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border overflow-hidden">
            {/* Product Image */}
            <div className="h-64 sm:h-72 md:h-80 lg:h-96 overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-t-lg w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
            </div>
            
            {/* Product Info */}
            <div className="p-4">
                {/* Color indicator (if product has color) */}
                {product.color && (
                    <div className="flex items-center gap-2 mb-2">
                        <div 
                            className="w-3 h-3 rounded-full border border-gray-300"
                            style={{ backgroundColor: product.color.hexCode }}
                        />
                        <span className="text-xs text-gray-600">{product.color.name}</span>
                    </div>
                )}
                
                {/* Product Name */}
                <span className="text-lg sm:text-xl md:text-2xl block font-medium text-gray-900 mb-2">
                    {product.name}
                </span>
                
                {/* Price */}
                <span className="text-base sm:text-lg md:text-xl block font-bold text-gray-900 mb-4">
                    ${product.price}
                </span>
                
                {/* Category */}
                {product.category && (
                    <div className="mb-3">
                        <span className="text-xs text-gray-500 capitalize bg-gray-100 px-2 py-1 rounded-full">
                            {product.category}
                        </span>
                    </div>
                )}
                
                {/* Add to Cart Button */}
                <Button
                    className="w-full"
                    onClick={() =>
                        dispatch(
                            addToCart({
                                _id: product._id,
                                name: product.name,
                                price: product.price,
                                image: product.image,
                            })
                        )
                    }
                >
                    Add To Cart
                </Button>
            </div>
        </Link>
    );
}

export default SimpleProductCard;