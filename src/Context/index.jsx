import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const LocalStorageInit = () => {
  const LocalAccount = localStorage.getItem("account");
  const LocalSingOut = localStorage.getItem("sign-out");
  let parsedAccount;
  let parsedSignOut;

  if (!LocalAccount) {
    localStorage.setItem("account", JSON.stringify({}));
    parsedAccount = {};
  } else {
    parsedAccount = JSON.parse(LocalAccount);
  }

  if (!LocalSingOut) {
    localStorage.setItem("sign-out", JSON.stringify(false));
    parsedSignOut = false;
  } else {
    parsedSignOut = JSON.parse(LocalSingOut);
  }
};

export const ShoppingCartProvider = ({ children }) => {
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
  //Get products
  const [products, setProducts] = useState(null);
  const [filteredItems, setfilteredItems] = useState(null);
  //By title
  const [searchTitle, setSearchTitle] = useState(null);
  //By category
  const [searchCategory, setSearchCategory] = useState(null);
  // LocalStorageItems
  const [account, setAccount] = useState({});
  const [signOut, setSignOut] = useState(false);
  //API
  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  //Filters
  const filteredItemsbyTitle = (products, searchTitle) => {
    return products?.filter((product) =>
      product.title.toLowerCase().includes(searchTitle.toLowerCase())
    );
  };

  const filteredItemsbyCategory = (products, searchCategory) => {
    return products?.filter((product) =>
      product.category.name.toLowerCase().includes(searchCategory.toLowerCase())
    );
  };

  const filterBy = (searchType, products, searchTitle, searchCategory) => {
    if (searchType === "title")
      return filteredItemsbyTitle(products, searchTitle);
    if (searchType === "category")
      return filteredItemsbyCategory(products, searchCategory);
    if (searchType === "titleAndcategory")
      return filteredItemsbyCategory(products, searchCategory).filter(
        (product) =>
          product.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    if (!searchType) return products;
  };

  useEffect(() => {
    if (searchTitle && !searchCategory) {
      setfilteredItems(
        filterBy("title", products, searchTitle, searchCategory)
      );
    }
    if (!searchTitle && searchCategory) {
      setfilteredItems(
        filterBy("category", products, searchTitle, searchCategory)
      );
    }
    if (!searchTitle && !searchCategory) {
      setfilteredItems(filterBy(null, products, searchTitle, searchCategory));
    }
    if (searchTitle && searchCategory) {
      setfilteredItems(
        filterBy("titleAndcategory", products, searchTitle, searchCategory)
      );
    }
  }, [products, searchTitle, searchCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
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
        products,
        setProducts,
        searchTitle,
        setSearchTitle,
        filteredItems,
        searchCategory,
        setSearchCategory,
        account,
        setAccount,
        signOut,
        setSignOut,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
