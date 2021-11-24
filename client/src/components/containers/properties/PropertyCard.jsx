import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Web3 from "web3";
import { rentProperty } from "../../../redux/Properties";
import { formatAddress } from "../../../utils";
import ConfirmationModal from "../../ui/modals/ConfirmationModal";

const PropertyCard = ({ property }) => {
  const accountAddress = useSelector((state) => state.account.address);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleConfirm = () => {
    setOpen(true);
  };

  const handleRentProperty = () => {
    dispatch(rentProperty(property));
  };

  const getButton = !property?.available ? (
    <div className="w-full text-yellow-600 text-center font-medium text-yellow-500 text-sm py-3 rounded-md mt-5">
      Rented by{" "}
      {Web3.utils.toChecksumAddress(property.tenant) ===
      Web3.utils.toChecksumAddress(accountAddress)
        ? "you"
        : formatAddress(property.tenant)}
    </div>
  ) : accountAddress &&
    Web3.utils.toChecksumAddress(accountAddress) !==
      Web3.utils.toChecksumAddress(property.lessor) ? (
    <div className="flex items-baseline space-x-4 text-center rounded-md ">
      <button
        className="bg-gray-900 text-white px-3 py-3 align-center align-left w-full rounded-md text-sm font-medium mt-5"
        onClick={handleConfirm}
      >
        Rent
      </button>
    </div>
  ) : (
    <div className="h-16"></div>
  );

  const total = Number(property?.montlyPrice) + Number(property?.depositPrice);

  return (
    <div>
      <div className="bg-origin-border bg-white border-gray-200 border rounded-lg w-full">
        <img
          className="h-48 w-full object-cover rounded-lg lg:w-full"
          src={property.imgUrl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://i.imgur.com/sjDBHUW.jpg";
          }}
          alt=""
        />
        <div className="p-3">
          <h1 className="font-medium">{property.title}</h1>
          <p className="pt-1 text-gray-400 text-sm">{property.description}</p>
          <div className="content-right items-center mt-5 ">
            <h5 className="text-right">
              ETH{" "}
              {property?.montlyPrice &&
                Web3.utils.fromWei(property?.montlyPrice, "ether")}{" "}
              / Month
            </h5>
          </div>
          <div className="flex items-center mt-2 justify-end">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 mr-1"
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
            <p className="text-gray-400 text-sm">+ deposit</p>
          </div>

          {getButton}
        </div>
      </div>
      <ConfirmationModal
        open={open}
        onConfirm={handleRentProperty}
        setOpen={setOpen}
        content={
          <div>
            <div className="flex justify-between">
              <h1>Deposit</h1>
              <h1>
                {" "}
                {Web3.utils.fromWei(property?.depositPrice, "ether")} ETH
              </h1>
            </div>
            <div className="flex justify-between">
              <h1>Montly Payment</h1>
              <h1>{Web3.utils.fromWei(property?.montlyPrice, "ether")} ETH</h1>
            </div>
            <div className="flex justify-between mt-5">
              <h1>Total</h1>
              <h1>{Web3.utils.fromWei(total.toString(), "ether")} ETH</h1>
            </div>
          </div>
        }
        title="Confirmar transaccion"
      />
    </div>
  );
};

export default PropertyCard;
