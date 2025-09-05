import React, { useState, useMemo } from "react";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
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
import { useGetAllOrdersQuery } from "@/lib/api"; 

const AdminOrdersTable = () => {
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [page, setPage] = useState(1);
    const pageSize = 5; // show 5 per page

    // Query orders
    const { data: orders = [], isLoading } = useGetAllOrdersQuery(
        statusFilter === "ALL" ? undefined : statusFilter
    );

    // Pagination logic
    const paginatedOrders = useMemo(() => {
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return orders.slice(start, end);
    }, [orders, page]);

    const totalPages = Math.ceil(orders.length / pageSize);

    return (
        <div className="p-6 space-y-6">
            {/* Filter */}
            <div className="flex justify-between items-center">
                <Select
                    value={statusFilter}
                    onValueChange={(val) => {
                        setStatusFilter(val);
                        setPage(1); // reset page when filter changes
                    }}
                >
                    <SelectTrigger className="w-52">
                        <SelectValue placeholder="Filter by Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">All</SelectItem>
                        <SelectItem value="PENDING">Pending</SelectItem>
                        <SelectItem value="SHIPPED">Shipped</SelectItem>
                        <SelectItem value="FULFILLED">Completed</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Orders Table */}
            <div className="border rounded-2xl shadow-sm">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>User</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6">
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : paginatedOrders.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-6">
                                    No orders found
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedOrders.map((order) => (
                                <TableRow key={order._id}>
                                    <TableCell>{order._id}</TableCell>
                                    <TableCell>{order.userId?.name || "N/A"}</TableCell>
                                    <TableCell>{order.orderStatus}</TableCell>
                                    <TableCell>
                                        ${((order.totalAmount ?? 0)).toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        {order.date
                                            ? new Date(order.date).toLocaleDateString()
                                            : "N/A"}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </Button>
                <span>
                    Page {page} of {totalPages || 1}
                </span>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    disabled={page === totalPages || totalPages === 0}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default AdminOrdersTable;
