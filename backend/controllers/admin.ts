import { Request, Response } from "express";
import Category from "../models/Category";

export function viewDashboard(_: Request, res: Response) {
  res.render("admin/dashboard");
}

export async function viewCategories(_: Request, res: Response) {
  const categories = await Category.find();

  res.render("admin/categories", { categories });
}

type AddCategoryBody = {
  name: string;
};

export async function addCategory(
  req: Request<unknown, unknown, AddCategoryBody>,
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
