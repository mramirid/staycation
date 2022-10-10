import { StatusCodes } from "http-status-codes";

export class ResponseError extends Error {
  constructor(message: string, public status: StatusCodes) {
    super(message);
  }

  static is422(maybeError: unknown): maybeError is ResponseError {
    return (
      maybeError instanceof ResponseError &&
      maybeError.status === StatusCodes.UNPROCESSABLE_ENTITY
    );
  }
}
