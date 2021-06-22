const axios = require('axios');
const fs = require('fs');

const url = 'https://api.instantwebtools.net/v1/passenger?page=0&size=5';

const options = {
	'method': 'GET',
	'url': url
};

axios(options)
	.then((response) => {
		const csv = response.data.data;
		const json = {};
		for(let i = 0 ; i < csv.length ; i++) {
			json[csv[i]._id] = csv[i];
		}
		fs.writeFile('passengers.json', JSON.stringify(json), 'utf8', (err) => {
			if (err) {
				throw err;
			}
		});
	})
	.catch((error) => {
		if (error) 
			throw new Error(error);
	});