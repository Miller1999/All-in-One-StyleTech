import { Fragment, useRef, useState } from "react";
import { ShoppingCartContext } from "../../Context";
import { useContext } from "react";
import { Link, Navigate } from "react-router-dom";

function SignIn() {
  const { account, setSignOut, setAccount } = useContext(ShoppingCartContext);
  const [view, setView] = useState("user-info");
  const form = useRef(null);
  //Account - get
  const accountGet = localStorage.getItem("account");
  const parsedAccount = JSON.parse(accountGet);
  //Account user?
  const accountInLocal = parsedAccount
    ? Object.keys(parsedAccount).length === 0
    : true;
  const accountInState = account ? Object.keys(account).length === 0 : true;
  const userAccount = !accountInLocal || !accountInState;

  const createAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const Account = JSON.stringify(data);
    localStorage.setItem("account", Account);
    setAccount(data);
    handleSignIn();
  };

  const handleSignIn = () => {
    const SignOut = JSON.stringify(false);
    localStorage.setItem("sign-out", SignOut);
    setSignOut(false);
    return <Navigate replace to={"/"} />;
  };

  const renderLogin = () => {
    return (
      <div className="flex flex-col w-80">
        <p>
          <span className="font-light text-sm">Email: </span>
          <span>{parsedAccount?.email}</span>
        </p>
        <p>
          <span className="font-light text-sm">Password: </span>
          <span>{parsedAccount?.password}</span>
        </p>
        <Link to="/">
          <button
            className="bg-black disabled:bg-black/40 text-white w-full rounded-lg py-3 mt-4 mb-2"
            disabled={!userAccount}
            onClick={() => handleSignIn()}
          >
            Log In
          </button>
        </Link>
        <div className="text-center">
          <a
            className="font-light text-xs underline underline-offset-4"
            href="/"
          >
            Forgot my password
          </a>
        </div>
        <button
          className="border border-black disabled:text-black/40 disabled:border-black/40 rounded-lg mt-6 py-3"
          onClick={() => setView("create-user-info")}
          disabled={userAccount}
        >
          Sign Up
        </button>
      </div>
    );
  };

  const renderCreateUserInfo = () => {
    return (
      <form ref={form} className="flex flex-col gap-4 w-80">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="font-light text-sm">
            Your name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={parsedAccount?.name}
            placeholder="Miller"
            className="rounden-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-light text-sm">
            Your email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={parsedAccount?.email}
            placeholder="anaccount@mail.com"
            className="rounden-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="font-light text-sm">
            Your password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={parsedAccount?.password}
            placeholder="********"
            className="rounden-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4"
          />
        </div>
        <Link to="/">
          <button
            className="bg-black text-white w-full rounded-lg py-3"
            onClick={() => createAccount()}
          >
            Create Account
          </button>
        </Link>
      </form>
    );
  };

  const renderView = () =>
    view === "create-user-info" ? renderCreateUserInfo() : renderLogin();

  return (
    <Fragment>
      <h1 className="font-medium text-xl text-center mb-6 w-80">Welcome</h1>
      {renderView()}
    </Fragment>
  );
}

export default SignIn;
