import React, { useContext, useEffect } from "react";
import { StepperContext } from "../../Contexts/StepperContext";
import { AddressValidateInput } from "../Utils/AddressValidation";
import { stateOptions } from "../Utils/AdditionalConstants";

const Address = () => {
  // Destructuring context values
  const {
    userData,
    setUserData,
    validationErrors,
    setValidationErrors,
    setIsErrors,
  } = useContext(StepperContext);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    // Call utility function for validation
    AddressValidateInput(name, value, validationErrors, setValidationErrors);
  };

  useEffect(() => {
    // Check if all fields are filled and update isError
    const allFieldsFilled =
      Object.keys(userData).length >= 7 &&
      Object.values(userData).every((val) => val !== "");

    const hasErrors = Object.values(validationErrors).some(Boolean);

    setIsErrors(!allFieldsFilled || hasErrors);
  }, [userData, validationErrors, setIsErrors]);

  return (
    <div className="flex flex-col">
      {/* Street Address Input */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Street Address
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["streetAddress"] || ""}
            name="streetAddress"
            placeholder="Street Address"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {validationErrors.streetAddress && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.streetAddress}
          </p>
        )}
      </div>

      {/* City Input */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          City
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["city"] || ""}
            name="city"
            placeholder="City"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {validationErrors.city && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.city}</p>
        )}
      </div>

      {/* State Dropdown */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          State
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <select
            onChange={handleChange}
            value={userData["state"] || ""}
            name="state"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          >
            {stateOptions}
          </select>
        </div>
      </div>

      {/* Zip Code Input */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Zip Code
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["zipCode"] || ""}
            name="zipCode"
            placeholder="Zip Code"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
        {validationErrors.zipCode && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.zipCode}
          </p>
        )}
      </div>
    </div>
  );
};

export default Address;
