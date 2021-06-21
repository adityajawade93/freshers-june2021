import * as koa from "koa";
import * as koarouter from "@koa/router";
import * as bodyParser from "koa-bodyparser";
import * as fs from "fs";
import * as uuid from "uuid";
const app = new koa();
const router = new koarouter();

class Airline {
    private id: number;
    private name: string;
    private country: string;
    private logo: string;
    private slogan: string;
    private head_quaters: string;
    private website: string;
    private established: string;
    constructor(id: number, name: string, country: string, logo: string, slogan: string,
        head_quater: string, website: string, established: string) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.logo = logo;
        this.slogan = slogan;
        this.head_quaters = head_quater;
        this.website = website;
        this.established = established;

    }

}

class Passenger {


    private _id: string;
    private name: string;
    private trips: number;
    private __v: number;
    private airline: Array<Airline>;
    /**
     * Getter id
     * @return {string}
     */
    public get gid(): string {
        return this._id;
    }
    /**
     * Getter name
     * @return {string}
     */
    public get gname(): string {
        return this.name;
    }

    /**
     * Getter trips
     * @return {number}
     */
    public get gtrips(): number {
        return this.trips;
    }

    /**
     * Getter v
     * @return {number}
     */
    public get v(): number {
        return this.__v;
    }

    /**
     * Getter Airlines 
     * @return {Array<Airline>}
     */
    public get gairlines(): Array<Airline> {
        return this.airline;
    }

    /**
     * Setter id
     * @param {string} value
     */
    public set sid(value: string) {
        this._id = value;
    }

    /**
     * Setter name
     * @param {string} value
     */
    public set sname(value: string) {
        this.name = value;
    }

    /**
     * Setter trips
     * @param {number} value
     */
    public set strips(value: number) {
        this.trips = value;
    }

    /**
     * Setter v
     * @param {number} value
     */
    public set v(value: number) {
        this.__v = value;
    }

    /**
     * Setter airlines
     * @param {Array<Airline>} value
     */
    public set sairlines(value: Array<Airline>) {
        this.airline = value;
    }
    constructor(id: string, name: string, trips: number, v: number, airlines: Array<Airline>) {
        this._id = id;
        this.name = name;
        this.trips = trips;
        this.__v = v;
        this.airline = airlines;
    }


}

var passengerInfoList: Array<Passenger>;
passengerInfoList = [];
const fetchPassengerInfoFromFile = (filePath: string): any => {

    const prmiseRead = (resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data: any) => {
            if (err) {
                reject("File Not Read");

            }
            else {
                resolve(data);

            }
        });
    };

    return new Promise(prmiseRead);
}

const getData = async () => {
    try {
        await fetchPassengerInfoFromFile("./passengerInfo.json").then((data) => {
            //console.log("Get Data Inside");
            //passengerInfoList = JSON.parse(data);
            var dataList: any[] = JSON.parse(data);
            var noOfData: number = dataList.length;
            var count = 0;
            for (var i: number = 0; i < noOfData; i++) {
                var airlines: Array<Airline> = new Array<Airline>();

                var numberofAirlines: number = dataList[i].airline.length;

                for (var j: number = 0; j < numberofAirlines; j++) {
                    //console.log(dataList[i].airline[j].name);
                    var airline: Airline = new Airline(dataList[i].airline[j].id,

                        dataList[i].airline[j].name,
                        dataList[i].airline[j].country,
                        dataList[i].airline[j].logo,
                        dataList[i].airline[j].slogan,
                        dataList[i].airline[j].head_quaters,
                        dataList[i].airline[j].website,
                        dataList[i].airline[j].established);
                    airlines.push(airline);

                }
                if (airlines.length === 0) {
                    count++;
                }
                var passenger: Passenger = new Passenger(dataList[i]._id, dataList[i].name, dataList[i].trips,
                    dataList[i].__v, airlines);
                passengerInfoList.push(passenger);
            }
            //console.log(passengerInfoList.length, count);
            //console.log(passengerInfoList[0].airlines);
        });

        //console.log("Get data outside");
    }
    catch {
        //console.log("Read Error")
    }
}
getData();
type query = {
    page: number;
    size: number;
}
const validateQueryURL = (query: query): query => {
    try {
        //.log(typeof query);
        const page = Number(query.page);
        const size = Number(query.size);
        //console.log(typeof page);
        var query: query = { page: 0, size: 500 };
        if (page !== undefined && size !== undefined && !isNaN(page) && !isNaN(size) && page >= 0 && size > 0) {
            query.page = page;
            query.size = size;
            return query;
        }
        else {
            return query;
        }
    }
    catch {
        return query;
    }

}

