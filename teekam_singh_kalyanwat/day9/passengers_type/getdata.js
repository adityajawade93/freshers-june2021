var fs = require('fs');
var axios = require('axios');
var jsontocsv = require('json-2-csv');
var users = [];
var i = 0;
function helper(num) {
    axios.get("https://api.instantwebtools.net/v1/passenger?page=" + num + "&size=500")
        .then(function (res) {
        var passengers = res.data['data'];
        console.log("done" + i);
        users = users.concat(passengers);
        i++;
        if (i < 18) {
            helper(i);
        }
        if (i == 18) {
            var jsonString = JSON.stringify(users);
            fs.writeFile('./passangers.json', jsonString, function (err) {
                if (err)
                    console.log(err);
            });
            jsontocsv.json2csv(users, function (err, csv) {
                if (err)
                    throw err;
                fs.writeFileSync('passangers.csv', csv);
            });
            i++;
            console.log('done');
        }
    })["catch"](function (err) {
        console.log('Error: ', err.message);
    });
    return;
}
helper(i);
