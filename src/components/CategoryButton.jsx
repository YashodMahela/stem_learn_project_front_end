import { cn } from "@/lib/utils";

function CategoryButton({ category, selectedCategoryId, onClick }) {
    return (
        <button
            onClick={onClick}
            className={cn("border rounded-full px-4 py-2 transition-colors", {
                "bg-black text-white": selectedCategoryId === category._id,
                "bg-white  border-black text-black":
                    selectedCategoryId !== category._id,
            })}
        >
            {category.name}
        </button>
    );
}

export default CategoryButton;
