import React from "react";

const StepperControl = ({
  handleClick,
  handleConfirm,
  currentStep,
  steps,
  errors,
}) => {
  const handleButtonClick = (action) => {
    if (action === "confirm") {
      handleConfirm();
    } else {
      handleClick(action);
    }
  };

  return (
    <div className="container flex justify-around mt-4 mb-8">
      {/* Back Button */}
      <button
        onClick={() => handleButtonClick("back")}
        className={`bg-white text-slate-400 uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer border-2 border-slate-300 hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Back
      </button>

      {/* Next/Confirm Button */}
      <button
        onClick={() =>
          handleButtonClick(currentStep === steps.length ? "confirm" : "next")
        }
        disabled={errors} // Disable the button if there are validation errors
        className={`uppercase py-2 px-4 rounded-xl font-semibold cursor-pointer hover:bg-slate-700 hover:text-white transition duration-200 ease-in-out ${
          errors
            ? "bg-gray-400 text-gray-700 cursor-not-allowed" // Disable styling
            : "bg-green-500 text-white"
        }`}
      >
        {currentStep === steps.length ? "Confirm" : "Next"}
      </button>
    </div>
  );
};

export default StepperControl;
