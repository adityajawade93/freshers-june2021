const fs = require('fs');
const CSVToJSON = require('csvtojson');

module.exports.converter = function (path, name) {
    CSVToJSON().fromFile(path)
        .then(data => {
            let dest_path = `./json-files/${name}.json`;
            fs.writeFile(dest_path, JSON.stringify(data, null, 4), (err) => {
                if (err) {
                    throw err;
                }
                console.log("JSON array is saved.");
            });
        }).catch(err => {
            console.log(err);
        });
}


