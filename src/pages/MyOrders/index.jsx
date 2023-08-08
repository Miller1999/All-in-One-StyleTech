import OrdersCard from "../../Components/OrdersCard/OrdersCard";
import { ShoppingCartContext } from "../../Context";
import { Fragment, useContext } from "react";
import { Link } from "react-router-dom";

function MyOrders() {
  const { order } = useContext(ShoppingCartContext);
  return (
    <Fragment>
      <div className="flex w-80 items-center relative justify-center">
        <h1 className="font-medium text-xl">MyOrders</h1>
      </div>
      {order.map((order, index) => {
        return (
          <Link key={index} to={`/my-orders/${index}`}>
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
            />
          </Link>
        );
      })}
    </Fragment>
  );
}

export default MyOrders;
