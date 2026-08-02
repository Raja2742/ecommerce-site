import "../styles/OrderItemCard.css";

function OrderItemCard({ item }) {

    return (

        <div className="order-item">

            <img
                src={item.imageUrl}
                alt={item.productName}
            />

            <div className="details">

                <h4>{item.productName}</h4>

                <p>₹{item.price}</p>

            </div>

            <div className="quantity">

                Qty : {item.quantity}

            </div>

            <div className="price">

                ₹{item.price * item.quantity}

            </div>

        </div>

    );

}

export default OrderItemCard;