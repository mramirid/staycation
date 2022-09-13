import { Request, Response } from "express";
import fs from "fs/promises";
import _ from "lodash";
import path from "path";
import Bank from "../models/Bank";
import Category from "../models/Category";
import { AlertStatuses, getAlert, setAlert } from "../utils/alert";
import { catchError } from "../utils/error";

export function viewDashboard(_: Request, res: Response) {
  res.render("admin/dashboard", { pageTitle: "Dashboard - Staycation" });
}

export async function viewCategories(req: Request, res: Response) {
  const categories = await Category.find();

  res.render("admin/categories", {
    pageTitle: "Categories - Staycation",
    alert: getAlert(req),
    categories,
  });
}

type AddCategoryReqBody = {
  name: string;
};

export async function addCategory(
  req: Request<unknown, unknown, AddCategoryReqBody>,
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

type EditCategoryReqBody = {
  id: string;
  name: string;
};

export async function editCategory(
  req: Request<unknown, unknown, EditCategoryReqBody>,
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

export async function viewBanks(req: Request, res: Response) {
  const banks = await Bank.find();

  res.render("admin/banks", {
    pageTitle: "Banks - Staycation",
    alert: getAlert(req),
    banks,
  });
}

type AddBankReqBody = {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
};

export async function addBank(
  req: Request<unknown, unknown, AddBankReqBody>,
  res: Response
) {
  try {
    await Bank.create({
      name: req.body.bankName,
      logoUrl: `images/${req.file?.filename}`,
      accountNumber: req.body.accountNumber,
      accountHolderName: req.body.accountHolderName,
    });

    setAlert(req, { message: "Bank added", status: AlertStatuses.Success });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect("/admin/banks");
}

type EditBankReqBody = { id: string } & AddBankReqBody;

export async function editBank(
  req: Request<unknown, unknown, EditBankReqBody>,
  res: Response
) {
  try {
    const bank = await Bank.findById(req.body.id);
    if (_.isNull(bank)) {
      throw new Error("Bank not found");
    }

    bank.name = req.body.bankName;
    bank.accountNumber = req.body.accountNumber;
    bank.accountHolderName = req.body.accountHolderName;
    if (_.isObject(req.file)) {
      await fs.unlink(path.join("public", bank.logoUrl));
      bank.logoUrl = `images/${req.file.filename}`;
    }
    await bank.save();

    setAlert(req, {
      message: "Bank edited",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect("/admin/banks");
}

export function viewProperties(_: Request, res: Response) {
  res.render("admin/properties", { pageTitle: "Properties - Staycation" });
}

export function viewBookings(_: Request, res: Response) {
  res.render("admin/bookings", { pageTitle: "Bookings - Staycation" });
}
