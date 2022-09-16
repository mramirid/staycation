import { Request, Response } from "express";
import fs from "fs/promises";
import _ from "lodash";
import { Types } from "mongoose";
import path from "path";
import Bank, { IBank } from "../models/Bank";
import Category, { ICategory } from "../models/Category";
import Property, { IProperty } from "../models/Property";
import { AlertStatuses, getAlert, setAlert } from "../utils/alert";
import { catchError, checkValidationResult } from "../utils/error";

export function viewDashboard(_: Request, res: Response) {
  res.render("admin/dashboard", { pageTitle: "Dashboard - Staycation" });
}

export async function viewCategories(req: Request, res: Response) {
  let categories: ICategory[] = [];

  try {
    categories = await Category.find();
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.render("admin/categories", {
    pageTitle: "Categories - Staycation",
    alert: getAlert(req),
    categories,
  });
}

export async function addCategory(
  req: Request<Record<string, never>, Record<string, never>, ICategory>,
  res: Response
) {
  try {
    checkValidationResult(req);

    await Category.create(req.body);

    setAlert(req, { message: "Category added", status: AlertStatuses.Success });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect("/admin/categories");
}

type EditCategoryReqBody = {
  id: Types.ObjectId;
  name: string;
};

export async function editCategory(
  req: Request<
    Record<string, never>,
    Record<string, never>,
    EditCategoryReqBody
  >,
  res: Response
) {
  const { id, name } = req.body;

  try {
    checkValidationResult(req);

    const category = await Category.findById(id).orFail(
      new Error("Category not found")
    );

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

export async function deleteCategory(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    checkValidationResult(req);

    await Category.findByIdAndDelete(req.params.id).orFail(
      new Error("Category not found")
    );

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
  let banks: IBank[] = [];

  try {
    banks = await Bank.find();
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

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
  req: Request<Record<string, never>, Record<string, never>, AddBankReqBody>,
  res: Response
) {
  try {
    checkValidationResult(req);

    await Bank.create({
      name: req.body.bankName,
      logoUrl: `/images/${req.file?.filename}`,
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

type EditBankReqBody = { id: Types.ObjectId } & AddBankReqBody;

export async function editBank(
  req: Request<Record<string, never>, Record<string, never>, EditBankReqBody>,
  res: Response
) {
  try {
    checkValidationResult(req);

    const bank = await Bank.findById(req.body.id).orFail(
      new Error("Bank not found")
    );

    bank.name = req.body.bankName;
    bank.accountNumber = req.body.accountNumber;
    bank.accountHolderName = req.body.accountHolderName;
    if (_.isObject(req.file)) {
      await fs.unlink(path.join("public", bank.logoUrl));
      bank.logoUrl = `/images/${req.file.filename}`;
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

export async function deleteBank(req: Request<{ id: string }>, res: Response) {
  try {
    checkValidationResult(req);

    const bank = await Bank.findByIdAndDelete(req.params.id).orFail(
      new Error("Bank not found")
    );

    await fs.unlink(path.join("public", bank.logoUrl));

    setAlert(req, {
      message: "Bank deleted",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect("/admin/banks");
}

export async function viewProperties(req: Request, res: Response) {
  let properties: IProperty[] = [];
  let categories: ICategory[] = [];

  try {
    [properties, categories] = await Promise.all([
      Property.find(),
      Category.find(),
    ]);
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.render("admin/properties", {
    pageTitle: "Properties - Staycation",
    alert: getAlert(req),
    properties,
    categories,
  });
}

export async function viewPropertyImages(
  req: Request<{ id: string }>,
  res: Response
) {
  let property: IProperty | undefined;

  try {
    property = await Property.findById(req.params.id).orFail(
      new Error("Property not found")
    );
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.render("admin/properties/property/images", {
    pageTitle: "Property Images - Staycation",
    alert: getAlert(req),
    property,
  });
}

type AddPropertyReqBody = {
  title: string;
  price: number;
  city: string;
  country: string;
  categoryId: Types.ObjectId;
  description: string;
};

export async function addProperty(
  req: Request<unknown, unknown, AddPropertyReqBody>,
  res: Response
) {
  let images = req.files;

  try {
    if (_.isUndefined(images) || images.length < 3) {
      throw new Error("Please provide at least 3 images");
    }
    if (!_.isArray(images)) {
      images = Object.values(images).flat();
    }

    await Property.create({
      title: req.body.title,
      price: new Types.Decimal128(req.body.price.toString()),
      city: req.body.city,
      country: req.body.country,
      description: req.body.description,
      category: req.body.categoryId,
      imageUrls: images.map((image) => `/images/${image.filename}`),
    });

    setAlert(req, { message: "Property added", status: AlertStatuses.Success });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect("/admin/properties");
}

export async function viewEditProperty(
  req: Request<{ id: string }>,
  res: Response
) {
  let property: IProperty | undefined;
  let categories: ICategory[] = [];

  try {
    [property, categories] = await Promise.all([
      Property.findById(req.params.id).orFail(new Error("Property not found")),
      Category.find(),
    ]);
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.render("admin/properties/property/edit", {
    pageTitle: "Edit Property - Staycation",
    alert: getAlert(req),
    property,
    categories,
  });
}

// type EditPropertyReqBody = { id: Types.ObjectId } & AddPropertyReqBody;

export function viewBookings(_: Request, res: Response) {
  res.render("admin/bookings", { pageTitle: "Bookings - Staycation" });
}
