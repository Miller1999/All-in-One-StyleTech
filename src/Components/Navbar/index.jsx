import { NavLink } from "react-router-dom";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import { Fragment } from "react";
import ShoppingCart from "../ShoppingCart";

const Navbar = () => {
  const { setSearchCategory, signOut, setSignOut, account } =
    useContext(ShoppingCartContext);

  const activeStyle = "underline underline-offset-4";

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

  const handleSignOut = () => {
    const stringifySignOut = JSON.stringify(true);
    localStorage.setItem("sign-out", stringifySignOut);
    setSignOut(true);
  };

  const RenderView = () => {
    if (userAccount && !SignedOut) {
      return (
        <Fragment>
          <li className="text-black/60">{parsedAccount?.email}</li>
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
          <li className="flex items-center">
            <ShoppingCart />
          </li>
        </Fragment>
      );
    } else {
      return (
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeStyle : undefined)}
            onClick={() => handleSignOut()}
          >
            Sign In
          </NavLink>
        </li>
      );
    }
  };
  return (
    <nav className="flex justify-between items-center fixed top-0 z-10 w-full py-5 px-8 text-sm font-light bg-white">
      <ul className="flex items-center gap-3">
        <li className="font-semibold text-lg">
          <NavLink to={`${SignedOut ? "/sign-in" : "/"}`}>
            All-In-One StyleTech
          </NavLink>
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
