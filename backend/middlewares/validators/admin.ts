import { body, param, ValidationChain } from "express-validator";
import { toObjectId } from "../../utils/format";

export const addCategoryValidator: ValidationChain = body(
  "name",
  "Invalid name"
)
  .isString()
  .trim()
  .notEmpty()
  .escape();

export const editCategoryValidator: ValidationChain[] = [
  body("id", "Invalid id").isMongoId().customSanitizer(toObjectId),
  body("name", "Invalid name").isString().trim().notEmpty().escape(),
];

export const deleteCategoryValidator: ValidationChain = param(
  "id",
  "Invalid id"
).isMongoId();

export const addBankValidator: ValidationChain[] = [
  body("bankName", "Invalid bank name").isString().trim().notEmpty().escape(),
  body("accountNumber", "Invalid account number")
    .escape()
    .trim()
    .isNumeric()
    .notEmpty(),
  body("accountHolderName", "Invalid holder name")
    .isString()
    .trim()
    .notEmpty()
    .escape(),
];

export const editBankValidator: ValidationChain[] = [
  body("id", "Invalid id").isMongoId().customSanitizer(toObjectId),
  body("bankName", "Invalid bank name").isString().trim().notEmpty().escape(),
  body("accountNumber", "Invalid Account Number")
    .escape()
    .trim()
    .isNumeric()
    .notEmpty(),
  body("accountHolderName", "Invalid holder name")
    .isString()
    .trim()
    .notEmpty()
    .escape(),
];

export const deleteBankValidator: ValidationChain = param(
  "id",
  "Invalid id"
).isMongoId();

export const addPropertyValidator: ValidationChain[] = [
  body("title", "Invalid title").isString().trim().notEmpty().escape(),
  body("price", "Invalid price").escape().trim().isNumeric().notEmpty(),
  body("city", "Invalid city").isString().trim().notEmpty().escape(),
  body("country", "Invalid country").isString().trim().notEmpty().escape(),
  body("categoryId", "Invalid categoryId")
    .isMongoId()
    .customSanitizer(toObjectId),
  body("description", "Invalid description").isString().trim().notEmpty(),
];

export const viewPropertyValidator: ValidationChain = param(
  "id",
  "Invalid id"
).isMongoId();
