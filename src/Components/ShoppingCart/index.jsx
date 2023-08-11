import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const ShoppingCart = () => {
  const { openCheckoutSideMenu, closeProductDetail, cartProducts } =
    useContext(ShoppingCartContext);
  const openCheckout = () => {
    openCheckoutSideMenu();
    closeProductDetail();
  };

  return (
    <div
      className="relative flex gap-0.5 items-center"
      onClick={() => openCheckout()}
    >
      <ShoppingCartIcon className="h-6 w-6 fill-none stroke-black cursor-pointer" />
      <div className="absolute bottom-3.5 left-3.5 flex justify-center items-center rounded-full bg-black w-4 h-4 text-xs text-white">
        {cartProducts.length}
      </div>
    </div>
  );
};

export default ShoppingCart;
