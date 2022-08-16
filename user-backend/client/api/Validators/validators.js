const { body } = require("express-validator");

const validators = {
  reqFName: body("firstName")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("User name must be 5 to 50 character long."),
  reqLName: body("lastName")
    .trim()
    .isLength({ min: 5, max: 50 })
    .withMessage("User name must be 5 to 50 character long."),
  reqEmail: body("email")
    .trim()
    .isEmail()
    .withMessage("Email should be valid."),
  reqMobileNumber: body("mobileNumber")
    .trim()
    .isLength({ min: 10, max: 10 })
    .withMessage("Mobile number should be 10 digit long."),
  reqPassword: body("password")
    .trim()
    .isLength({ min: 5, max: 15 })
    .withMessage("Password should be 5 to 15 characters long."),
  reqCity: body("city")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage("City must be 5 to 20 characters long."),
  reqState: body("state")
    .trim()
    .isLength({ min: 5, max: 20 })
    .withMessage("State must be 5 to 20 characters long."),
  reqZipCode: body("zipCode")
    .trim()
    .isLength({ min: 5, max: 10 })
    .withMessage("ZIP code must be required."),
};

module.exports = validators;
