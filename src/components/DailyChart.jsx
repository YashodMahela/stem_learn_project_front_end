import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, TrendingUp, DollarSign } from 'lucide-react';
import { useGetDailySalesQuery } from '@/lib/api';

const DailyChart = () => {
    const [selectedRange, setSelectedRange] = useState(7);

    // Use your actual API hook
    const { data: salesData, isLoading, error, refetch } = useGetDailySalesQuery(selectedRange);

    // Format date for display
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
        });
    };

    // Format currency
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Calculate total sales
    const totalSales = salesData?.data?.reduce((sum, item) => sum + item.total, 0) || 0;

    // Calculate average daily sales
    const averageDailySales = salesData?.data?.length > 0
        ? totalSales / salesData.data.length
        : 0;

    // Calculate trend (compare last day with average)
    const lastDayTotal = salesData?.data?.[salesData.data.length - 1]?.total || 0;
    const trendPercentage = averageDailySales > 0
        ? ((lastDayTotal - averageDailySales) / averageDailySales) * 100
        : 0;

    // Custom tooltip for the chart
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="text-sm font-medium text-gray-900">
                        {formatDate(label)}
                    </p>
                    <p className="text-sm text-blue-600">
                        Sales: <span className="font-semibold">{formatCurrency(payload[0].value)}</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    if (isLoading) {
        return (
            <Card className="w-full">
                <CardHeader>
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="h-80 bg-gray-100 rounded animate-pulse"></div>
                </CardContent>
            </Card>
        );
    }

    if (error) {
        return (
            <Card className="w-full">
                <CardContent className="flex items-center justify-center h-80">
                    <div className="text-center">
                        <p className="text-red-500 mb-2">Error loading sales data</p>
                        <Button onClick={refetch} variant="outline">
                            Try Again
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="p-6 space-y-6">
            {/* Header with range selector */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Daily Sales</h2>
                    <p className="text-gray-600">Track your daily sales performance</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant={selectedRange === 7 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedRange(7)}
                    >
                        7 Days
                    </Button>
                    <Button
                        variant={selectedRange === 30 ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedRange(30)}
                    >
                        30 Days
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Total Sales</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalSales)}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-green-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Daily Average</p>
                                <p className="text-2xl font-bold text-gray-900">{formatCurrency(averageDailySales)}</p>
                            </div>
                            <Calendar className="h-8 w-8 text-blue-600" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Trend</p>
                                <p className={`text-2xl font-bold ${trendPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {trendPercentage >= 0 ? '+' : ''}{trendPercentage.toFixed(1)}%
                                </p>
                            </div>
                            <TrendingUp className={`h-8 w-8 ${trendPercentage >= 0 ? 'text-green-600' : 'text-red-600'}`} />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Chart */}
            <Card>
                <CardHeader>
                    <CardTitle>Sales Trend</CardTitle>
                    <CardDescription>
                        Daily sales over the last {selectedRange} days
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={salesData?.data || []}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                                <XAxis
                                    dataKey="date"
                                    tickFormatter={formatDate}
                                    stroke="#666"
                                    fontSize={12}
                                />
                                <YAxis
                                    tickFormatter={(value) => formatCurrency(value)}
                                    stroke="#666"
                                    fontSize={12}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 6 }}
                                    activeDot={{ r: 8, stroke: '#3b82f6', strokeWidth: 2 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default DailyChart;