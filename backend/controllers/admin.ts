import { Request, RequestHandler, Response } from "express";
import Category from "../models/Category";

export const viewDashboard: RequestHandler = (_, res) => {
  res.render("admin/dashboard");
};

export const viewCategories: RequestHandler = (_, res) => {
  res.render("admin/categories");
};

type AddCategoryPayload = {
  name: string;
};

export async function addCategory(
  req: Request<unknown, unknown, AddCategoryPayload>,
  res: Response
) {
  await Category.create({ name: req.body });

  res.redirect("categories");
}

export const viewBanks: RequestHandler = (_, res) => {
  res.render("admin/banks");
};

export const viewProperties: RequestHandler = (_, res) => {
  res.render("admin/properties");
};

export const viewBookings: RequestHandler = (_, res) => {
  res.render("admin/bookings");
};
