import { RequestHandler } from "express";

export const viewDashboard: RequestHandler = (_, res) => {
  res.render("admin/dashboard");
};

export const viewCategories: RequestHandler = (_, res) => {
  res.render("admin/categories");
};

export const viewBanks: RequestHandler = (_, res) => {
  res.render("admin/banks");
};

export const viewProperties: RequestHandler = (_, res) => {
  res.render("admin/properties");
};

export const viewBookings: RequestHandler = (_, res) => {
  res.render("admin/bookings");
};
