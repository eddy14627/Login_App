export const AccountValidateInput = (
  name,
  value,
  validationErrors,
  setValidationErrors,
  userData
) => {
  let errors = { ...validationErrors };

  switch (name) {
    case "username":
      errors.username =
        value.length < 3 ? "Minimum length is 3 characters" : "";
      break;
    case "password":
      errors.password =
        value.length < 6 ? "Minimum length is 6 characters" : "";
      break;
    case "confirmPassword":
      errors.confirmPassword =
        value !== userData.password ? "Passwords do not match" : "";
      break;
    default:
      break;
  }

  setValidationErrors(errors);
};
