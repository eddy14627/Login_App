export const personalValidateInput = (
  name,
  value,
  validationErrors,
  setValidationErrors
) => {
  let errors = { ...validationErrors };

  switch (name) {
    case "fullname":
      errors.fullname =
        value.length < 3 ? "Minimum length is 3 characters" : "";
      break;
    case "email":
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      errors.email = emailRegex.test(value) ? "" : "Invalid email format";
      break;
    case "dob":
      errors.dob =
        isValidDate(value) && isDateBeforeToday(value)
          ? ""
          : "Invalid date format or date is not before today";
      break;
    default:
      break;
  }

  setValidationErrors(errors);
};

const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return regex.test(dateString);
};

const isDateBeforeToday = (dateString) => {
  const today = new Date();
  const selectedDate = new Date(dateString);
  return selectedDate < today;
};
