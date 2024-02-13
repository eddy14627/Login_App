# Multi-Step Form React Application

Created a React application that features a multi-step form with validation. The form guides users through several steps, each with its own set of form fields. Users can navigate between steps, and the form provides client-side validation for input fields.

## Deployment

The application is deployed and accessible at [this link](https://65ad12e57f62d859a9ed7b04--startling-lokum-44b2e2.netlify.app/).

## Key Features

### Multi-Step Form

- The form comprises of three steps, each with a unique set of form fields.
- Users can navigate between steps, moving back to the previous step or proceeding to the next one.

### Form Fields

#### Step 1: Personal Information

- Full Name (text input)
- Email Address (email input)
- Date of Birth (date input)

#### Step 2: Address Information

- Street Address (text input)
- City (text input)
- State (dropdown/select input)
- Zip Code (numeric input)

#### Step 3: Account Setup

- Username (text input)
- Password (password input)
- Confirm Password (password input)

### Validation Logic

- Each form field undergoes client-side validation with meaningful error messages.
- Validation includes checks for required fields, email formats, numeric inputs, etc.

### Navigation

- Navigation buttons allow users to move between steps, facilitating easy progression through the form.
- The "Next" button is disabled if the current step has validation errors.

### User Interface

- The user interface is designed to be clean, intuitive, and responsive.
- Error messages are prominently displayed to guide users in correcting their inputs.

## How to Run

### `npm install`

Install all dependencies

### `npm start`

Run the app in development mode at [http://localhost:3000](http://localhost:3000). The page will reload when changes are made.

### `npm test`

Launch the test runner in interactive watch mode.

### `npm run build`

Build the app for production in the `build` folder. It bundles React in production mode and optimizes the build for performance.

### `npm run eject`

Note: Eject is a one-way operation. Once you eject, you can't go back. It copies configuration files and dependencies into your project for full control.

## Additional Information

The code is well-structured, follows best practices, and includes comments explaining complex logic. The README.md file provides comprehensive instructions for running the application.

Enjoy using the multi-step form!
