import { RequestHandler } from "express";

export const viewDashboard: RequestHandler = (_, res) => {
  res.render("admin/dashboard");
};

export const viewCategory: RequestHandler = (_, res) => {
  res.render("admin/category");
};
