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
		const json = JSON.stringify(csv);
		fs.writeFile('passengers.json', json, 'utf8', (err) => {
			if (err) {
				throw err;
			}
		});
	})
	.catch((error) => {
		if (error) 
			throw new Error(error);
	});