import { Request, Response } from "express";
import Category from "../models/Category";

export function viewDashboard(_: Request, res: Response) {
  res.render("admin/dashboard");
}

export function viewCategories(_: Request, res: Response) {
  res.render("admin/categories");
}

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

export function viewBanks(_: Request, res: Response) {
  res.render("admin/banks");
}

export function viewProperties(_: Request, res: Response) {
  res.render("admin/properties");
}

export function viewBookings(_: Request, res: Response) {
  res.render("admin/bookings");
}
