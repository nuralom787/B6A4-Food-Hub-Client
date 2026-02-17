export const dynamic = 'force-dynamic';
import { getSpecificOrders } from "@/app/actions/orderAction";
import OrderCard from "@/components/layouts/orderCard";
import { Spinner } from "@/components/ui/spinner";
import { OrderItems } from "@/types/order.types";


const MyOrdersPage = async () => {
    const orders = await getSpecificOrders();

    const isOrdersArray = Array.isArray(orders);

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-extrabold mb-8 tracking-tight">All Orders</h1>
            {!orders ? (
                <div className="flex justify-center items-center w-full min-h-max">
                    <span className="inline-flex gap-3 items-center text-2xl">
                        <Spinner className="size-7" />
                        Loading...
                    </span>
                </div>
            )
                :
                isOrdersArray && orders.length > 0 ?
                    (
                        <div className="flex flex-col gap-2">
                            {orders.map((order: OrderItems) => (
                                <OrderCard key={order.id} order={order} />
                            ))}
                        </div>
                    )
                    :
                    (
                        <div className="text-center py-10">
                            <p className="text-xl text-gray-500">No orders found.</p>
                        </div>
                    )
            }
        </div>
    );
};

export default MyOrdersPage;