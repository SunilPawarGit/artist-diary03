const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cors = require("cors");
const connectToDB = require("./client/dbConnection/connect");
const router = require("./client/routes/routes");
const app = express();

app.use(helmet());

dotenv.config({ path: "./config.env" });
const port = process.env.PORT || 8000;

// Mongodb connection
connectToDB();
app.use(express.json());
// router manages all api path
app.use(router);

app.use(cors);

app.listen(port, () =>
  console.log(`Example app listening on port http//:localhost:${port}`)
);
