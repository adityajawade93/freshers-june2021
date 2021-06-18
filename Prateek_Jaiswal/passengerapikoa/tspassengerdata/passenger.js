var require;
var fs = require("fs");
var arrayToCSV = require("objects-to-csv");
var size = 500;
var i = 0;
var options = {
    method: "GET",
    url: "https://api.instantwebtools.net/v1/passenger?page=0&size=500",
    headers: {}
};
var axios = require("axios");
axios(options)
    .then(function (response) {
    var csvArray = [];
    var promises = [];
    for (i = 0; i < 18; i++) {
        options.url = "https://api.instantwebtools.net/v1/passenger?page=" + i + "&size=" + size;
        promises.push(axios(options).then(function (response) {
            csvArray = csvArray.concat(response.data.data);
        }));
    }
    Promise.all(promises).then(function () {
        var csvFile = new arrayToCSV(csvArray);
        csvFile.toDisk("./passengers.csv");
        fs.writeFile("passengers.json", JSON.stringify(csvArray), "utf8", function (err) {
            if (err) {
                throw err;
            }
        });
    });
})["catch"](function (error) {
    if (error)
        throw new Error(error);
});
