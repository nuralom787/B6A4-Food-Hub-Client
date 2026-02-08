import { getAllOrders } from "@/app/actions/orderAction";
import OrderCard from "@/components/layouts/orderCard";
import { OrderItems } from "@/types/order.types";

const ViewOrdersPage = async () => {
    const orders = await getAllOrders();


    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-extrabold mb-8 tracking-tight">All Orders</h1>
            <div className="flex flex-col gap-2">
                {orders.map((order: OrderItems) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </div>
        </div>
    );
};

export default ViewOrdersPage;