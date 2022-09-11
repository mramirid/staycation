import { RequestHandler } from "express";

export const getIndex: RequestHandler = (_, res) => {
  res.render("admin/dashboard");
};
