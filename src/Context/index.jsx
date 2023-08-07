import { createContext, useState } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  //Increment Count -> Shopping Cart
  const [count, setCount] = useState(0);
  //Mostrat/Ocultar -> ProductDetail
  const [productDetail, setproductDetail] = useState(false);
  const openProductDetail = () => setproductDetail(true);
  const closeProductDetail = () => setproductDetail(false);
  //Info del producto -> Product Detail
  const [productShow, setProductShow] = useState({});

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
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
