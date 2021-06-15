const fs = require("fs").promises;

const datas = require("./passenger.json");

module.exports.getTask = async (ctx) => {
  try {
    const page = parseInt(ctx.query.page);
    const size = parseInt(ctx.query.size);
    const start_index = (page - 1) * size;
    const end_index = page * size;
    let dats = datas["passengers_data"];
    let pass = dats.slice(start_index, end_index);

    ctx.status = 200;
    ctx.message = "passengers details";
    ctx.type = "text/html";
    ctx.body = {
      msg: "requested passengers details",
      status: "success",
      data: pass,
    };
  } catch (err) {
    console.log(err);
    ctx.status = 500;
    ctx.message = "failed";
    ctx.type = "text/html";
    ctx.body = {
      msg: "internal server error",
      status: "fail",
    };
  }
};
