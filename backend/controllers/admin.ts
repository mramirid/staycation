import { Request, Response } from "express";
import fs from "fs/promises";
import _ from "lodash";
import { Types } from "mongoose";
import path from "path";
import { category404 } from "../lib/constants";
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

    const category = await Category.findById(req.params.id).orFail(category404);

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

    await Category.findByIdAndDelete(req.params.id).orFail(category404);

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

    const bankLogo = req.file as Express.Multer.File;
    await Bank.create({
      name: req.body.bankName,
      logoUrl: `/images/${bankLogo.filename}`,
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
  req: Request<{ propertyId: string }>,
  res: Response
) {
  let property: IProperty | undefined;

  try {
    checkValidationResult(req);

    property = await Property.findById(req.params.propertyId).orFail(
      propertyNotFound
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
  price: Types.Decimal128;
  city: string;
  country: string;
  categoryId: Types.ObjectId;
  description: string;
};

export async function addProperty(
  req: Request<
    Record<string, never>,
    Record<string, never>,
    AddPropertyReqBody
  >,
  res: Response
) {
  try {
    checkValidationResult(req);

    const images = req.files as Express.Multer.File[];
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
    checkValidationResult(req);

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

    await Promise.allSettled([
      ...property.imageUrls.map((imageUrl) => {
        return fs.unlink(path.join("public", imageUrl));
      }),
      ...property.features.map((feature) => {
        return fs.unlink(path.join("public", feature.iconUrl));
      }),
      ...property.activities.map((activity) => {
        return fs.unlink(path.join("public", activity.imageUrl));
      }),
    ]);

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

export async function viewPropertyAddons(
  req: Request<{ id: string }>,
  res: Response
) {
  let property: IProperty | undefined;

  try {
    checkValidationResult(req);

    property = await Property.findById(req.params.id).orFail(propertyNotFound);
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.render("admin/properties/property", {
    pageTitle: "Property Addons - Staycation",
    alert: getAlert(req),
    property,
  });
}

type AddFeatureReqBody = {
  name: string;
  quantity: number;
};

export async function addFeature(
  req: Request<
    { propertyId: string },
    Record<string, never>,
    AddFeatureReqBody
  >,
  res: Response
) {
  try {
    checkValidationResult(req);

    const property = await Property.findById(req.params.propertyId).orFail(
      propertyNotFound
    );

    const icon = req.file as Express.Multer.File;
    property.features.push({
      name: req.body.name,
      quantity: req.body.quantity,
      iconUrl: `/images/${icon.filename}`,
    });

    await property.save();

    setAlert(req, { message: "Feature added", status: AlertStatuses.Success });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

type EditFeatureParams = {
  propertyId: string;
  featureId: string;
};

const featureNotFound = new Error("Feature not found");

export async function editFeature(
  req: Request<EditFeatureParams, Record<string, never>, AddFeatureReqBody>,
  res: Response
) {
  try {
    checkValidationResult(req);

    const property = await Property.findById(req.params.propertyId).orFail(
      propertyNotFound
    );

    const feature = property.features.id(req.params.featureId);
    if (_.isNull(feature)) {
      throw featureNotFound;
    }

    feature.name = req.body.name;
    feature.quantity = req.body.quantity;
    if (_.isObject(req.file)) {
      await fs.unlink(path.join("public", feature.iconUrl));
      feature.iconUrl = `/images/${req.file.filename}`;
    }

    await property.save();

    setAlert(req, {
      message: "Feature edited",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

export async function deleteFeature(
  req: Request<EditFeatureParams>,
  res: Response
) {
  try {
    checkValidationResult(req);

    const property = await Property.findById(req.params.propertyId).orFail(
      propertyNotFound
    );

    const feature = property.features.id(req.params.featureId);
    if (_.isNull(feature)) {
      throw featureNotFound;
    }

    property.features.pull(feature);
    await Promise.all([
      fs.unlink(path.join("public", feature.iconUrl)),
      property.save(),
    ]);

    setAlert(req, {
      message: "Feature deleted",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

type AddActivityReqBody = {
  name: string;
  type: string;
};

export async function addActivity(
  req: Request<
    { propertyId: string },
    Record<string, never>,
    AddActivityReqBody
  >,
  res: Response
) {
  try {
    checkValidationResult(req);

    const property = await Property.findById(req.params.propertyId).orFail(
      propertyNotFound
    );

    const image = req.file as Express.Multer.File;
    property.activities.push({
      name: req.body.name,
      type: req.body.type,
      imageUrl: `/images/${image.filename}`,
    });

    await property.save();

    setAlert(req, { message: "Activity added", status: AlertStatuses.Success });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

type EditActivityParams = {
  propertyId: string;
  activityId: string;
};

const activityNotFound = new Error("Activity not found");

export async function editActivity(
  req: Request<EditActivityParams, Record<string, never>, AddActivityReqBody>,
  res: Response
) {
  try {
    checkValidationResult(req);

    const property = await Property.findById(req.params.propertyId).orFail(
      propertyNotFound
    );

    const activity = property.activities.id(req.params.activityId);
    if (_.isNull(activity)) {
      throw activityNotFound;
    }

    activity.name = req.body.name;
    activity.type = req.body.type;
    if (_.isObject(req.file)) {
      await fs.unlink(path.join("public", activity.imageUrl));
      activity.imageUrl = `/images/${req.file.filename}`;
    }

    await property.save();

    setAlert(req, {
      message: "Activity edited",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

export async function deleteActivity(
  req: Request<EditActivityParams>,
  res: Response
) {
  try {
    checkValidationResult(req);

    const property = await Property.findById(req.params.propertyId).orFail(
      propertyNotFound
    );

    const activity = property.activities.id(req.params.activityId);
    if (_.isNull(activity)) {
      throw activityNotFound;
    }

    property.activities.pull(activity);
    await Promise.all([
      fs.unlink(path.join("public", activity.imageUrl)),
      property.save(),
    ]);

    setAlert(req, {
      message: "Activity deleted",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(req, { message: error.message, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

export function viewBookings(_: Request, res: Response) {
  res.render("admin/bookings", { pageTitle: "Bookings - Staycation" });
}
