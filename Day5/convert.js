const csvtoJSON = require('csvtojson');


async function ConverttoJSON()
{

    try{
        const data = await csvtoJSON().fromFile('file.csv');
        fs.writeFile('user.json', JSON.stringify(users, null, 4), (err) => {
            if (err) {
                throw err;
            }
            console.log("JSON array is saved.");
        });

    }
    catch(e)
    {
        console.log(e.stack);
    }

}