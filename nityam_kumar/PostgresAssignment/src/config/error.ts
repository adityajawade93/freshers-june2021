import { Context } from "vm";

export const invalidData = function (ctx: Context, msg: string) {
  ctx.status = 400;
  ctx.body = {
    msg: msg,
    status: "fail",
  };
};

export const serverERROR = function (ctx: Context) {
  ctx.status = 500;
  ctx.body = {
    status: `Server Error`,
  };
};

export const NOTFOUNDERROR = function (ctx: Context, msg: string) {
  ctx.status = 404;
  ctx.body = {
    msg: msg,
    status: "fail",
  };
};

export const CONFLICTERROR = function (ctx: Context, msg: string) {
  ctx.status = 409;
  ctx.body = {
    msg: msg,
    status: "fail",
  };
};

export const UNAUTHORIZEDERROR = function (ctx: Context, msg: string) {
  ctx.status = 401;
  ctx.body = {
    msg: msg,
    status: "fail",
  };
};


