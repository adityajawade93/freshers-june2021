import axios from "axios";
import fs from "fs";
import arrayToCSV from "objects-to-csv";



let op: Record<string,string> = {
    method: "GET",
    url: "https://api.instantwebtools.net/v1/passenger?page=0&size=500",
 
};

let size: number = 5;

axios(op)
    .then((response) => {
        let csvArray:any[] = [];
        let promises: any[] = [];
        for (let i : number = 0; i < 1; i++) {
            op.url = `https://api.instantwebtools.net/v1/passenger?page=${i}&size=${size}`;
            promises.push(
                axios(op).then((response) => {
                    csvArray = csvArray.concat(response.data.data);
                })
            );
        }

        Promise.all(promises).then(() => {
            const csvFile = new arrayToCSV(csvArray);
            csvFile.toDisk("./passengers.csv");

            fs.writeFile("passengers.json", JSON.stringify(csvArray), "utf8", (err: any) => {
                if (err) {
                    throw err;
                }
            });
        });
    })
    .catch((error: any) => {
        if (error) throw new Error(error);
    });
