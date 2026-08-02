import { useEffect, useState } from "react";
import { getOrders } from "../api/orderService";
import OrderCard from "../components/OrderCard";

function Orders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {

        fetchOrders();

    }, []);

    const fetchOrders = async () => {

        try {

            const response = await getOrders();

            setOrders(response.data);

        } catch (error) {

            if (error.response) {

                setMessage(error.response.data);

            }

        } finally {

            setLoading(false);

        }

    };

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="orders-page">

            <h1>My Orders</h1>

            {

                message &&

                <h3>{message}</h3>

            }

            {

                orders.map(order => (

                    <OrderCard
                        key={order.orderId}
                        order={order}
                    />

                ))

            }

        </div>

    );

}

export default Orders;