const { body } = require("express-validator");

exports.validateUser = [
  body("email", "Email is mandatory")
  .exists(),
  
  body("email", "Email is invalid").normalizeEmail().isEmail(),

  body("password", "Password is mandatory").exists().bail().not().isEmpty(),
  
];
