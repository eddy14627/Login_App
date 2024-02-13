import React, { useState, useContext, useEffect } from "react";
import { StepperContext } from "../../Contexts/StepperContext";
import { AccountValidateInput } from "../Utils/AccountValidation";
import axios from "axios";
import { baseUrl } from "../../Pages/url";

const AccountSetup = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [ImageUpload, setImageUpload] = useState("Upload");
  const [error, setError] = useState(null);
  const {
    userData,
    setUserData,
    validationErrors,
    setValidationErrors,
    setIsErrors,
  } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    AccountValidateInput(
      name,
      value,
      validationErrors,
      setValidationErrors,
      userData
    );
  };

  const handleChooseFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImage(file);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      const response = await axios.post(
        `${baseUrl}/api/upload/upload-cloudinary`,
        formData
      );

      console.log("response : ", response);
      const urlFromResponse = response.data.image;
      setUserData({ ...userData, profile: urlFromResponse });
      setImageUpload("Uploaded");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Check if all fields are filled and update isError
    const allFieldsFilled =
      Object.keys(userData).length >= 11 &&
      Object.values(userData).every((val) => val !== "");

    const hasErrors = Object.keys(validationErrors).some(
      (key) => validationErrors[key] !== ""
    );

    setIsErrors(!allFieldsFilled || hasErrors);
  }, [userData, validationErrors, setIsErrors]);

  return (
    <div className="flex flex-col">
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Username
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["username"] || ""}
            name="username"
            placeholder="Username"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.username && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.username}
          </p>
        )}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Password
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["password"] || ""}
            name="password"
            placeholder="Password"
            type="password"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.password && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.password}
          </p>
        )}
      </div>
      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Confirm Password
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["confirmPassword"] || ""}
            name="confirmPassword"
            placeholder="Confirm Password"
            type="password"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.confirmPassword
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
        </div>
        {validationErrors.confirmPassword && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.confirmPassword}
          </p>
        )}
      </div>

      <div className="w-full mx-2 flex-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Image Upload
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            type="file"
            accept="image/*"
            onChange={handleChooseFile}
            name="profile"
            className={`p-1 px-2 outline-none w-full text-gray-800 ${
              validationErrors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            onClick={handleUpload}
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 "
            disabled={ImageUpload === "Uploaded"}
          >
            {loading ? "...loading" : ImageUpload}
          </button>
        </div>
        {validationErrors.username && (
          <p className="text-red-500 text-xs mt-1">
            {validationErrors.username}
          </p>
        )}
      </div>
    </div>
  );
};

export default AccountSetup;
