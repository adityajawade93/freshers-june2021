const fs = require('fs').promises;
const CSVToJSON = require('csvtojson');

module.exports.converter = async (path, name) => {
    try {
        const data = await CSVToJSON().fromFile(path);
        let dest_path = `./json-files/${name}.json`;
        await fs.writeFile(dest_path, JSON.stringify(data, null, 4));
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
}


