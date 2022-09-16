import { body, param } from "express-validator";
import { toDecimal128, toObjectId } from "../../utils/format";

export const addCategoryValidator = body("name", "Invalid name")
  .isString()
  .trim()
  .escape()
  .notEmpty();

export const editCategoryValidator = [
  body("id", "Invalid id").isMongoId().customSanitizer(toObjectId),
  addCategoryValidator,
];

export const addBankValidator = [
  body("bankName", "Invalid bank name").isString().trim().notEmpty().escape(),
  body("accountNumber", "Invalid account number").isNumeric(),
  body("accountHolderName", "Invalid holder name")
    .isString()
    .trim()
    .escape()
    .notEmpty(),
];

export const editBankValidator = [
  body("id", "Invalid id").isMongoId().customSanitizer(toObjectId),
  ...addBankValidator,
];

export const addPropertyValidator = [
  body("title", "Invalid title").isString().trim().escape().notEmpty(),
  body("price", "Invalid price").isNumeric().customSanitizer(toDecimal128),
  body("city", "Invalid city").isString().trim().escape().notEmpty(),
  body("country", "Invalid country").isString().trim().escape().notEmpty(),
  body("categoryId", "Invalid categoryId")
    .isMongoId()
    .customSanitizer(toObjectId),
  body("description", "Invalid description").isString().trim().notEmpty(),
];

export const viewPropertyImagesValidator = param(
  "id",
  "Invalid id"
).isMongoId();

export const editPropertyValidator = [
  param("id", "Invalid id").isMongoId(),
  ...addPropertyValidator,
];

export const deleteValidator = param("id", "Invalid id").isMongoId();
