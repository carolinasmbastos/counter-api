const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET_PHRASE;

const verifyJwt = (req, res, next) => {
  let token =
    req.headers.authorization != undefined
      ? req.headers.authorization.split(" ")[1]
      : "";

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      let error = { status: 403, errors: err };
      next(error);
    } else {
      req.body.signedUser = decoded.sub;
      next();
    }
  });
};

module.exports = verifyJwt;
