import { XMarkIcon } from "@heroicons/react/24/outline";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import OrderCard from "../OrderCard";
import { totalPrice } from "../../Utils";

const CheckoutSideMenu = () => {
  const {
    closeCheckoutSideMenu,
    CheckoutSideMenu,
    cartProducts,
    setCartProducts,
    count,
    setCount,
  } = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter(
      (product) => product.id !== id
    );
    setCartProducts(filteredProducts);
    setCount(count - 1);
  };
  return (
    <aside
      className={`${
        CheckoutSideMenu ? "flex" : "hidden"
      } flex flex-col fixed bg-white border border-black rounded-lg h-[calc(100vh-80px)] w-[360px] right-0 top-[68px]`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <div onClick={() => closeCheckoutSideMenu()} className="cursor-pointer">
          <XMarkIcon className="h-6 w-6" />
        </div>
      </div>
      <div className="px-6 overflow-y-scroll">
        {cartProducts.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageURL={product.images?.[0]}
            price={product.price}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <div className="px-6">
        <p className="flex justify-between items-center">
          <span className="font-light">Total:</span>
          <span className="font-medium text-2xl">
            ${totalPrice(cartProducts)}
          </span>
        </p>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
