import { Request, Response } from "express";
import _ from "lodash";
import Category from "../models/Category";
import { AlertStatuses, getAlert, setAlert } from "../utils/alert";
import { catchError } from "../utils/error";

export function viewDashboard(_: Request, res: Response) {
  res.render("admin/dashboard", { pageTitle: "Dashboard - Staycation" });
}

export async function viewCategories(req: Request, res: Response) {
  const categories = await Category.find();

  res.render("admin/categories", {
    categories,
    alert: getAlert(req),
    pageTitle: "Categories - Staycation",
  });
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

    setAlert(req, { message: "Category added", status: AlertStatuses.Success });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
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

  try {
    const category = await Category.findById(id);
    if (_.isNull(category)) {
      throw new Error("Category not found");
    }

    category.name = name;
    await category.save();

    setAlert(req, {
      message: "Category edited",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect("/admin/categories");
}

type DeleteCategoryParams = {
  id: string;
};

export async function deleteCategory(
  req: Request<DeleteCategoryParams>,
  res: Response
) {
  try {
    await Category.findByIdAndDelete(req.params.id);

    setAlert(req, {
      message: "Category deleted",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect("/admin/categories");
}

export function viewBanks(_: Request, res: Response) {
  res.render("admin/banks", { pageTitle: "Banks - Staycation" });
}

export function viewProperties(_: Request, res: Response) {
  res.render("admin/properties", { pageTitle: "Properties - Staycation" });
}

export function viewBookings(_: Request, res: Response) {
  res.render("admin/bookings", { pageTitle: "Bookings - Staycation" });
}
