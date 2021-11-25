import { Fragment, useEffect } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { classNames } from "../../../utils";
import { injected } from "../../../connectors.js";

export default function AppNavBar() {
  return (
    <Disclosure as="nav" className="bg-white-800 mb-10 pl-10 pr-5">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between  mt-5">
              <div className="flex">
                <div className="flex-shrink-0"></div>
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-4">
                    <NavLink to="/" label="Explore" />
                    <NavLink to="/rentals" label="My rentals" />
                  </div>
                </div>
              </div>

              <div className="ml-4 flex justify-center">
                <NavLink
                  to="/create"
                  label="Create new property"
                  className="hidden md:block self-start"
                />
                <ConnectWalletButton />
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}

const ConnectWalletButton = () => {
  const { activate, active, account, deactivate } = useWeb3React();
  const navigate = useNavigate();

  // Replace this soon
  const handleWalletConnection = async () => {
    if (!window.ethereum) {
      return;
    }
    activate(injected, (e) => {
      console.log(e);
    });
  };

  useEffect(() => {
    const tryActivate = async () => {
      await activate(injected, () => {});
    };
    tryActivate();
  }, [activate]);

  const onLogOut = (deactivate) => {
    deactivate();
    navigate("/");
  };

  if (!active) {
    return (
      <div className="ml-10 flex space-x-4">
        <button
          onClick={handleWalletConnection}
          className={classNames(
            "bg-gray-900 text-white px-3 py-2 space-x-4 rounded-md text-sm font-medium"
          )}
        >
          Connect to a Wallet
        </button>
      </div>
    );
  }

  return (
    <Menu as="div" className="ml-3 relative">
      <Menu.Button>
        <div className="flex bg-white items-center rounded-full border-gray-200 border-2">
          <div className="ml-5 mr-1">
            <img
              alt=""
              src="https://docs.metamask.io/metamask-fox.svg"
              className="h-4 w-5"
            />
          </div>
          <p className="p-2 font-normal text-gray-800  pr-5">
            Account: {account?.slice(0, 4)}
          </p>
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item key="k">
            <button
              className="block px-4 py-2 text-sm text-gray-700 text-red-300"
              onClick={() => onLogOut(deactivate)}
            >
              Log out
            </button>
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

function NavLink({ label, to, activeOnlyWhenExact, className }) {
  let match = useMatch({
    path: to,
    end: activeOnlyWhenExact,
  });

  return (
    <Link
      to={to}
      className={classNames(
        match ? "text-gray-800" : "text-gray-400 hover:bg-gray-100",
        `px-3 py-2 rounded-md text-sm font-semibold ${className}`
      )}
      aria-current={match ? "page" : undefined}
    >
      {label}
    </Link>
  );
}
