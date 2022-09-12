import { Request, Response } from "express";
import _ from "lodash";
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
  try {
    await Category.create({ name: req.body.name });
  } catch (_) {
    // TODO: Display flash message
  }

  res.redirect("/admin/categories");
}

type EditCategoryBody = {
  id: string;
  name: string;
};

export async function editCategory(
  req: Request<unknown, unknown, EditCategoryBody>,
  res: Response
) {
  const { id, name } = req.body;

  const category = await Category.findById(id);
  if (_.isNull(category)) {
    res.redirect("/admin/categories");
    return;
  }

  category.name = name;
  await category.save();

  res.redirect("/admin/categories");
}

type DeleteCategoryParams = {
  id: string;
};

export async function deleteCategory(
  req: Request<DeleteCategoryParams>,
  res: Response
) {
  await Category.findByIdAndDelete(req.params.id);

  res.redirect("/admin/categories");
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
