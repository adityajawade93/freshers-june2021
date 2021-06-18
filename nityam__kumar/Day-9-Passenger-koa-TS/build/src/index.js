"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_json_1 = __importDefault(require("koa-json"));
const routes_and_controller_1 = require("./routes_and_controller");
const app = new koa_1.default();
const router = new koa_router_1.default();
const port = 5002;
app.use(koa_bodyparser_1.default());
app.use(koa_json_1.default());
app.use(router.routes()).use(router.allowedMethods());
router.get("/v1/passengers", routes_and_controller_1.getPassengers);
app.listen(port, () => {
    console.log("server is active on port", port);
});
