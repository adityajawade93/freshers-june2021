// JavaScript source code
const fs = require('fs');
const path = require('path');
const os = require('os');


const filename = path.join(__dirname, 'users.csv');
const output = []; 

const data = [
    {
        state: 'State',
        capital: 'Capital',
        population: 'Population'
    },

    {
        state: 'Assam',
        capital: 'Dispur',
        population: 138394
    },
    {
        state: 'Uttar Pradesh',
        capital: 'Lucknow',
        population: 1197856
    },
    {
        state: 'Orrisa',
        capital: 'Bhubhneshwar',
        population: 757641
    },
];

data.forEach((d) => {
    const row = []; 
    row.push(d.state);
    row.push(d.capital);
    row.push(d.population);

    output.push(row.join()); 
});

fs.writeFileSync(filename, output.join(os.EOL));
