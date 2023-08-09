import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

const Navbar = () => {
  const {
    setSearchCategory,
    openCheckoutSideMenu,
    cartProducts,
    signOut,
    setSignOut,
  } = useContext(ShoppingCartContext);

  const activeStyle = "underline underline-offset-4";

  const SignOut = localStorage.getItem("sign-out");
  const parsedSignOut = JSON.parse(SignOut);
  const SingedOut = signOut || parsedSignOut;

  const handleSignOut = () => {
    const stringifySignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifySignOut);
    setSignOut(true);
  };

  const RenderView = () => {
    if (SingedOut) {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign Out
          </NavLink>
        </li>
      );
    } else {
      return (
        <Fragment>
          <li className="text-black/60">millerarias@platzi.com</li>
          <li>
            <NavLink
              to="/my-orders"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/my-account"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              My Account
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sign-in"
              className={({ isActive }) => (isActive ? activeStyle : undefined)}
              onClick={() => handleSignOut()}
            >
              Sign Out
            </NavLink>
          </li>
          <li className="flex">
            <ShoppingCartIcon
              className="w-6 h-6  cursor-pointer"
              onClick={() => openCheckoutSideMenu()}
            />{" "}
            {cartProducts.length}
          </li>
        </Fragment>
      );
    }
  };

  return (
    <nav className="flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to="/">All-In-One StyleTech</NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => setSearchCategory()}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            onClick={() => setSearchCategory("clothes")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => setSearchCategory("electronics")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furniture"
            onClick={() => setSearchCategory("furniture")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Furniture
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/toys"
            onClick={() => setSearchCategory("toys")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/others"
            onClick={() => setSearchCategory("others")}
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-3">{RenderView()}</ul>
    </nav>
  );
};

export default Navbar;
