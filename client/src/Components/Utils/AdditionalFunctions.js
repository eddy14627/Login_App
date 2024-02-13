export const Steps = (newStep) => {
  return newStep.map((step, index) => (
    <div
      key={index}
      className={
        index !== newStep.length - 1
          ? "w-full flex items-center"
          : "flex items-center"
      }
    >
      <div className="relative flex flex-col items-center text-teal-600">
        {/* Step indicator */}
        <div
          className={`rounded-full transition duration-500 ease-in-out border-2 border-gray-300
             h-12 w-12 flex items-center justify-center py-3 ${
               step.selected
                 ? "bg-green-600 text-white font-bold border border-green-600"
                 : ""
             }`}
        >
          {step.completed ? (
            <span className="text-white font-bold text-xl">✓</span>
          ) : (
            index + 1
          )}
        </div>
        {/* Description */}
        <div
          className={`absolute top-0 text-center mt-16 w-32 text-xs font-medium uppercase ${
            step.highlighted ? "text-gray-900" : "text-gray-400"
          }`}
        >
          {step.description}
        </div>
      </div>
      {/* Divider line between steps */}
      {index < newStep.length - 1 && (
        <div
          className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
            step.completed ? "border-green-600" : "border-gray-300"
          }`}
        ></div>
      )}
    </div>
  ));
};

export const updateStep = (stepNumber, steps) => {
  const newSteps = steps.map((step, index) => {
    return {
      ...step,
      highlighted: index === stepNumber,
      selected: index <= stepNumber,
      completed: index < stepNumber,
    };
  });
  return newSteps;
};
