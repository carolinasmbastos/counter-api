const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/authorization");
const { validateCounter } = require("../validators/validateCounter");
const { validationResult } = require("express-validator");

// retrieves the next available integer value (greater than 0)
router.get("/next", verifyJwt, (req, res, next) => {
  res.json({
    data: {
      type: "integer",
      id: ++counter
    }
  });
});

// retrieves the current available integer value (greater than 0)
router.get("/current", verifyJwt, (req, res, next) => {
  res.json({
    data: {
      type: "integer",
      id: counter
    }
  });
});

// reset the current value to a given non-negative value
router.put("/current", verifyJwt, validateCounter, (req, res, next) => {
  //Get validation results if there are any
  let valErrors = validationResult(req).array();

  if (valErrors.length != 0) {
    next({ status: 422, errors: valErrors });
  } else {
    counter = req.body.current;
    res.json({
      data: {
        type: "integer",
        id: counter
      }
    });
  }
});

exports.counterRouter = router;
