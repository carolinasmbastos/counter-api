const express = require("express");
const router = express.Router();
const { validateUser } = require("../validators/validateUser");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

router.post("/register", validateUser, (req, res, next) => {
  let valErrors = validationResult(req).array();

  if (valErrors.length != 0) {
    next({ status: 422, errors: valErrors });
  } else {
    let user = req.body.email;
    validateUser.push(user);
    const token = jwt.sign(
      {
        sub: user
      },
      process.env.SECRET_PHRASE,
      { expiresIn: process.env.TOKEN_EXPIRATION }
    );
    res.status(200).send({ token, user });
  }
});

exports.authRouter = router;
