import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { baseUrl } from "./url";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";
import { personalValidateInput } from "../Components/Utils/PersonalInfoValidation";

const Login = () => {
  const [userData, setUserData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [errors, setIsErrors] = useState(null);
  const navigate = useNavigate();
  const { setToken, setCurrUser } = useContext(AppContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
    personalValidateInput(name, value, validationErrors, setValidationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${baseUrl}/api/users/auth`, userData);
      setToken(response.data.token);
      setCurrUser(response.data._id);
      navigate("/profilePage");
    } catch (error) {
      alert("Invalid user data, please try again");
      setUserData({});
    }
  };

  useEffect(() => {
    // Check if all fields are filled and update isError
    const allFieldsFilled =
      Object.keys(userData).length >= 2 &&
      Object.values(userData).every((val) => val !== "");

    const hasErrors = Object.keys(validationErrors).some(
      (key) => validationErrors[key] !== ""
    );

    setIsErrors(!allFieldsFilled || hasErrors);
  }, [userData, validationErrors, setIsErrors]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        <h1 className="text-3xl font-bold text-center mt-5 mb-10">Login</h1>
        <div className="flex flex-col">
          <div className="w-full flex-1">
            <div className="font-bold h-6 mt-3 mx-5 text-gray-500 text-xs leading-8 uppercase">
              Email Address
            </div>
            <div className="bg-white my-2 p-1 mx-4 flex border rounded">
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
              <p className="text-red-500 text-xs mt-1 mx-4">
                {validationErrors.email}
              </p>
            )}
          </div>
          <div className="w-full flex-1">
            <div className="font-bold h-6 mt-3 mx-5 text-gray-500 text-xs leading-8 uppercase">
              Password
            </div>
            <div className="bg-white my-2 mx-4 p-1 flex border border-gray-200 rounded">
              <input
                onChange={handleChange}
                value={userData["password"] || ""}
                name="password"
                placeholder="Password"
                type="password"
                className={`p-1 px-2 outline-none w-full text-gray-800 ${
                  validationErrors.password
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
            </div>
            {validationErrors.password && (
              <p className="text-red-500 text-xs mt-1 mx-4">
                {validationErrors.password}
              </p>
            )}
          </div>
          <div class="flex justify-between">
            <a href="/" className="text-blue-500 text-s mt-1 mx-5">
              Don't have account? or Register
            </a>
          </div>
        </div>
        <div className="container flex justify-around mt-8 mb-8">
          <button
            onClick={handleSubmit}
            disabled={errors}
            className={`uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
              errors
                ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Disable styling
                : "bg-green-500 text-white"
            }`}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
