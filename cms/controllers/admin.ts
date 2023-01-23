import type { NextFunction, Request, Response } from "express";
import fs from "fs/promises";
import createHttpError from "http-errors";
import _ from "lodash";
import mongoose, { MergeType, Types } from "mongoose";
import path from "path";
import * as auth from "../middlewares/admin.auth";
import Bank, { BankDoc } from "../models/Bank";
import Booking, { BookingDoc } from "../models/Booking";
import Category, { CategoryDoc, ICategory } from "../models/Category";
import Property, { PropertyDoc } from "../models/Property";
import User, { IUser, UserDoc } from "../models/User";
import { AlertStatuses, getAlert, setAlert } from "../utils/alert";
import { category404Error, property404Error } from "../utils/constant";
import { getErrorMessage } from "../utils/error";

export function viewSignup(req: Request, res: Response) {
  const alert =
    getAlert(req) ??
    getAlert(req, { messageType: "error", status: AlertStatuses.Error });

  res.render("admin/signup", {
    pageTitle: "Sign Up Admin",
    csrfToken: req.csrfToken(),
    alert,
  });
}

type SignupReqBody = MergeType<IUser, { "password-confirmation": string }>;

export async function signup(
  req: Request<unknown, unknown, SignupReqBody>,
  res: Response,
  next: NextFunction
) {
  let user: UserDoc;

  try {
    if (req.body.password !== req.body["password-confirmation"]) {
      throw new Error(
        "The password confirmation does not match with the password you entered"
      );
    }

    user = await User.create({
      username: req.body.username,
      password: req.body.password,
    });
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
    res.redirect("/admin/signup");
    return;
  }

  req.login(user, (error) => {
    if (error) {
      next(error);
      return;
    }

    res.redirect("/admin/dashboard");
  });
}

export function viewLogin(req: Request, res: Response) {
  const alert =
    getAlert(req) ??
    getAlert(req, { messageType: "error", status: AlertStatuses.Error });

  res.render("admin/login", {
    pageTitle: "Login Admin",
    csrfToken: req.csrfToken(),
    alert,
  });
}

export async function login(
  req: Request<unknown, unknown, IUser>,
  res: Response
) {
  try {
    auth.passport.authenticate("local", {
      successRedirect: "/admin/dashboard",
      failureRedirect: "/admin/login",
      failureFlash: true,
    })(req, res);
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
    res.redirect("/admin/login");
  }
}

export function logout(req: Request, res: Response, next: NextFunction) {
  req.logout((error) => {
    if (error) {
      next(error);
      return;
    }

    res.redirect("/admin/login");
  });
}

