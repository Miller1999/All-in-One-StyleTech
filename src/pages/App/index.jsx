//!importar lo de react
import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import {
  ShoppingCartProvider,
  LocalStorageInit,
  ShoppingCartContext,
} from "../../Context";
import { useContext } from "react";
//!importar componentes
import Home from "../Home";
import MyAccount from "../MyAccount";
import MyOrder from "../MyOrder";
import NotFound from "../NotFound";
import MyOrders from "../MyOrders";
import SignIn from "../SignIn";
import Navbar from "../../Components/Navbar";
import CheckoutSideMenu from "../../Components/CheckoutSideMenu";
//!importar css
import "./App.css";

function AppRoutes() {
  const { account, signOut } = useContext(ShoppingCartContext);
  const SignOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(SignOut);
  const SignedOut = signOut || parsedSignOut;

  const accountGet = localStorage.getItem("account");
  const parsedAccount = JSON.parse(accountGet);
  //Account user?
  const accountInLocal = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const accountInState = account ? Object.keys(account).length === 0 : true;
  const userAccount = !accountInLocal || !accountInState;
  let routes = useRoutes([
    {
      path: "/",
      element:
        userAccount && !SignedOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/clothes",
      element:
        userAccount && !SignedOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/electronics",
      element:
        userAccount && !SignedOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/furniture",
      element:
        userAccount && !SignedOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/toys",
      element:
        userAccount && !SignedOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    {
      path: "/others",
      element:
        userAccount && !SignedOut ? (
          <Home />
        ) : (
          <Navigate replace to={"/sign-in"} />
        ),
    },
    { path: "/my-account", element: <MyAccount /> },
    { path: "/my-order", element: <MyOrder /> },
    { path: "/my-orders", element: <MyOrders /> },
    { path: "/my-orders/last", element: <MyOrder /> },
    { path: "/my-orders/:id", element: <MyOrder /> },
    { path: "/sign-in", element: <SignIn /> },
    { path: "/*", element: <NotFound /> },
  ]);
  return routes;
}

function App() {
  LocalStorageInit();
  return (
    <ShoppingCartProvider>
      <BrowserRouter>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
}

export default App;
