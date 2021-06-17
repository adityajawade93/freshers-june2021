"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const koa_1 = __importDefault(require("koa"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_json_1 = __importDefault(require("koa-json"));
// const router = new KoaRouter<DefaultState, Context>();
const port = 5001;
const routes_and_controller_1 = require("./routes_and_controller");
const app = new koa_1.default();
const router = new koa_router_1.default();
app.use(koa_bodyparser_1.default());
app.use(koa_json_1.default());
app.use(router.routes()).use(router.allowedMethods());
router.get("/todo", routes_and_controller_1.getTask);
router.get("/todo/:id", routes_and_controller_1.getTaskById);
router.post("/todo", routes_and_controller_1.createTask);
router.put("/todo/:id", routes_and_controller_1.updateTask);
router.delete("/todo/:id", routes_and_controller_1.deleteTask);
app.listen(port, () => {
    console.log("server is active on port", port);
});
