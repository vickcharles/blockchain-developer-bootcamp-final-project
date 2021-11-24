import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRentals } from "../../../redux/Properties";
import PropertyCard from "../properties/PropertyCard";
import moment from "moment";

const MyRentals = () => {
  const property = useSelector((state) => state.properties.currentRental);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRentals());
  }, [dispatch]);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-10">
          Current rental
        </h1>
        <div className="bg-white md:w-1/3 w-full m-auto p-10 rounded-lg">
          {property ? (
            <PropertyCard property={property} />
          ) : (
            <h1 className="text-center">
              you don't have any rented property :(
            </h1>
          )}
        </div>
        {property ? (
          <div className="bg-white md:w-1/3 w-full m-auto p-10 rounded-lg mt-5 flex justify-between">
            <h1>Next Payment</h1>
            <h1>{moment.unix(property?.nextPayment).format("DD MMM YYYY")}</h1>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default MyRentals;
