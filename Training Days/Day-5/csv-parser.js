const fs = require('fs')
const csv = require('csv-parser')
const users = [];
function generateUsername(firstname, lastname) {
    return `${firstname[0]}-${lastname}`.toLowerCase();
}
fs.createReadStream('addresses.csv')
  .pipe(csv())
  .on('data', function (row) {
    const username = generateUsername(row.FirstName, row.LastName);
    const password = "12345"
    
    const user = {
        username,
        password,
        firstname: row.FirstName,
        lastname: row.LastName,
        address: row.Address,
        city: row.City,
        // h5: row.h5,
        // h6: row.h6,
    }
    users.push(user)
  })
  .on('end', function () {
      console.table(users)
      // TODO: SAVE users data to another file
      writeToCSVFile(users)
    })


function writeToCSVFile(users) {
    const filename = 'output.csv';
    fs.writeFile(filename, extractAsCSV(users), err => {
        if (err) {
            console.log('Error writing to csv file', err);
        } else {
            console.log(`saved as ${filename}`);
        }
    });
}
    
function extractAsCSV(users) {
    const header = ["Username, Password, FirstName, LastName, Address, City"];
    const rows = users.map(user =>
        `${user.username}, ${user.password}, ${user.firstname}, ${user.lastname}, ${user.address}, ${user.city}`
    );
    return header.concat(rows).join("\n");
}