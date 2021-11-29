import { Menu } from "@headlessui/react";
import { formatAddress } from "../../../utils";
import PropertyCard from "./PropertyCard";

const PropertyList = ({ propertyOwners }) => {
  return (
    <>
      {propertyOwners?.map(({ owner, properties }, i) => (
        <main className="py-6 sm:px-6 lg:px-8 p-8 bg-white border-gray-200  border-2 rounded-lg mt-10" key={i}>
          <div className="flex lg:items-center lg:justify-between">
            <div className="flex justify-between align-center items-center">
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
              <div className="border ml-2 bg-gray-50 text-gray-400 px-2 rounded-full flex-1 p-1 pl-2 pr-2 lg:flex lg:items-center">
                <h1>{formatAddress(owner)}</h1>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-400 ml-1 "
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
          <div className="grid grid-cols-1 md:grid-cols-4  gap-4 mt-10">
            {properties?.map((p, i) => (
              <PropertyCard property={p} key={i}/>
            ))}
          </div>
        </main>
      ))}
    </>
  );
};

export default PropertyList;
