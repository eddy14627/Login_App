export const AddressValidateInput = (
  name,
  value,
  validationErrors,
  setValidationErrors
) => {
  let errors = { ...validationErrors };

  switch (name) {
    case "streetAddress":
      errors.streetAddress =
        value.length < 5 ? "Minimum length is 5 characters" : "";
      break;
    case "city":
      errors.city = value.length < 3 ? "Minimum length is 3 characters" : "";
      break;
    case "state":
      errors.state = value ? "" : "Please select a state";
      break;
    case "zipCode":
      errors.zipCode = /^\d+$/.test(value) ? "" : "Zip Code must be numeric";
      break;
    default:
      break;
  }
  setValidationErrors(errors);
};
