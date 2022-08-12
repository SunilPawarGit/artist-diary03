const express = require("express");
const userRouter = require("../api/userRegistration/Users");

const router = express.Router();
router.get("/", async (req, res) => {
  res
    .status(200)
    .json({ success: true, message: "Artist-Diary Client Projects." });
});

router.use("/user", userRouter);
module.exports = router;
