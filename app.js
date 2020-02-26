const express = require("express");
const app = express();

const prefix = '/api'
var counter = 0;

// endpoint: /next
// method: get
// retrieves the next available integer value (greater than 0)
app.get(prefix + '/next', (req, res) => {
    res.json({data : {
        type : "integer",
        id : ++counter
    }})
})


// endpoint: /current
// method: get
// retrieves the current available integer value (greater than 0)
app.get(prefix + '/current', (req, res) => {
    res.json({data : {
        type : "integer",
        id : counter
    }})
})


app.set('port', process.env.PORT || 8080);

const server = app.listen(app.get('port'), () => {
    console.log("Server listening on ", app.get('port'))
})