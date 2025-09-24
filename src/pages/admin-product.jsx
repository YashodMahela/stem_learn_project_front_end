import React, { useEffect, useState } from "react";
import {
    useGetFilteredProductsQuery,
    useCreateProductMutation,
    useGetAllCategoriesQuery,
    useGetAllColorsQuery,
    // useDeleteProductMutation,
} from "../lib/api";

import {
    Table,
    TableHeader,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import AdminSidebar from "./admin-sliderbar";
export default function AdminProductsDashboard() {
    // Filters + pagination
    const [filters, setFilters] = useState({
        category: "all",
        color: "all",
        sortOrder: "asc",
        search: "",
        page: 1,
        limit: 10,
    });

    // modal + form state
    const [showAddModal, setShowAddModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        stripePriceId: "",
        categoryId: "",
        color_id: "",
        image: "",
        stock: 0,
        description: "",
    });

    // API hooks
    const {
        data,
        error,
        isLoading,
        isFetching,
        refetch,
    } = useGetFilteredProductsQuery(filters, {
        // keepPreviousData: true (if you use react-query) — RTK Query has similar behaviour
    });

    const {
        data: categoriesData,
    } = useGetAllCategoriesQuery();
    const {
        data: colorsData,
    } = useGetAllColorsQuery(); 
    const [createProduct] = useCreateProductMutation();
    // const [deleteProduct] = useDeleteProductMutation();

    // Normalize various possible API returns:
    const products = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
            ? data.products
            : Array.isArray(data?.data?.products)
                ? data.data.products
                : [];

    // total pages calculation fallback
    const totalPagesFromServer = (data?.totalPages ?? Math.ceil((data?.totalItems ?? products.length) / filters.limit)) || 1;

    const totalPages = Math.max(1, totalPagesFromServer);

    // reset to page 1 when filters (except page) change
    useEffect(() => {
        setFilters((f) => ({ ...f, page: 1 }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters.search, filters.category, filters.color, filters.sortOrder, filters.limit]);

    // handle create
    const handleAddProduct = async (e) => {
        e.preventDefault();
        setCreating(true);

        // Validate minimum required fields
        if (!newProduct.name || !newProduct.price || !newProduct.stripePriceId || !newProduct.categoryId || !newProduct.image || !newProduct.description) {
            alert("Please fill required fields: name, price, stripePriceId, categoryId, image, description.");
            setCreating(false);
            return;
        }

        try {
            console.table(colorsData);
            await createProduct(newProduct).unwrap();
            setShowAddModal(false);
            setNewProduct({
                name: "",
                price: "",
                stripePriceId: "",
                categoryId: "",
                color_id: "",
                image: "",
                stock: 0,
                description: "",
            });
            // go to first page and refetch
            setFilters((f) => ({ ...f, page: 1 }));
            refetch();
            alert("Product created");
        } catch (err) {
            console.error("Create failed", err);
            alert("Create product failed. See console for details.");
        } finally {
            setCreating(false);
        }
    };

    // handle delete
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to delete this product?")) return;

        // try {
        //     await deleteProduct(id).unwrap();
        //     // if deleting last item on last page, go back a page
        //     if (products.length === 1 && filters.page > 1) {
        //         setFilters((f) => ({ ...f, page: f.page - 1 }));
        //     } else {
        //         refetch();
        //     }
        //     alert("Deleted");
        // } catch (err) {
        //     console.error("Delete failed", err);
        //     alert("Delete failed. See console for details.");
        // }
    };

    // page change handler
    const handlePageChange = (newPage) => {
        if (newPage < 1 || newPage > totalPages) return;
        setFilters((f) => ({ ...f, page: newPage }));
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // quick visible page numbers helper (compact)
    const getVisiblePages = () => {
        const current = filters.page;
        const delta = 2;
        const range = [];
        for (let i = Math.max(1, current - delta); i <= Math.min(totalPages, current + delta); i++) {
            range.push(i);
        }
        if (range[0] > 2) {
            range.unshift("...");
            range.unshift(1);
        } else if (range[0] === 2) {
            range.unshift(1);
        }
        if (range[range.length - 1] < totalPages - 1) {
            range.push("...");
            range.push(totalPages);
        } else if (range[range.length - 1] === totalPages - 1) {
            range.push(totalPages);
        }
        return range;
    };

    const handleCategoryChange = (e) => {
        setNewProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };
    const handleColorChange = (e) => {
        setNewProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Loading / error UI (simple)
    return (
        <AdminSidebar>
            <div className="p-6 bg-white rounded-xl shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600">
                        Products Dashboard
                    </h1>
                    <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
                        <DialogTrigger asChild>
                            <Button className="bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90">
                                Add Product
                            </Button>
                        </DialogTrigger>

                        <DialogContent className="max-w-lg">
                            <DialogHeader>
                                <DialogTitle>Add New Product</DialogTitle>
                            </DialogHeader>

                            <form onSubmit={handleAddProduct} className="space-y-3 mt-4">
                                {/* Product Name */}
                                <div className="space-y-1">
                                    <Label>
                                        Name <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        value={newProduct.name}
                                        onChange={(e) => setNewProduct((s) => ({ ...s, name: e.target.value }))}
                                        required
                                    />
                                </div>

                                {/* Price and Stock */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label>
                                            Price (number) <span className="text-red-500">*</span>
                                        </Label>
                                        <Input
                                            type="number"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct((s) => ({ ...s, price: Number(e.target.value) }))}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Stock (number)</Label>
                                        <Input
                                            type="number"
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct((s) => ({ ...s, stock: Number(e.target.value) }))}
                                        />
                                    </div>
                                </div>

                                {/* Stripe Price ID */}
                                <div className="space-y-1">
                                    <Label>
                                        Stripe Price ID <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        value={newProduct.stripePriceId}
                                        onChange={(e) => setNewProduct((s) => ({ ...s, stripePriceId: e.target.value }))}
                                        required
                                    />
                                </div>

                                {/* Category and Color */}
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label>
                                            Category <span className="text-red-500">*</span>
                                        </Label>
                                        <select
                                            name="categoryId"
                                            value={newProduct.categoryId}
                                            onChange={handleCategoryChange}
                                            className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        >
                                            <option value="">Select category</option>
                                            {categoriesData?.map((category) => (
                                                <option key={category._id} value={String(category._id)}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="space-y-1">
                                        <Label>Color <span className="text-red-500">*</span>
                                        </Label>
                                        <select
                                            name="color_id"
                                            value={newProduct.color_id}
                                            onChange={handleColorChange}
                                            className="w-full p-2 border rounded bg-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                                            required
                                        >
                                            <option value="">Select color</option>
                                            {colorsData?.map((color) => (
                                                <option key={color._id} value={String(color._id)}>
                                                    {color.name}
                                                </option>
                                            ))}
                                        </select>
                                        </div>
                                    {/* <div className="space-y-1"> colorsData
                                        <Label>Color ID</Label>
                                        <Input
                                            value={newProduct.color_id}
                                            onChange={(e) => setNewProduct((s) => ({ ...s, color_id: e.target.value }))}
                                        />
                                    </div> */}
                                </div>

                                {/* Image URL */}
                                <div className="space-y-1">
                                    <Label>
                                        Image URL <span className="text-red-500">*</span>
                                    </Label>
                                    <Input
                                        value={newProduct.image}
                                        onChange={(e) => setNewProduct((s) => ({ ...s, image: e.target.value }))}
                                        required
                                    />
                                </div>

                                {/* Description */}
                                <div className="space-y-1">
                                    <Label>
                                        Description <span className="text-red-500">*</span>
                                    </Label>
                                    <textarea
                                        value={newProduct.description}
                                        onChange={(e) => setNewProduct((s) => ({ ...s, description: e.target.value }))}
                                        className="w-full p-2 border rounded"
                                        required
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-2">
                                    <Button
                                        type="submit"
                                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white flex-1"
                                        disabled={creating}
                                    >
                                        {creating ? "Creating..." : "Create Product"}
                                    </Button>
                                    <Button type="button" variant="outline" onClick={() => setShowAddModal(false)}>
                                        Cancel
                                    </Button>
                                </div>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-3 mb-6 items-center">
                    <div className="flex gap-2 items-center">
                        <label className="text-sm text-gray-600">Sort</label>
                        <Select
                            value={filters.sortOrder}
                            onValueChange={(v) => setFilters((f) => ({ ...f, sortOrder: v, page: 1 }))}
                        >
                            <SelectTrigger className="w-[150px]">
                                <SelectValue placeholder="Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="asc">Ascending</SelectItem>
                                <SelectItem value="desc">Descending</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        placeholder="Search name..."
                        value={filters.search}
                        onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                        className="w-[240px]"
                    />

                    <div className="flex gap-2 items-center">
                        <label className="text-sm text-gray-600">Per page</label>
                        <select
                            value={filters.limit}
                            onChange={(e) => setFilters((f) => ({ ...f, limit: Number(e.target.value), page: 1 }))}
                            className="px-2 py-1 border rounded"
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                            <option value={50}>50</option>
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="rounded-lg border shadow-sm overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Color</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead>Description</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {isLoading || isFetching ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-6">
                                        Loading products...
                                    </TableCell>
                                </TableRow>
                            ) : error ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-red-600 py-6">
                                        Failed to load products
                                    </TableCell>
                                </TableRow>
                            ) : products.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center py-6">
                                        No products found
                                    </TableCell>
                                </TableRow>
                            ) : (
                                products.map((p) => (
                                    <TableRow key={p._id || p.id}>
                                        <TableCell className="font-medium">{p.name}</TableCell>
                                        <TableCell>${p.price}</TableCell>
                                        <TableCell>{p.categoryId?.name ?? p.categoryId ?? "N/A"}</TableCell>
                                        <TableCell>{p.color_id?.name ?? p.color_id ?? "-"}</TableCell>
                                        <TableCell>{p.stock ?? 0}</TableCell>
                                        <TableCell className="max-w-xs truncate">{p.description}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => alert(JSON.stringify(p, null, 2))}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(p._id || p.id)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-600">
                        Page {filters.page} of {totalPages}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            onClick={() => handlePageChange(filters.page - 1)}
                            disabled={filters.page <= 1}
                        >
                            Prev
                        </Button>

                        {getVisiblePages().map((pg, i) =>
                            pg === "..." ? (
                                <span key={`dots-${i}`} className="px-2 text-gray-500">
                                    ...
                                </span>
                            ) : (
                                <Button
                                    key={pg}
                                    onClick={() => handlePageChange(pg)}
                                    className={filters.page === pg ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white" : ""}
                                    variant={filters.page === pg ? "default" : "outline"}
                                >
                                    {pg}
                                </Button>
                            )
                        )}

                        <Button
                            variant="ghost"
                            onClick={() => handlePageChange(filters.page + 1)}
                            disabled={filters.page >= totalPages}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </AdminSidebar>
    );
}
