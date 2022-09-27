import _ from "lodash";
import mongoose from "mongoose";

export function catchError(maybeError: unknown): Error {
  if (maybeError instanceof mongoose.Error.ValidationError) {
    const [firstError] = Object.values(maybeError.errors);
    return firstError;
  }

  if (_.isError(maybeError)) {
    return maybeError;
  }

  return new Error("Something went wrong!");
}
