const express = require("express");
const app = express();
const { validationResult } = require("express-validator");
const { validateCounter } = require("./validators/validateCounter");
const { validateUser } = require("./validators/validateUser");
const jwt = require("jsonwebtoken");
const verifyJwt = require("./middleware/authorization");

bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

const prefix = "/api";
var counter = 0;
var validUsers = [];

app.use(express.urlencoded({ extended: true }));

// register a new user and retrieves a valid JWT
app.post("/register", validateUser, (req, res, next) => {
  let valErrors = validationResult(req).array();

  if (valErrors.length != 0) {
    console.log(valErrors);
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
    //console.log(token);

    res.status(200).send({ token, user });
  }
});

// retrieves the next available integer value (greater than 0)
app.get(prefix + "/next", verifyJwt, (req, res, next) => {
  res.json({
    data: {
      type: "integer",
      id: ++counter
    }
  });
});

// retrieves the current available integer value (greater than 0)
app.get(prefix + "/current", verifyJwt, (req, res, next) => {
  res.json({
    data: {
      type: "integer",
      id: counter
    }
  });
});

// reset the current value to a given non-negative value
app.put(prefix + "/current", verifyJwt, validateCounter, (req, res, next) => {
  //Get validation results if there are any
  let valErrors = validationResult(req).array();

  if (valErrors.length != 0) {
    console.log(valErrors);
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

app.all("*", (req, res, next) => {
  next({
    status: 404,
    errors: `Requested path ${req.originalUrl} does not exist`
  });
});

let errorHandler = (error, req, res, next) => {
  console.log("--> error Handler: ", error);
  res.status(error.status != undefined ? error.status : "500");
  res.send(error);
};

app.use(errorHandler);

app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log("Server listening on ", app.get("port"));
});
