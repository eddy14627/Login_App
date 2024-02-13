import React, { useContext, useEffect } from "react";
import { StepperContext } from "../../Contexts/StepperContext";
import { personalValidateInput } from "../Utils/PersonalInfoValidation";

const PersonalInfo = () => {
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
    personalValidateInput(name, value, validationErrors, setValidationErrors);
  };

  useEffect(() => {
    // Check if all fields are filled and update isError
    const allFieldsFilled =
      Object.keys(userData).length >= 3 &&
      Object.values(userData).every((val) => val !== "");

    const hasErrors = Object.values(validationErrors).some(Boolean);

    setIsErrors(!allFieldsFilled || hasErrors);
  }, [userData, validationErrors, setIsErrors]);

  return (
    <div className="flex flex-col">
      {/* Full Name Input */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Full Name
        </div>
        <div className="bg-white my-2 p-1 flex border rounded">
          <input
            onChange={handleChange}
            value={userData["fullname"] || ""}
            name="fullname"
            placeholder="Full Name"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.fullname ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.fullname && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.fullname}
          </p>
        )}
      </div>

      {/* Email Address Input */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Email Address
        </div>
        <div className="bg-white my-2 p-1 flex border rounded">
          <input
            onChange={handleChange}
            value={userData["email"] || ""}
            name="email"
            placeholder="Email"
            type="email"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.email && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
        )}
      </div>

      {/* Date of Birth Input */}
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Date of Birth
        </div>
        <div className="bg-white my-2 p-1 flex border rounded">
          <input
            onChange={handleChange}
            value={userData["dob"] || ""}
            name="dob"
            type="date"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.dob ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.dob && (
          <p className="text-red-500 text-xs mt-1">{validationErrors.dob}</p>
        )}
      </div>
      <a href="/login" className="text-blue-500 text-s mt-1">
        Already have account?/Login
      </a>
    </div>
  );
};

export default PersonalInfo;
