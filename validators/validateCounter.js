const { body } = require("express-validator");

exports.validateCounter = [
  body("current", "New value is madatory").exists(),
  body("current", "New value must be an integer").isInt(),
  body("current", "New value must positive").custom((value, { req }) => {
    if (value < 0) throw new Error("New value must be a positive integer");
    return true;
  })
];
