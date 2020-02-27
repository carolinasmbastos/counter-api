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

// endpoint: /next, method: get
// retrieves the next available integer value (greater than 0)
app.get(prefix + "/next", (req, res) => {
  res.json({
    data: {
      type: "integer",
      id: ++counter
    }
  });
});

// endpoint: /current, method: get
// retrieves the current available integer value (greater than 0)
app.get(prefix + "/current", (req, res) => {
  res.json({
    data: {
      type: "integer",
      id: counter
    }
  });
});

// endpoint: /current, method: put
// reset the current value to a given non-negative value
app.put(prefix + "/current", validateCounter, (req, res) => {
  //Get validation results if there are any
  const valErrors = validationResult(req).array();

  if (valErrors.length != 0) {
    console.log(valErrors);
    res.status(422).send({ errors: valErrors });
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

app.set("port", process.env.PORT || 8080);

const server = app.listen(app.get("port"), () => {
  console.log("Server listening on ", app.get("port"));
});
