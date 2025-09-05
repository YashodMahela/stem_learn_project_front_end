import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useGetOrderStatsQuery } from "@/lib/api" // adjust import path
import { Loader2 } from "lucide-react"

export default function OrderStatsDashboard() {
    const { data: stats, isLoading, isError } = useGetOrderStatsQuery()

    if (isLoading) return <p>Loading...</p>
    if (isError || !stats) return <p>Error loading stats</p>

    return (
        <div className="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            <Card className="bg-blue-50 shadow-md">
                <CardHeader>
                    <CardTitle>Total Orders</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{stats.totalOrders}</CardContent>
            </Card>

            <Card className="bg-yellow-50 shadow-md">
                <CardHeader>
                    <CardTitle>Pending</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{stats.pendingOrders}</CardContent>
            </Card>

            <Card className="bg-green-50 shadow-md">
                <CardHeader>
                    <CardTitle>Completed</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{stats.fulfilledOrders}</CardContent>
            </Card>

            <Card className="bg-red-50 shadow-md">
                <CardHeader>
                    <CardTitle>Cancelled</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{stats.cancelledOrders}</CardContent>
            </Card>
        </div>
    )
}
