import React, { useEffect, useState, useRef } from "react";
import { Steps, updateStep } from "./Utils/AdditionalFunctions";

const Stepper = ({ steps, currentStep }) => {
  // State to store the modified steps
  const [newStep, setNewStep] = useState([]);

  // Ref to hold the original steps
  const stepRef = useRef();

  // Effect to update steps whenever steps or currentStep changes
  useEffect(() => {
    // Initialize steps state with initial configuration
    const stepsState = steps.map((step, index) => ({
      description: step,
      completed: false,
      highlighted: index === 0,
      selected: index === 0,
    }));

    // Save the initial steps in the ref
    stepRef.current = stepsState;

    // Update the steps based on the current step number
    const current = updateStep(currentStep - 1, stepRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  // Generate JSX for displaying steps
  const displaySteps = Steps(newStep);

  return (
    <div className="mx-4 p-4 flex justify-between items-center">
      {displaySteps}
    </div>
  );
};

export default Stepper;
