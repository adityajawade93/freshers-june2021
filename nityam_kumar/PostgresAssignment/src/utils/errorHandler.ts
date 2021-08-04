/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Context } from "vm";

export const globalErrHandler = async (ctx: Context, next: any) => {
  try {
    await next();
  } catch (err) {
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
};