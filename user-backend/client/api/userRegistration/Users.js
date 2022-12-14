const express = require("express");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("./UserModule");
const authUser = require("../../middleware/authUser");
const {
  reqFName,
  reqEmail,
  reqMobileNumber,
  reqPassword,
  reqLName,
  reqCity,
  reqState,
  reqZipCode,
} = require("../Validators/validators");

const userRouter = express.Router();

userRouter.post(
  "/createuser",
  [
    reqFName,
    reqLName,
    reqMobileNumber,
    reqEmail,
    reqPassword,
    reqCity,
    reqState,
    reqZipCode,
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const {
        firstName,
        lastName,
        email,
        mobileNumber,
        city,
        state,
        zipCode,
        password,
      } = req.body;
      let user = await Users.findOne({ email });
      if (user) {
        return res.status(400).json({
          success: false,
          error: "Sorry a user with this email already exist.",
        });
      }
      // password hashing and salting
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(password, salt);

      // creating new user in databse
      user = await Users.create({
        firstName,
        lastName,
        email,
        mobileNumber,
        city,
        state,
        zipCode,
        password: hashedPass,
      });
      const data = {
        user: {
          id: user.id,
        },
      };
      // all are correct then jwt signing in and return genrated token to the user.
      const authToken = jwt.sign(data, process.env.JWT_Secret);
      res.status(200).json({ success: true, authToken });
    } catch (error) {
      console.log(error);
      res.status(500).send("Inetrnal Error Occured.");
    }
  }
);

// Login request using authontication Token
userRouter.post("/login", authUser, async (req, res) => {
  const errors = validationResult(req);
  // console.log(`userid:${req.user.id}`);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  const { email, password } = req.body;
  try {
    // Checking email exist or not.
    let user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        error: "Incorrect username.",
      });
    }

    // Comparing password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        errors: "Incorrect password please try again.",
      });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const userToken = jwt.sign(data, process.env.JWT_Secret);
    res.status(200).json({ success: true, userToken });
  } catch (error) {
    res.status(500).send("Internal error occured.");
  }
});

module.exports = userRouter;
