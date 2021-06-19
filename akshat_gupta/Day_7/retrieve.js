const axios = require('axios');
const fs = require('fs');
const arrayToCSV = require('objects-to-csv');

const url = 'https://api.instantwebtools.net/v1/passenger?page=0&size=500';
const urlprefix= url.split('?')[0];
const size = 500;

const constructString = (page, size) => {
	return 'page=' + page.toString() + '&size=' + size.toString(); 
};

const options = {
	'method': 'GET',
	'url': urlprefix + '?' + constructString(0, size),
};

axios(options)
	.then((response) => {
		return response.data.totalPages;
	})
	.then((totalPages) => {
		let csv = [];
		let promises = [];
		for (let i = 0; i < totalPages ; i++) {
			options.url = urlprefix + '?' + constructString(i, size);
			promises.push(
				axios(options).then((response) => {
					response.data.data.forEach((value) => {
						csv.push(value);
					});
				})
			);
		}
		Promise.all(promises).then(() => {
			const newCSV = new arrayToCSV(csv);
			newCSV.toDisk('./passengers.csv');
			const json = JSON.stringify(csv);
			fs.writeFile('passengers.json', json, 'utf8', (err) => {
				if (err) {
					throw err;
				}
			});
		});
	})
	.catch((error) => {
		if (error) 
			throw new Error(error);
	});