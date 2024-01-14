const jwt = require("jsonwebtoken");
const path = require("path");

require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const authenticate = async (req, res, next) => {
  try {
    const authtoken = req.headers.authtoken;

    if (authtoken) {
      const id = await jwt.verify(authtoken, process.env.Secret);
      if (id !== undefined) {
        req.id = id;

        next();
      } else {
        res.status(400).send("Not Authenticated");
      }
    } else {
      res.status(400).send("Not Authenticated");
    }
  } catch (error) {
    res.status(400).send("Not Authenticated");
  }
};

module.exports = authenticate;
