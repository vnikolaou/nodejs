const express = require("express");

var app = express();

var router = require("./routes.js");
app.use("/api", router);

//Other routes here
app.get('*', function(req, res){
   res.send('Sorry, this is an invalid URL.');
});

app.listen(3000);

console.log('Server running at http://127.0.0.1:3000/');
