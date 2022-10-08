import { isError } from "lodash-es";

export function getErrorMessage(maybeError: unknown) {
  return toError(maybeError).message;
}

function toError(maybeError: unknown): Error {
  if (isError(maybeError)) {
    return maybeError;
  }

  try {
    return new Error(JSON.stringify(maybeError));
  } catch {
    // fallback in case there's an error stringifying the maybeError
    // like with circular references for example.
    return new Error(String(maybeError));
  }
}