export async function viewDashboard(req: Request, res: Response) {
  let numMembers = 0;
  let numBookings = 0;
  let numProperties = 0;

  try {
    [numMembers, numBookings, numProperties] = await Promise.all([
      Booking.find().distinct<string>("member.email").countDocuments(),
      Booking.find().countDocuments(),
      Property.find().countDocuments(),
    ]);
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.render("admin/dashboard", {
    pageTitle: "Dashboard",
    alert: getAlert(req),
    csrfToken: req.csrfToken(),
    user: req.user,
    numMembers,
    numBookings,
    numProperties,
  });
}

export async function viewCategories(req: Request, res: Response) {
  let categories: CategoryDoc[] = [];

  try {
    categories = await Category.find();
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.render("admin/categories", {
    pageTitle: "Categories",
    alert: getAlert(req),
    csrfToken: req.csrfToken(),
    user: req.user,
    categories,
  });
}

export async function addCategory(
  req: Request<unknown, unknown, ICategory>,
  res: Response
) {
  try {
    await Category.create(req.body);

    setAlert(req, { message: "Category added", status: AlertStatuses.Success });
  } catch (maybeError) {
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect("/admin/categories");
}

export async function editCategory(
  req: Request<{ id: string }, unknown, { name: string }>,
  res: Response
) {
  try {
    const category = await Category.findById(req.params.id).orFail(
      category404Error
    );

    category.name = req.body.name;
    await category.save();

    setAlert(req, {
      message: "Category edited",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect("/admin/categories");
}

export async function deleteCategory(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    await Category.findByIdAndDelete(req.params.id).orFail(category404Error);

    setAlert(req, {
      message: "Category deleted",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.redirect("/admin/categories");
}

export async function viewBanks(req: Request, res: Response) {
  let banks: BankDoc[] = [];

  try {
    banks = await Bank.find();
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.render("admin/banks", {
    pageTitle: "Banks",
    alert: getAlert(req),
    csrfToken: req.csrfToken(),
    user: req.user,
    banks,
  });
}

type AddBankReqBody = {
  bankName: string;
  accountNumbers: string;
  accountHolderName: string;
};

export async function addBank(
  req: Request<unknown, unknown, AddBankReqBody>,
  res: Response
) {
  try {
    await Bank.create({
      name: req.body.bankName,
      logoUrl: _.isObject(req.file)
        ? `/images/${req.file.filename}`
        : undefined,
      accountNumbers: req.body.accountNumbers,
      accountHolderName: req.body.accountHolderName,
    });

    setAlert(req, { message: "Bank added", status: AlertStatuses.Success });
  } catch (maybeError) {
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect("/admin/banks");
}

const bank404Error = new createHttpError.NotFound("Bank not found");

export async function editBank(
  req: Request<{ id: string }, unknown, AddBankReqBody>,
  res: Response
) {
  try {
    const bank = await Bank.findById(req.params.id).orFail(bank404Error);

    bank.name = req.body.bankName;
    bank.accountNumbers = req.body.accountNumbers;
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
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect("/admin/banks");
}

export async function deleteBank(req: Request<{ id: string }>, res: Response) {
  try {
    const bank = await Bank.findByIdAndDelete(req.params.id).orFail(
      bank404Error
    );

    await fs.unlink(path.join("public", bank.logoUrl));

    setAlert(req, {
      message: "Bank deleted",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.redirect("/admin/banks");
}

export async function viewProperties(req: Request, res: Response) {
  let properties: PropertyDoc[] = [];
  let categories: CategoryDoc[] = [];

  try {
    [properties, categories] = await Promise.all([
      Property.find(),
      Category.find(),
    ]);
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.render("admin/properties", {
    pageTitle: "Properties",
    alert: getAlert(req),
    csrfToken: req.csrfToken(),
    user: req.user,
    properties,
    categories,
  });
}

export async function viewPropertyImages(
  req: Request<{ id: string }>,
  res: Response
) {
  let property: PropertyDoc | undefined;

  try {
    property = await Property.findById(req.params.id).orFail(property404Error);
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.render("admin/properties/property/images", {
    pageTitle: "Property Images",
    alert: getAlert(req),
    csrfToken: req.csrfToken(),
    user: req.user,
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
  req: Request<unknown, unknown, AddPropertyReqBody>,
  res: Response
) {
  try {
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
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect("/admin/properties");
}

export async function viewEditProperty(
  req: Request<{ id: string }>,
  res: Response
) {
  let property: PropertyDoc | undefined;
  let categories: CategoryDoc[] = [];

  try {
    [property, categories] = await Promise.all([
      Property.findById(req.params.id).orFail(property404Error),
      Category.find(),
    ]);
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.render("admin/properties/property/edit", {
    pageTitle: "Edit Property",
    alert: getAlert(req),
    csrfToken: req.csrfToken(),
    user: req.user,
    property,
    categories,
  });
}

export async function editProperty(
  req: Request<{ id: string }, unknown, AddPropertyReqBody>,
  res: Response
) {
  try {
    const property = await Property.findById(req.params.id).orFail(
      property404Error
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
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect("/admin/properties");
}

export async function deleteProperty(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const property = await Property.findByIdAndDelete(req.params.id).orFail(
      property404Error
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
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.redirect("/admin/properties");
}

export async function viewPropertyAddons(
  req: Request<{ id: string }>,
  res: Response
) {
  let property: PropertyDoc | undefined;

  try {
    property = await Property.findById(req.params.id).orFail(property404Error);
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.render("admin/properties/property", {
    pageTitle: "Property Addons",
    alert: getAlert(req),
    csrfToken: req.csrfToken(),
    user: req.user,
    property,
  });
}

type AddFeatureReqBody = {
  name: string;
  quantity: number;
};

export async function addFeature(
  req: Request<{ id: string }, unknown, AddFeatureReqBody>,
  res: Response
) {
  try {
    const property = await Property.findById(req.params.id).orFail(
      property404Error
    );

    property.features.push({
      name: req.body.name,
      quantity: req.body.quantity,
      iconUrl: _.isObject(req.file)
        ? `/images/${req.file.filename}`
        : undefined,
    });
    await property.save();

    setAlert(req, { message: "Feature added", status: AlertStatuses.Success });
  } catch (maybeError) {
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.id}/addons`);
}

type EditFeatureParams = {
  propertyId: string;
  featureId: string;
};

const feature404Error = new createHttpError.NotFound("Feature not found");

export async function editFeature(
  req: Request<EditFeatureParams, unknown, AddFeatureReqBody>,
  res: Response
) {
  try {
    const property = await Property.findById(req.params.propertyId).orFail(
      property404Error
    );

    const feature = property.features.id(req.params.featureId);
    if (_.isNull(feature)) {
      throw feature404Error;
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
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

export async function deleteFeature(
  req: Request<EditFeatureParams>,
  res: Response
) {
  try {
    const property = await Property.findById(req.params.propertyId).orFail(
      property404Error
    );

    const feature = property.features.id(req.params.featureId);
    if (_.isNull(feature)) {
      throw feature404Error;
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
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

type AddActivityReqBody = {
  name: string;
  type: string;
};

export async function addActivity(
  req: Request<{ id: string }, unknown, AddActivityReqBody>,
  res: Response
) {
  try {
    const property = await Property.findById(req.params.id).orFail(
      property404Error
    );

    property.activities.push({
      name: req.body.name,
      type: req.body.type,
      imageUrl: _.isObject(req.file)
        ? `/images/${req.file.filename}`
        : undefined,
    });
    await property.save();

    setAlert(req, { message: "Activity added", status: AlertStatuses.Success });
  } catch (maybeError) {
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.id}/addons`);
}

type EditActivityParams = {
  propertyId: string;
  activityId: string;
};

const activity404Error = new createHttpError.NotFound("Activity not found");

export async function editActivity(
  req: Request<EditActivityParams, unknown, AddActivityReqBody>,
  res: Response
) {
  try {
    const property = await Property.findById(req.params.propertyId).orFail(
      property404Error
    );

    const activity = property.activities.id(req.params.activityId);
    if (_.isNull(activity)) {
      throw activity404Error;
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
    let errorMessage = getErrorMessage(maybeError);
    if (maybeError instanceof mongoose.Error.ValidationError) {
      errorMessage = getValidationErrorMessage(maybeError);
    }
    setAlert(req, { message: errorMessage, status: AlertStatuses.Error });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

function getValidationErrorMessage(error: mongoose.Error.ValidationError) {
  const errors = Object.values(error.errors);
  const messages = errors.map(getErrorMessage);

  const formatter = new Intl.ListFormat("en-US", {
    style: "long",
    type: "conjunction",
  });

  return formatter.format(messages);
}

export async function deleteActivity(
  req: Request<EditActivityParams>,
  res: Response
) {
  try {
    const property = await Property.findById(req.params.propertyId).orFail(
      property404Error
    );

    const activity = property.activities.id(req.params.activityId);
    if (_.isNull(activity)) {
      throw activity404Error;
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
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.redirect(`/admin/properties/${req.params.propertyId}/addons`);
}

type BookingPopulationPaths = {
  property: MergeType<BookingDoc["property"], { current: PropertyDoc }>;
};

type PopulatedBookingDoc = MergeType<BookingDoc, BookingPopulationPaths>;

export async function viewBookings(req: Request, res: Response) {
  let bookings: PopulatedBookingDoc[] = [];

  try {
    bookings = await Booking.find().populate<BookingPopulationPaths>([
      "property.current",
    ]);
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.render("admin/bookings", {
    pageTitle: "Bookings",
    alert: getAlert(req),
    csrfToken: req.csrfToken(),
    user: req.user,
    bookings,
  });
}

const booking404Error = new createHttpError.NotFound("Booking not found");

export async function viewBooking(req: Request<{ id: string }>, res: Response) {
  let booking: PopulatedBookingDoc | undefined;

  try {
    booking = await Booking.findById(req.params.id)
      .populate<BookingPopulationPaths>(["property.current"])
      .orFail(booking404Error);
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.render("admin/bookings/booking", {
    pageTitle: "Booking Details",
    alert: getAlert(req),
    csrfToken: req.csrfToken(),
    user: req.user,
    booking,
  });
}

export async function acceptPayment(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const booking = await Booking.findById(req.params.id).orFail(
      booking404Error
    );
    booking.payment.status = "Accepted";
    await booking.save();

    setAlert(req, {
      message: "Payment accepted",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.redirect(`/admin/bookings/${req.params.id}`);
}

export async function rejectPayment(
  req: Request<{ id: string }>,
  res: Response
) {
  try {
    const booking = await Booking.findById(req.params.id).orFail(
      booking404Error
    );
    booking.payment.status = "Rejected";
    await booking.save();

    setAlert(req, {
      message: "Payment rejected",
      status: AlertStatuses.Success,
    });
  } catch (maybeError) {
    setAlert(req, {
      message: getErrorMessage(maybeError),
      status: AlertStatuses.Error,
    });
  }

  res.redirect(`/admin/bookings/${req.params.id}`);
}
