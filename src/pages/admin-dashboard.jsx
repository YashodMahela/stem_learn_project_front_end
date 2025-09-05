import AdminOrdersTable from "@/components/AdminOrdersTable";
import OrderStatsDashboard from "@/components/OrderStats";
import DailyChart from "@/components/DailyChart";
function AdminDashboard() {
    return (
        <div className="flex flex-col gap-8 md:gap-12 pb-8">
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <OrderStatsDashboard />
            <AdminOrdersTable />
            <DailyChart />
        </div>
    );
}

export default AdminDashboard;
