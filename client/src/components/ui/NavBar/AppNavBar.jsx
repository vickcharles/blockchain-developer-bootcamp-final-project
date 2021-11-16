import { Disclosure, Menu, Transition } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccount } from "../../../redux/AccountSlice";

const navigation = [
  { name: "Explorar", href: "#", current: true },
  { name: "My rentals", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AppNavBar() {
  const count = useSelector((state) => state.account.address);
  const dispatch = useDispatch();

  const handleWalletConnection = async () => {
    if (typeof window.ethereum !== "undefined") {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          dispatch(setAccount(res));
        })
        .catch((e) => {
          console.log(e.toString());
        });
    }
  };

  return (
    <Disclosure as="nav" className="bg-white-800 mb-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between  mt-5">
              <div className="flex">
                <div className="flex-shrink-0"></div>
                <div className="hidden md:block">
                  <div className="flex items-baseline space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "text-gray-800"
                            : "text-gray-400 hover:bg-gray-100",
                          "px-3 py-2 rounded-md text-sm font-semibold"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="hidden md:block">
                <div className="ml-4 flex">
                  {count === "" ? (
                    <div className="ml-10 flex items-baseline space-x-4">
                      <button
                        onClick={handleWalletConnection}
                        className={classNames(
                          "bg-gray-900 text-white px-3 py-2 space-x-4 rounded-md text-sm font-medium"
                        )}
                      >
                        Connect to a Wallet
                      </button>
                    </div>
                  ) : (
                    <Menu as="div" className="ml-3 relative">
                      <Menu.Button>
                        <div className="flex  bg-white items-center rounded-full">
                          <div className="ml-5 mr-1">
                            <img
                              alt=""
                              src="https://docs.metamask.io/metamask-fox.svg"
                              className="h-5 w-5"
                            />
                          </div>
                          <p className="p-2 font-normal text-gray-800  pr-5">
                            Account: {count?.slice(0, 4)}
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
                            <a
                              href=""
                              className="block px-4 py-2 text-sm text-gray-700"
                            >
                              "ksjd"
                            </a>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                </div>
              </div>
              <div className="-mr-2 flex md:hidden ">
                <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
