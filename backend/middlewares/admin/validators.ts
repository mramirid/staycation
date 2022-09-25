import { Request } from "express";
import { body, param } from "express-validator";
import _ from "lodash";
import { MAX_PROPERTY_IMAGES } from "../../lib/constants";
import { toDecimal128, toObjectId } from "../../utils/format";

export const loginValidator = [
  body("username", "Invalid username").isString().trim().notEmpty(),
  body("password", "Invalid password").isString().trim().notEmpty(),
];

export const addCategoryValidator = body("name", "Invalid name")
  .isString()
  .trim()
  .notEmpty();

export const paramIdValidator = param("id", "Invalid id").isMongoId();

export const editCategoryValidator = [paramIdValidator, addCategoryValidator];

const commonBankValidator = [
  body("bankName", "Invalid bank name").isString().trim().notEmpty(),
  body("accountNumber", "Invalid account number")
    .isInt({ allow_leading_zeroes: true, min: 0 })
    .withMessage("Account number cannot be negative"),
  body("accountHolderName", "Invalid holder name").isString().trim().notEmpty(),
];

export const addBankValidator = [
  ...commonBankValidator,
  body("bankLogo").custom((__, meta) => {
    if (_.isUndefined((meta.req as Request).file)) {
      throw new Error("Please provide a logo for the bank");
    }
    return true;
  }),
];

export const editBankValidator = [paramIdValidator, ...commonBankValidator];

const commonPropertyValidator = [
  body("title", "Invalid title").isString().trim().notEmpty(),
  body("price", "Invalid price").isDecimal().customSanitizer(toDecimal128),
  body("city", "Invalid city").isString().trim().notEmpty(),
  body("country", "Invalid country").isString().trim().notEmpty(),
  body("categoryId", "Invalid categoryId")
    .isMongoId()
    .customSanitizer(toObjectId),
  body("description", "Invalid description").isString().trim().notEmpty(),
];

const lackOfPropertyImages = new Error(
  `Please provide at least ${MAX_PROPERTY_IMAGES} images`
);

export const addPropertyValidator = [
  ...commonPropertyValidator,
  body("images").custom((__, meta) => {
    const images: Express.Multer.File[] = meta.req.files;
    if (images.length < MAX_PROPERTY_IMAGES) {
      throw lackOfPropertyImages;
    }
    return true;
  }),
];

export const editPropertyValidator = [
  paramIdValidator,
  ...commonPropertyValidator,
  body("images").custom((__, meta) => {
    const images: Express.Multer.File[] = meta.req.files;
    if (!_.isEmpty(images) && images.length < MAX_PROPERTY_IMAGES) {
      throw lackOfPropertyImages;
    }
    return true;
  }),
];

const paramPropertyIdValidator = param(
  "propertyId",
  "Invalid property id"
).isMongoId();

const commonFeatureValidator = [
  body("name", "Invalid name").isString().trim().notEmpty(),
  body("quantity", "Invalid quantity")
    .isInt({ min: 0 })
    .withMessage("Quantity cannot be negative"),
];

export const addFeatureValidator = [
  paramIdValidator,
  ...commonFeatureValidator,
  body("icon").custom((__, meta) => {
    if (_.isUndefined((meta.req as Request).file)) {
      throw new Error("Please provide an icon for the feature");
    }
    return true;
  }),
];

const paramFeatureIdValidator = param(
  "featureId",
  "Invalid feature id"
).isMongoId();

export const editFeatureValidator = [
  paramPropertyIdValidator,
  paramFeatureIdValidator,
  ...commonFeatureValidator,
];

export const deleteFeatureValidator = [
  paramPropertyIdValidator,
  paramFeatureIdValidator,
];

const commonActivityValidator = [
  body("name", "Invalid name").isString().trim().notEmpty(),
  body("type", "Invalid type").isString().trim().notEmpty(),
];

export const addActivityValidator = [
  paramIdValidator,
  ...commonActivityValidator,
  body("image").custom((__, meta) => {
    if (_.isUndefined((meta.req as Request).file)) {
      throw new Error("Please provide an image for the activity");
    }
    return true;
  }),
];

const paramActivityIdValidator = param(
  "activityId",
  "Invalid activity id"
).isMongoId();

export const editActivityValidator = [
  paramPropertyIdValidator,
  paramActivityIdValidator,
  ...commonActivityValidator,
];

export const deleteActivityValidator = [
  paramPropertyIdValidator,
  paramActivityIdValidator,
];
