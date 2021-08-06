const https = require("https");
const fs = require("fs");
const arrayToCSV = require("objects-to-csv");

var total_page;
var current_page = 0;
var page_size = 500;
url = "https://api.instantwebtools.net/v1/passenger?";
passangers = [];

make_api_call(current_page,page_size);

function make_api_call(page, size){
    https.get(url + 'page='+page+'&size='+size, (res) => {
        let data = "";
        res.on('data', (chunk) => {
            data += chunk;
        });
        res.on('end', () => {
            data = JSON.parse(data);
            console.log(current_page);
            total_page = data.totalPages;
            passangers = passangers.concat(data.data);
            current_page++;
            if(current_page != total_page)
                make_api_call(current_page,page_size);
            else
                saveData();
        });
    }).on('error', (err) => {
        console.log("Error : " + err.message);
    });
}

function saveData(){
    csvFile = new arrayToCSV(passangers);
    csvFile.toDisk("./passengers.csv");
    fs.writeFile("passengers.json", JSON.stringify(passangers), "utf8", (err) => {
        if (err) throw err;
    });
}








// const header = ["_id, name, trips, airline, __v"];
// writeToCSVFile(header + '\n');

// function extractAsCSV(data) {
//     const rows = data.map(item =>
//         `${item._id}, ${item.name}, ${item.trips}, ${JSON.stringify(item.airline[0])}, ${item.__v}`
//     );
//     return rows.join('\n') + '\n';
// }

// function writeToCSVFile(data) {
//     let filename = 'data.csv';
//     fs.appendFile(filename, extractAsCSV(data), err => {
//         if (err) {
//             console.log('Error writing to csv file', err);
//         } else {
//             console.log(`saved as ${filename}`);
//         }
//     });
// }

// function writeToJSONFile(data) {
//     let filename = 'data.json';
//     data = JSON.stringify(data);
//     fs.appendFile(filename, data, err => {
//         if (err) {
//             console.log('Error writing to json file', err);
//         } else {
//             console.log(`saved as ${filename}`);
//         }
//     });
// }