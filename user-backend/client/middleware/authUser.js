const jwt = require("jsonwebtoken");

const authUser = (req, res, next) => {
  const jwt_secret = process.env.jwt_secret;
  const userToken = req.header("Authorization");
  console.log(userToken);
  const slicedToken = userToken.slice(7);
  console.log(slicedToken);
  if (!userToken) {
    res.status(401).send({ error: "Access Denied. Invalid Token." });
  } else {
    try {
      if (userToken.includes("Bearer")) {
        const data = jwt.verify(slicedToken, jwt_secret);
        req.user = data.user;
        next();
      } else {
        const data = jwt.verify(userToken, jwt_secret);
        req.user = data.user;
        next();
      }
    } catch (error) {
      res.status(401).send({ error: "Invalid Token." });
    }
  }
};

module.exports = authUser;
