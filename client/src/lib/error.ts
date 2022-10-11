import { type ErrorWithMessage } from "@/utils/error";
import { StatusCodes } from "http-status-codes";

export class ResponseError extends Error {
  constructor(message: string, public status: StatusCodes) {
    super(message);
  }
}

export class ResponseValidationError extends ResponseError {
  public errors: ValidationErrorData["errors"];

  constructor(data: ValidationErrorData) {
    super(data.message, StatusCodes.UNPROCESSABLE_ENTITY);
    this.errors = data.errors;
  }
}

export type ValidationErrorData = {
  message: string;
  errors: Partial<{
    "payment.accountHolderName": ErrorWithMessage;
    "payment.originBankName": ErrorWithMessage;
    "payment.imageProofUrl": ErrorWithMessage;
    "property.price": ErrorWithMessage;
    "property.current": ErrorWithMessage;
    "member.phone": ErrorWithMessage;
    "member.email": ErrorWithMessage;
    "member.lastName": ErrorWithMessage;
    "member.firstName": ErrorWithMessage;
    startDate: ErrorWithMessage;
    endDate: ErrorWithMessage;
    duration: ErrorWithMessage;
  }>;
};
