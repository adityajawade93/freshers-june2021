import axios from 'axios';
import * as fs from 'fs-extra';
import arrayToCSV from 'objects-to-csv';

let url = 'https://api.instantwebtools.net/v1/passenger?page=0&size=500';
const urlprefix= url.split('?')[0];
const size = 500;

const constructString = (page: number, size: number) => {
	return 'page=' + page.toString() + '&size=' + size.toString(); 
};

axios.get(url)
	.then((response) => {
		return response.data.totalPages;
	})
	.then(async (totalPages) => {
		const csv: Array<any> = [];
		for (let i = 0; i < totalPages ; i++) {
			url = urlprefix + '?' + constructString(i, size);
			await axios.get(url)
				.then((response) => {
					response.data.data.forEach((value: any) => {
						csv.push(value);
					});
				});
                
		}
		const newCSV = new arrayToCSV(csv);
		newCSV.toDisk('./passengers.csv');
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