const findRangeofRequestedData = (page: number, size: number): Array<number> | boolean => {
    const numberOfentry: number = passengerInfoList.length;
    const maxNumberOfPages: number = Math.ceil(numberOfentry / size);
    let minIndex: number = 0;

    if (page < maxNumberOfPages) {
        minIndex = page * size;
        let maxIndex = numberOfentry < size ? numberOfentry : size * (page + 1);
        return [minIndex, maxIndex];
    }
    else {
        return false;
    }

}

const updatePassengerInfoFile = () => {
    var contenTowrite = JSON.stringify(passengerInfoList, null, 4);
    fs.writeFile("./passengerInfo.json", contenTowrite, (err) => {
        if (err) {
            //console.log(err);
            return;
        }
        else {
            //console.log("File is saved successfully");
        }
    });
}

const fetchpassenerInfo = async (ctx: koa.Context, next: koa.Next) => {
    var query: query = {
        page: Number(ctx.query.page),
        size: Number(ctx.query.size)

    }
    var inputData: query = validateQueryURL(query);
    const range: Array<number> | boolean = findRangeofRequestedData(inputData.page, inputData.size);
    if (range === false) {
        ctx.status = 406;
        ctx.body = "Page Number overflow";
    }
    else {
        var minIndex: number = range[0];
        var maxIndex: number = range[1];
        ctx.status = 200;
        ctx.body = passengerInfoList.slice(minIndex, maxIndex);
        //updatePassengerInfoFile();
    }

}
const createAPassenger = async (ctx: koa.Context, next: koa.Next) => {
    try {
        var requestBody: any = ctx.request.body;
        var name: string = requestBody.name;
        var trips: number = requestBody.trips;
        var id: string = uuid.v4();
        var airlineId: number = Number(requestBody.airline[0].id);
        var airlineName: string = requestBody.airline[0].name;
        var airlineCountry: string = requestBody.airline[0].country;
        var airlineLogo: string = requestBody.airline[0].logo;
        var airlineSlogan: string = requestBody.airline[0].slogan;
        var airlineHeadQuater: string = requestBody.airline[0].head_quaters;
        var airlineWebsite: string = requestBody.airline[0].website;
        var airlineestablished: string = requestBody.airline[0].established;
        var airlines: Array<Airline> = new Array<Airline>();
        var airline: Airline = new Airline(airlineId, airlineName, airlineCountry,
            airlineLogo, airlineSlogan, airlineHeadQuater, airlineWebsite, airlineestablished);
        airlines.push(airline);
        var newPassenger = new Passenger(id, name, trips, 0, airlines);
        passengerInfoList.push(newPassenger);
        await updatePassengerInfoFile();
        ctx.status = 200;
        ctx.body = " New Passenger Info Created Successfully with id :" + id;
    }
    catch (e) {
        //console.log(e);
        ctx.status = 400;
        ctx.body = "Invalid Input";
    }

}

const updatePassengerInfo = async (ctx: koa.Context, next: koa.Next) => {
    var requestBody: any = ctx.request.body;
    var id: string = ctx.params.id;
    var positionOfPassenger: number = -1;
    for (let index: number = 0; index < passengerInfoList.length; index++) {

        if (passengerInfoList[index].gid === id) {
            positionOfPassenger = index;
            break;
        }
    }

    if (positionOfPassenger === -1) {
        ctx.status = 204;
        ctx.body = "Passenger Info Not Found";
    }
    else {
        var flag: boolean = false;
        try {
            if (requestBody.name !== undefined) {
                passengerInfoList[positionOfPassenger].sname = requestBody.name;
                flag = true;
            }
            if (requestBody.trips !== undefined) {
                passengerInfoList[positionOfPassenger].strips = requestBody.trips;
                flag = true;
            }
            if (flag) {
                await updatePassengerInfoFile();
                ctx.status = 200;
                ctx.body = "Update Successfully";
            }
            else {
                ctx.status = 200;
                ctx.body = "Nothing Updated";
            }

        }
        catch {
            ctx.status = 400;
            ctx.body = "Invalid Input";
        }
    }

}



router.get("/v1/passengers", fetchpassenerInfo);
router.post("/v1/passengers", createAPassenger);
router.put("/v1/passengers/:id", updatePassengerInfo);
app.use(bodyParser());
app.use(router.routes());

app.use(async ctx => {
    ctx.status = 404;
    ctx.body = 'Page Not Found';
});

module.exports = { app };