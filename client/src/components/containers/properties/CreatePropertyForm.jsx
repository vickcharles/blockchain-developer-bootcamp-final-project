import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createProperty } from "../../../redux/Properties";
import { useNavigate } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../../connectors";
import { useSelector } from "react-redux";
import { setGeneralError } from "../../../redux/App";

const CreatePropertyForm = () => {
  const { error, isLoading } = useSelector(
    (state) => state.properties.actions.create
  );
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const { activate, account } = useWeb3React();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tryActivate = async () => {
      await activate(injected, () => {});
    };
    tryActivate();
  }, [activate]);

  const [property, setProperty] = useState({
    title: "",
    description: "",
    imgUrl: "",
    montlyPrice: "",
    depositPrice: "",
  });

  const validateForm = () => {
    let errors = {};
    const validations = [
      {
        key: "title",
        validation: (value) => {
          if (value === "") {
            return "Campo requerido";
          }
          return "";
        },
      },
      {
        key: "imgUrl",
        validation: (value) => {
          if (value === "") {
            return "Campo requerido";
          }
          return "";
        },
      },
      {
        key: "description",
        validation: (value) => {
          if (value === "") {
            return "Campo requerido";
          }
          return "";
        },
      },
      {
        key: "montlyPrice",
        validation: (value) => {
          if (value === "") {
            return "Campo requerido";
          }
          return "";
        },
      },
      {
        key: "depositPrice",
        validation: (value) => {
          if (value === "") {
            return "Campo requerido";
          }
          return "";
        },
      },
    ];

    validations.forEach(({ key, validation }) => {
      const value = validation(property[key]);
      if (value !== "") {
        errors = {
          ...errors,
          [key]: value,
        };
      }
    });
    return errors;
  };

  const handleChange = (event) => {
    setProperty({
      ...property,
      [event.target.name]: event.target.value,
    });
  };

  const handleCreation = async () => {
    const { title, description, montlyPrice, depositPrice, imgUrl } = property;
    const errors = validateForm();
    if (!Object.keys(errors).length) {
      await dispatch(
        createProperty({
          address: account,
          title,
          description,
          montlyPrice,
          depositPrice,
          imgUrl,
        })
      );
      setIsFormSubmitted(true);
    }
  };

  useEffect(() => {
    if (isFormSubmitted) {
      if (!isLoading && error.message) {
        dispatch(setGeneralError(error.message));
      } else if (!isLoading && !error.message) {
        navigate("/");
      }
    }
  }, [isLoading, error, isFormSubmitted, navigate, dispatch]);

  if (isLoading) {
    return (
      <>
        <div class="flex justify-center items-center">
          <div class="animate-spin rounded-full h-12 w-12 md:h-20 md:w-20 border-t-2 border-b-2 border-purple-500"></div>
        </div>
        <div>
          <h1 className="text-center mt-10">Confirmando transacción...</h1>
        </div>
      </>
    );
  }

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
        Img url
      </label>
      <div className="mt-1 relative rounded-md bg-origin-border bg-white border-gray-200 border">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
          <span className="text-gray-500 sm:text-sm"></span>
        </div>
        <input
          type="imgUrl"
          onChange={handleChange}
          name="imgUrl"
          id="imgUrl"
          className="block w-full  p-3 pr-17 sm:text-md rounded-md"
          placeholder="Img url"
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
      <div>
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
