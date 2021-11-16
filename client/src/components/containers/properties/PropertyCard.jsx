import React from "react";
import Web3 from "web3";

const PropertyCard = ({ property }) => {
  return (
    <div className="bg-origin-border bg-white border-gray-200 border rounded-lg w-full">
      <img
        className="h-25 w-full object-cover  rounded-lg lg:w-full"
        src="https://i.imgur.com/sjDBHUW.jpg"
        alt=""
      />
      <div className="p-3">
        <h1 className="font-medium">{property.title}</h1>
        <p className="pt-1 text-gray-400 text-sm">{property.description}</p>

        <div className="content-right items-center mt-5 ">
          <h5 className="text-right">
            ETH {Web3.utils.fromWei(property.montlyPrice, "ether")} / Month
          </h5>
        </div>
        <div className="flex items-center mt-2 justify-end">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-800 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
          <p className="text-gray-400 text-sm">Include deposit</p>
        </div>
        <div className="flex items-baseline space-x-4 text-center pt-3">
          <button className="bg-gray-900 h-10 text-white px-3 py-2 align-center align-left w-full rounded-md text-sm font-medium">
            Rent now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
