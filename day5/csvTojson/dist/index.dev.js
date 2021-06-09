"use strict";

var csvtojson = require('csvtojson');

var fs = require('fs');

var filepath = "example.csv";
csvtojson().fromFile(filepath).then(function (jsonData) {
  console.log(jsonData); // saving the file or writing the file we will use the file sysytem which is the built in method in nodejs

  fs.writeFileSync("output.json", JSON.stringify(jsonData), "utf-8", function (err) {
    console.log(err);
  });
})["catch"](function (err) {
  console.log(err);
});