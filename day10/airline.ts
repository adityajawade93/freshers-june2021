import Koa = require("koa");
import koaRouter = require("koa-router");
import uniqid = require("uniqid");
import fs = require("fs");
const passengers: Array<data> = require('./passengers.json');

import bodyParser = require("koa-bodyparser");

const app = new Koa();
const router = new koaRouter();

const port = 3001;

type data = {
    _id: string;
    name: string;
    trips: number;
    airline: Array<airLine> | airLine;
    __v: number;
}

type airLine = {
    id: number,
    name: string,
    country: string,
    logo: string,
    slogan: string,
    head_quaters: string,
    website: string,
    established: string
}


function goodResponse(ctx: Koa.ParameterizedContext<any, koaRouter.IRouterParamContext<any, {}>, any>, type: string, message: Record<string, any>) {
    ctx.response.status = 200;
    ctx.response.type = type;
    ctx.body = message;
}

function badResponse(ctx: Koa.ParameterizedContext<any, koaRouter.IRouterParamContext<any, {}>, any>, type: string, message: string) {
    ctx.response.status = 400;
    ctx.response.type = type;
    ctx.body = message;
}

function checkIndividual(data: airLine): boolean {
    if (data.id === undefined || data.name === undefined || data.country === undefined || data.logo === undefined
        || data.slogan === undefined || data.head_quaters === undefined || data.website === undefined
        || data.established === undefined) {
        return false;
    }
    if (typeof data.id !== 'number' || typeof data.name !== 'string' || data.name.trim() === "" || typeof data.country !== 'string'
        || typeof data.logo !== 'string' || typeof data.slogan !== 'string' || typeof data.head_quaters !== 'string'
        || typeof data.website !== 'string' || typeof data.established !== 'string') {
        return false;
    }
    return true;
}

function checkData(data: Array<airLine> | airLine): boolean {

    if (!Array.isArray(data)) {
        return checkIndividual(data);
    }
    const len = data.length;
    for (let i = 0; i < len; i++) {
        if (!checkIndividual(data[i]))
            return false;
    }
    return true;

}

function validateData1(data: Record<string, any>): boolean {
    if (data.name === undefined || data.trips === undefined || data.airline === undefined || data.__v === undefined)
        return false;
    if (typeof data.name !== 'string' || data.name.trim() === "" || typeof data.trips !== 'number' || typeof data.__v !== 'number' || !checkData(data.airline))
        return false;
    return true;

}

function validateData2(page: number, size: number): boolean {
    if (typeof page === "number" && typeof size === "number" && page >= 0) {
        return true;
    }
    return false;
}

router.get("/v1/passengers", (ctx) => {
    // list all airline data
    console.log("Got request =>", {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body,
    });
    const page = Number(ctx.request.query.page);
    const size = Number(ctx.request.query.size);
    //console.log(passengers.length);
    const totalPages: number = Math.round(passengers.length / size) + 1;
    // console.log(totalPages);
    // console.log(page);
    if (page > totalPages) {
        badResponse(ctx, "text/html", "unable to fetch, page out of range");

        return;
    }

    if (validateData2(page, size)) {
        const requiredData = passengers.slice(
            page * size,
            Math.min((page + 1) * size, passengers.length)
        );
        const data = {
            totalPassengers: passengers.length,
            totalPages: totalPages,
            data: requiredData,
        };
        goodResponse(ctx, "application/json", data);
    } else {
        badResponse(
            ctx,
            "text/html",
            "unable to fetch provide correct page and size"
        );
    }
});


router.post("/v1/passengers", (ctx) => {
    //create and add new passenger to json
    console.log("Got request =>", {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body,
    });
    const reqBody: any = ctx.request.body;
    if (validateData1(reqBody)) {

        const newData: data = reqBody;

        newData._id = uniqid();
        passengers.push(newData);

        fs.writeFile("passengers.json", JSON.stringify(passengers), "utf8", (err: any) => {
            if (err) {
                throw err;
            }
        });
        goodResponse(ctx, "application/json", { message: `Passenger with id : ${newData._id} created successfully.`, content: newData })

    }
    else {
        badResponse(ctx, "text/html", `Creation failed, Provide correct data`);
    }


});


router.put("/v1/passengers/:id", (ctx) => {
    // update passenger by id
    console.log('Got request =>', {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body,
    });

    const id: string = ctx.params.id;

    const reqBody: any = ctx.request.body;
    if (validateData1(reqBody)) {

        reqBody._id = id;
        const len: number = passengers.length;
        let update: boolean = false;
        for (let i = 0; i < len; i++) {
            if (passengers[i]._id === id) {
                passengers[i] = reqBody;
                update = true;
                break;
            }
        }

        if (update === false) {
            badResponse(ctx, "application/json", `Passenger id not found in data base`);
            return;
        } else {
            fs.writeFile('passengers.json', JSON.stringify(passengers), 'utf8', (err) => {
                if (err) {
                    throw err;
                }
            });

            goodResponse(ctx, "application/json", { message: `Passenger with id : ${reqBody._id} updated successfully.` });
        }

    }
    else {
        badResponse(ctx, "text/html", `Update failed, Provide correct data`);
    }

});
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(async (ctx) => {
    ctx.body = "Invalid URL";
});

const server = app.listen(port, () => console.log("port on ", port));

module.exports = server;
