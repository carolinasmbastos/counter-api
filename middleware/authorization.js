const jwt = require("jsonwebtoken");
require("dotenv").config();

const secret = process.env.SECRET_PHRASE;

const verifyJwt = (req, res, next) => {
  // console.log('Verifying authentication', req.headers)

  let token =
    req.headers.authorization != undefined
      ? req.headers.authorization.split(" ")[1]
      : "";
  //console.log('token---', token)

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      let error = { status: 403, errors: err };
      //console.log(error)
      next(error);
    } else {
      //console.log('===>', decoded)
      req.body.signedUser = decoded.sub;
      //console.log('******>>>>', req.body.signedUser)
      next();
    }
  });
};

module.exports = verifyJwt;
