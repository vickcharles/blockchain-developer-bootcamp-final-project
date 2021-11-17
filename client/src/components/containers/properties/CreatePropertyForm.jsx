import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProperty } from "../../../redux/Properties";

const CreatePropertyForm = () => {
  const [property, setProperty] = useState({});
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setProperty({
      ...property,
      [event.target.name]: event.target.value,
    });
    console.log(property);
  };

  const handleCreation = () => {
    const { title, description, montlyPrice, depositPrice } = property;

    dispatch(createProperty({ title, description, montlyPrice, depositPrice }));
  };

  const validateForm = () => {
    const validations = {
      key: "",
      validation: () => {},
    };
  };

  return (
    <div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700"
      >
        Choose a title
      </label>
      <div className="mt-1 relative rounded-md bg-origin-border bg-white border-gray-200 border">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <span className="text-gray-500 sm:text-sm"></span>
        </div>
        <input
          type="text"
          onChange={handleChange}
          name="title"
          id="title"
          className="block w-full  p-3 pr-17 sm:text-md rounded-md"
          placeholder="Title"
        />
      </div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700 mt-5"
      >
        Describe your post
      </label>
      <div className="mt-1 relative rounded-md bg-origin-border bg-white border-gray-200 border">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <span className="text-gray-500 sm:text-sm"></span>
        </div>
        <input
          type="text"
          name="description"
          onChange={handleChange}
          id="description"
          className="block w-full p-3 pr-17 sm:text-md rounded-md"
          placeholder="Description"
        />
      </div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700 mt-5"
      >
        Montly price
      </label>
      <div className="mt-1 relative rounded-md bg-origin-border bg-white border-gray-200 border">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <span className="text-gray-500 sm:text-sm"></span>
        </div>
        <input
          type="text"
          onChange={handleChange}
          name="montlyPrice"
          id="montlyPrice"
          className="block w-full p-3 pr-17 sm:text-md rounded-md"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
            <option>ETH</option>
          </select>
        </div>
      </div>
      <label
        htmlFor="price"
        className="block text-sm font-medium text-gray-700 mt-5"
      >
        Deposit
      </label>
      <div className="mt-1 relative rounded-md bg-origin-border bg-white border-gray-200 border">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <span className="text-gray-500 sm:text-sm"></span>
        </div>
        <input
          type="text"
          onChange={handleChange}
          name="depositPrice"
          id="depositPrice"
          className="block w-full p-3 pr-17 sm:text-md rounded-md"
          placeholder="0.00"
        />
        <div className="absolute inset-y-0 right-0 flex items-center">
          <label htmlFor="currency" className="sr-only">
            Currency
          </label>
          <select
            id="currency"
            name="currency"
            className="focus:ring-indigo-500 focus:border-indigo-500 h-full py-0 pl-2 pr-7 border-transparent bg-transparent text-gray-500 sm:text-sm rounded-md"
          >
            <option>ETH</option>
          </select>
        </div>
      </div>
      <div className="">
        <button
          onClick={handleCreation}
          className="bg-gray-900 h-10 text-white px-3 py-2 align-center align-left w-full rounded-md text-sm font-medium mt-10 h-12"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default CreatePropertyForm;
