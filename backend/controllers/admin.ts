import { RequestHandler } from "express";

export const viewDashboard: RequestHandler = (_, res) => {
  res.render("admin/dashboard");
};

export const viewCategory: RequestHandler = (_, res) => {
  res.render("admin/category");
};

export const viewBank: RequestHandler = (_, res) => {
  res.render("admin/bank");
};

export const viewProperty: RequestHandler = (_, res) => {
  res.render("admin/property");
};

export const viewBooking: RequestHandler = (_, res) => {
  res.render("admin/booking");
};
