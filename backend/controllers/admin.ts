import { Request, Response } from "express";
import fs from "fs/promises";
import _ from "lodash";
import { Types } from "mongoose";
import path from "path";
import { MAX_PROPERTY_IMAGES } from "../lib/constants";
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

export async function editCategory(
  req: Request<{ id: string }, Record<string, never>, { name: string }>,
  res: Response
) {
  try {
    checkValidationResult(req);

    const category = await Category.findById(req.params.id).orFail(
      new Error("Category not found")
    );

    category.name = req.body.name;
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

    const property = await Property.findOne({ category: req.params.id });
    if (_.isObject(property)) {
      throw new Error("The category is being used by some properties");
    }

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

export async function editBank(
  req: Request<{ id: string }, Record<string, never>, AddBankReqBody>,
  res: Response
) {
  try {
    checkValidationResult(req);

    const bank = await Bank.findById(req.params.id).orFail(
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

const propertyNotFound = new Error("Property not found");

export async function viewPropertyImages(
  req: Request<{ id: string }>,
  res: Response
) {
  let property: IProperty | undefined;

  try {
    property = await Property.findById(req.params.id).orFail(propertyNotFound);
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
  price: Types.Decimal128;
  city: string;
  country: string;
  categoryId: Types.ObjectId;
  description: string;
};

const lackOfPropertyImages = new Error(
  `Please provide at least ${MAX_PROPERTY_IMAGES} images`
);

export async function addProperty(
  req: Request<unknown, unknown, AddPropertyReqBody>,
  res: Response
) {
  try {
    const images = req.files as Express.Multer.File[];
    if (images.length < MAX_PROPERTY_IMAGES) {
      throw lackOfPropertyImages;
    }

    await Property.create({
      title: req.body.title,
      price: req.body.price,
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
      Property.findById(req.params.id).orFail(propertyNotFound),
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

export async function editProperty(
  req: Request<{ id: string }, Record<string, never>, AddPropertyReqBody>,
  res: Response
) {
  try {
    checkValidationResult(req);

    const property = await Property.findById(req.params.id).orFail(
      propertyNotFound
    );

    property.title = req.body.title;
    property.price = req.body.price;
    property.city = req.body.city;
    property.country = req.body.country;
    property.category = req.body.categoryId;
    property.description = req.body.description;

    const images = req.files as Express.Multer.File[];
    if (!_.isEmpty(images)) {
      if (images.length < MAX_PROPERTY_IMAGES) {
        throw lackOfPropertyImages;
      }
      property.imageUrls = images.map((image) => `/images/${image.filename}`);
    }

    await property.save();

    setAlert(req, {
      message: "Property edited",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect("/admin/properties");
}

export async function deleteProperty(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    checkValidationResult(req);

    const property = await Property.findByIdAndDelete(req.params.id).orFail(
      new Error("Property not found")
    );

    await Promise.all(
      property.imageUrls.map((imageUrl) =>
        fs.unlink(path.join("public", imageUrl))
      )
    );

    setAlert(req, {
      message: "Property deleted",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect("/admin/properties");
}

export function viewBookings(_: Request, res: Response) {
  res.render("admin/bookings", { pageTitle: "Bookings - Staycation" });
}
