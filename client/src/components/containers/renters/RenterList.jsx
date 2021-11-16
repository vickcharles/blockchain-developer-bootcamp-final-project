import { Menu } from "@headlessui/react";

const RenterList = () => {
  return (
    <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 p-8 bg-white border-gray-200	border rounded-lg ">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="lg:flex lg:justify-between lg:align-ceter items-center">
          <Menu>
            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-9 w-9 rounded-full"
                src="https://icon-library.com/images/no-user-image-icon/no-user-image-icon-23.jpg"
                alt=""
              />
            </Menu.Button>
          </Menu>
          <div className="border lg:ml-2 bg-gray-100 text-gray-400 px-2 rounded-full flex-1 h-8 lg:flex lg:items-center">
            <h1>0x57e96</h1>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-400 lg:ml-1 "
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
            />
          </svg>
        </div>
      </div>
      <div class="grid grid-cols-4 gap-4 mt-10">
        <div className="bg-origin-border bg-white border-gray-200 border rounded-lg w-full">
          <img
            className="h-30 w-full object-cover  rounded-lg lg:w-full"
            src="https://i.imgur.com/sjDBHUW.jpg"
            alt=""
          />
          <div className="p-3">
            <h1 className="font-medium">
              Comodo y cojedor apartamento en el poblado
            </h1>
            <p className="pt-1 text-gray-400 text-sm">descriptions goes here</p>
            <div className="flex content-center items-center pt-2">
              <img
                className="w-10 "
                src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png"
                alt=""
              />
              <h3>ETH 1.00 / Month</h3>
            </div>
            <div className="flex items-baseline space-x-4 text-center pt-3">
              <a
                className="bg-gray-900 text-white px-3 py-2 align-center  w-full rounded-md text-sm font-medium"
                aria-current={"page"}
              >
                rent
              </a>
            </div>
          </div>
        </div>
        <div className="bg-origin-border bg-white border-gray-200 border rounded-lg w-full">
          <img
            className="h-30 w-full object-cover rounded-lg lg:w-full"
            src="https://i.imgur.com/sjDBHUW.jpg"
            alt=""
          />
          <div className="p-3">
            <h1 className="font-medium">
              Comodo y cojedor apartamento en el poblado
            </h1>
            <p className="pt-1 text-gray-400 text-sm">descriptions goes here</p>
            <div className="flex content-center items-center pt-2">
              <img
                className="w-10"
                src="https://download.logo.wine/logo/Ethereum/Ethereum-Logo.wine.png"
                alt=""
              />
              <h3>ETH 1.00 / Month</h3>
            </div>
            <div className="flex items-baseline space-x-4 text-center pt-3">
              <a
                className="bg-gray-900 text-white px-3 py-2 align-center  w-full rounded-md text-sm font-medium"
                aria-current={"page"}
              >
                rent
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RenterList;