var axios = require('axios');
var fs = require('fs');
var csvconverter = require("json-2-csv");
var pageno = 0;
var fetchpassengers = function (passengerdata) {
    if (pageno < 18) {
        var options = {
            method: "GET",
            url: "https://api.instantwebtools.net/v1/passenger?page=" + ("" + pageno) + "&size=500"
        };
        var obj_1 = {
            pageno: 0,
            data: ""
        };
        axios(options)
            .then(function (response) {
            obj_1.pageno = pageno;
            obj_1.data = JSON.parse(JSON.stringify(response.data.data, null, 2));
            passengerdata = passengerdata.concat(obj_1);
            pageno++;
            fetchpassengers(passengerdata);
        })["catch"](function (error) {
            console.log(error);
        });
    }
    else {
        var jsondata = JSON.stringify(passengerdata, null, 2);
        fs.writeFileSync("passengers.json", jsondata, "utf8");
        csvconverter.json2csv(passengerdata, function (err, csv) {
            if (err) {
                console.log(err);
            }
            else {
                fs.writeFileSync("passengers.csv", csv, "utf8");
            }
        });
    }
};
fetchpassengers([]);
