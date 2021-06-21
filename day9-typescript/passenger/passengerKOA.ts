import Koa from "koa";
import koaRouter from "koa-router";
const passengers = require("./passengers.json")
import bodyParser from "koa-bodyparser";

const app = new Koa();
const router = new koaRouter();

const port: number = 3001;

function goodResponse(ctx: any, type: string, message: any) {
    ctx.response.status = 200;
    ctx.response.type = type;
    ctx.body = message;
}

function badResponse(ctx: any, type: string, message: any) {
    ctx.response.status = 400;
    ctx.response.type = type;
    ctx.body = message;
}

function validateData(page: number, size: number): boolean {
    if (typeof page === "number" && typeof size === "number" && page >= 0) {
        return true;
    }
    return false;
}

router.get("/v1/passengers", (ctx: any) => {
    // list
    console.log("Got request =>", {
        method: ctx.request.method,
        path: ctx.request.url,
        body: ctx.request.body,
    });
    const page: number = parseInt(ctx.request.query.page);
    const size: number = parseInt(ctx.request.query.size);
    //console.log(passengers.length);
    const totalPages: number = Math.round(passengers.length / size) + 1;
    //console.log(totalPages);
    //console.log(page);
    if (page < totalPages) {
        badResponse(ctx, "text/html", "unable to fetch, page out of range");
    }

    if (validateData(page, size)) {
        const requiredData: JSON = passengers.slice( page * size, Math.min((page + 1) * size, passengers.length));
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

app.use(bodyParser());
app.use(router.routes());
app.use(async (ctx: any) => {
    ctx.body = "Invalid URL";
});

const server = app.listen(port,()=> console.log("port on ", port));

module.exports = server;
