"use strict";
var app = require('./app');
var port = 3000;
app.listen(port, function () {
    console.log("server is running on port ", port);
});
