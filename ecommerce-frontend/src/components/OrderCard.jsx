import OrderItemCard from "./OrderItemCard";
import "../styles/OrderCard.css"
function OrderCard({ order ,count }) {

    return (

        <div className="order-card">

            <div className="order-header">

                <div>

                    <h2>Order #{count}</h2>

                    <p>

                        {new Date(order.createdAt)
                            .toLocaleString()}

                    </p>

                </div>

                <span className="status">

                    {order.status}

                </span>

            </div>

            <div className="order-items">

                {

                    order.items.map(item => (

                        <OrderItemCard
                            key={item.productId}
                            item={item}
                        />

                    ))

                }

            </div>

            <div className="order-footer">

                <h3>

                    Total : ₹{order.total}

                </h3>

            </div>

        </div>

    );

}

export default OrderCard;