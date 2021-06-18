import { promises as fs } from "fs";

import dats from "../passenger.json";

export const getPassengers = async (ctx: any) => {
  try {
    const page = parseInt(ctx.query.page);
    const size = parseInt(ctx.query.size);

    let arrayOfObjects = dats;
    let total_no_details = arrayOfObjects["passengers_data"].length;
    const max_page_limit = Math.ceil(total_no_details / size);
    // console.log(total_no_details, max_page_limit);
    const max_size_limit = 500;

    if (
      page < 0 ||
      page > max_page_limit ||
      size < 0 ||
      size > max_size_limit
    ) {
      ctx.status = 404;
      ctx.message = "NOT FOUND!!";
      ctx.type = "text/html";
      ctx.body = {
        msg: "NOT FOUND!!",
        status: "fail",
      };
      return;
    }

    const start_index = (page - 1) * size;
    const end_index = Math.min(page * size, total_no_details);
    let datas = arrayOfObjects["passengers_data"];
    let filter_datas = datas.slice(start_index, end_index);

    ctx.status = 200;
    ctx.message = "passengers details";
    ctx.type = "text/html";
    ctx.body = {
      msg: "requested passengers details",
      status: "success",
      data: filter_datas,
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
