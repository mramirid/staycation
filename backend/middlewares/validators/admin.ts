import { Request } from "express";
import { body, param } from "express-validator";
import _ from "lodash";
import { MAX_PROPERTY_IMAGES } from "../../lib/constants";
import { toDecimal128, toObjectId } from "../../utils/format";

export const addCategoryValidator = body("name", "Invalid name")
  .isString()
  .trim()
  .escape()
  .notEmpty();

export const paramIdValidator = param("id", "Invalid id").isMongoId();

export const editCategoryValidator = [paramIdValidator, addCategoryValidator];

const commonBankValidator = [
  body("bankName", "Invalid bank name").isString().trim().notEmpty().escape(),
  body("accountNumber", "Invalid account number").isInt({
    allow_leading_zeroes: true,
    min: 0,
  }),
  body("accountHolderName", "Invalid holder name")
    .isString()
    .trim()
    .escape()
    .notEmpty(),
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
  body("title", "Invalid title").isString().trim().escape().notEmpty(),
  body("price", "Invalid price").isDecimal().customSanitizer(toDecimal128),
  body("city", "Invalid city").isString().trim().escape().notEmpty(),
  body("country", "Invalid country").isString().trim().escape().notEmpty(),
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
