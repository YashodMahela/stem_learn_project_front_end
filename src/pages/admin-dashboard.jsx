import AdminOrdersTable from "@/components/AdminOrdersTable";
import OrderStatsDashboard from "@/components/OrderStats";
import DailyChart from "@/components/DailyChart";
import AdminSidebar from "./admin-sliderbar";
function AdminDashboard() {
    return (
        <AdminSidebar>
            <OrderStatsDashboard />
            <AdminOrdersTable />
            <DailyChart />
        </AdminSidebar>
    );
}

export default AdminDashboard;

