import React, { useState } from "react";
import Stepper from "../Components/Stepper";
import StepperControl from "../Components/StepperControl";
import PersonalInfo from "../Components/steps/PersonalInfo";
import AddressInfo from "../Components/steps/AddressInfo";
import Final from "../Components/steps/Final";
import AccountSetup from "../Components/steps/AccountSetup";
import { StepperContext } from "../Contexts/StepperContext";
import axios from "axios";
import { baseUrl } from "./url";

function Register() {
  const [currentStep, setCurrentStep] = useState(1);
  const [userData, setUserData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [isError, setIsErrors] = useState(true);
  const [finalData, setFinalData] = useState([]);

  const steps = ["Personal information", "Address", "Account Setup"];

  // Handle next/back button click
  const handleClick = (direction) => {
    const newStep = direction === "next" ? currentStep + 1 : currentStep - 1;
    if (newStep > 0 && newStep <= steps.length + 1) {
      setCurrentStep(newStep);
    }
  };
  const handleConfirm = async () => {
    try {
      setLoading(true);
      console.log(userData);
      const response = await axios.post(`${baseUrl}/api/users`, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
    } catch (error) {
      setIsErrors(true);
    } finally {
      setLoading(false);
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
    }
  };

  // Display the current step component
  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <PersonalInfo />;
      case 2:
        return <AddressInfo />;
      case 3:
        return <AccountSetup />;
      case 4:
        return <Final error={isError} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="md:w-1/2 mx-auto shadow-xl rounded-2xl pb-2 bg-white">
        <h1 className="text-3xl font-bold text-center mt-5 mb-10">Register</h1>
        {/* Steps */}
        <div className="container horizontal mt-5">
          <Stepper steps={steps} currentStep={currentStep} />
        </div>

        {/* Info for Each Step */}
        <div className="my-10 p-10">
          <StepperContext.Provider
            value={{
              userData,
              setUserData,
              finalData,
              setFinalData,
              validationErrors,
              setValidationErrors,
              isError,
              setIsErrors,
            }}
          >
            {displayStep(currentStep)}
          </StepperContext.Provider>
        </div>

        {/* Buttons */}
        {currentStep !== steps.length + 1 && (
          <StepperControl
            handleClick={handleClick}
            handleConfirm={handleConfirm}
            currentStep={currentStep}
            steps={steps}
            errors={isError}
          />
        )}
      </div>
    </div>
  );
}

export default Register;
