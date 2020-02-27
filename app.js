const express = require("express");
const app = express();
const { validationResult } = require("express-validator");
const { validateCounter } = require("./validators/validateCounter");

bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());

app.use(cors());

const prefix = "/api";
var counter = 0;

app.use(express.urlencoded({ extended: true }));

// retrieves the next available integer value (greater than 0)
app.get(prefix + "/next", (req, res, next) => {
  res.json({
    data: {
      type: "integer",
      id: ++counter
    }
  });
});

// retrieves the current available integer value (greater than 0)
app.get(prefix + "/current", (req, res, next) => {
  res.json({
    data: {
      type: "integer",
      id: counter
    }
  });
});

// reset the current value to a given non-negative value
app.put(prefix + "/current", validateCounter, (req, res, next) => {
  //Get validation results if there are any
  const valErrors = validationResult(req).array();

  if (valErrors.length != 0) {
    console.log(valErrors);    
    next({ status: 422, errors: valErrors});

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
  next({ status: 404, errors: `Requested path ${req.originalUrl} does not exist` });
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
