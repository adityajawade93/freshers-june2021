const status = response => {
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response)
    }
    return Promise.reject(new Error(response.statusText))
}
const json = response => response.json();
const fs = require("fs");
const arrayToCSV = require("objects-to-csv");
let size = 500;

var options = {
    method: "GET",
    url: "https://api.instantwebtools.net/v1/passenger?page=0&size=500",
    headers: {},
};
const axios = require("axios");
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