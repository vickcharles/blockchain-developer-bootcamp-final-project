import React from "react";
import CreatePropertyForm from "../properties/CreatePropertyForm";

const AddProperty = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-4xl font-semibold text-gray-800 text-center mb-10">
        Create a new one
      </h1>
      <div className="bg-white md:w-1/2 w-full m-auto p-10 rounded-lg">
        <CreatePropertyForm />
      </div>
    </div>
  );
};

export default AddProperty;
