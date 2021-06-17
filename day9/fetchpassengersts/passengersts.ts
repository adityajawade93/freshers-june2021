const axios = require('axios')
const fs = require('fs')
const csvconverter = require("json-2-csv")


type optionstype ={
    method:string
    url:string
}

type objtype ={
    pageno:number
    data:string
}

var pageno:number = 0
var fetchpassengers:any = (passengerdata:Array<objtype>) => {

    if (pageno < 18) {
        var options:optionstype = {
            method: "GET",
            url: "https://api.instantwebtools.net/v1/passenger?page=" + `${pageno}` + "&size=500"
        }

        
        let obj:objtype = {
            pageno: 0,
            data: ""
        }

        axios(options)
            .then((response:any) => {

                obj.pageno = pageno
                obj.data = JSON.parse(JSON.stringify(response.data.data, null, 2))
                passengerdata = passengerdata.concat(obj)
                pageno++
                fetchpassengers(passengerdata)
            })
            .catch((error) => {
                console.log(error)
            })

    } else {
        let jsondata:string = JSON.stringify(passengerdata, null, 2)
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

fetchpassengers([])