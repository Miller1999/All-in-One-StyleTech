import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  //Increment Count -> Shopping Cart
  const [count, setCount] = useState(0);
  //Mostrat/Ocultar -> ProductDetail
  const [productDetail, setproductDetail] = useState(false);
  const openProductDetail = () => setproductDetail(true);
  const closeProductDetail = () => setproductDetail(false);
  //Mostrat/Ocultar -> Checkout
  const [CheckoutSideMenu, setCheckoutSideMenu] = useState(false);
  const openCheckoutSideMenu = () => setCheckoutSideMenu(true);
  const closeCheckoutSideMenu = () => setCheckoutSideMenu(false);
  //Info del producto -> Product Detail
  const [productShow, setProductShow] = useState({});
  //Cart Products
  const [cartProducts, setCartProducts] = useState([]);
  //Order
  const [order, setOrder] = useState([]);
  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        productDetail,
        productShow,
        setProductShow,
        cartProducts,
        setCartProducts,
        CheckoutSideMenu,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
