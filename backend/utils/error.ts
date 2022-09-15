import { Request } from "express";
import { validationResult } from "express-validator";
import _ from "lodash";

export function catchError(maybeError: unknown): Error {
  if (_.isError(maybeError)) {
    return maybeError;
  }
  return new Error("Something went wrong!");
}

export function checkValidationResult(req: Request) {
  const errors = validationResult(req).array({ onlyFirstError: true });
  const error = errors.at(0);
  if (_.isObject(error)) {
    throw new Error(error.msg);
  }
}
