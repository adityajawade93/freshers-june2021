const axios = require("axios");
const fs = require("fs");
const arrayToCSV = require("objects-to-csv");

var options = {
    method: "GET",
    url: "https://api.instantwebtools.net/v1/passenger?page=0&size=500",
    headers: {},
};

let size = 500;

axios(options)
    .then((response) => {
        let csvArray = [];
        let promises = [];
        for (i = 0; i < 18; i++) {
            options.url = `https://api.instantwebtools.net/v1/passenger?page=${i}&size=${size}`;
            promises.push(
                axios(options).then((response) => {
                    csvArray = csvArray.concat(response.data.data);
                })
            );
        }

        Promise.all(promises).then(() => {
            const csvFile = new arrayToCSV(csvArray);
            csvFile.toDisk("./passengers.csv");

            fs.writeFile("passengers.json", JSON.stringify(csvArray), "utf8", (err) => {
                if (err) {
                    throw err;
                }
            });
        });
    })
    .catch((error) => {
        if (error) throw new Error(error);
    });
