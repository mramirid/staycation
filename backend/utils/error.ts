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

export function toError(maybeError: unknown): Error {
  if (_.isError(maybeError)) return maybeError;

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}
