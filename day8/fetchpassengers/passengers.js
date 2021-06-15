const axios = require('axios')
const fs = require('fs')
const csvconverter = require("json-2-csv")

var pageno = 0
var fetch = (passengerdata) => {

    if (pageno < 18) {
        var options = {
            method: "GET",
            url: "https://api.instantwebtools.net/v1/passenger?page=" + `${pageno}` + "&size=500"
        }

        let obj = {
            pageno: 0,
            data: ""
        }

        axios(options)
            .then((response) => {

                obj.pageno = pageno
                obj.data = JSON.parse(JSON.stringify(response.data.data, null, 2))
                passengerdata = passengerdata.concat(obj)
                pageno++
                fetch(passengerdata)
            })
            .catch((error) => {
                console.log(error)
            })

    } else {
        let jsondata = JSON.stringify(passengerdata, null, 2)
        fs.writeFileSync("passengers.json", jsondata, "utf8")
        csvconverter.json2csv(passengerdata, (err, csv) => {
            if (err) {
                console.log(err)
            } else {
                fs.writeFileSync("passengers.csv", csv, "utf8")
            }

        })
    }

}

fetch([])