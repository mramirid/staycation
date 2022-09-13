import _ from "lodash";

export function catchError(maybeError: unknown): Error {
  if (_.isError(maybeError)) {
    return maybeError;
  }
  return new Error("Something went wrong!");
}
