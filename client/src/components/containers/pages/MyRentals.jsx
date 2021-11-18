import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getRentals } from "../../../redux/Properties";
import PropertyCard from "../properties/PropertyCard";

const MyRentals = () => {
  const property = useSelector((state) => state.properties.currentRental);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRentals());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold text-gray-800 text-center mb-10">
        Current rental
      </h1>
      <div className="bg-white md:w-1/2 w-full m-auto p-10 rounded-lg">
        {property ? (
          <PropertyCard property={property} />
        ) : (
          <h1 className="text-center">you don't have any rented property :(</h1>
        )}
      </div>
    </div>
  );
};

export default MyRentals;
