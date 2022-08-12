const { body } = require("express-validator");

const validators = {
  reqName: body("name")
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
};

module.exports = validators;
