import { Request } from "express";
import { CustomSanitizer } from "express-validator";
import _ from "lodash";
import { Types } from "mongoose";
import { AlertStatuses, setAlert } from "./alert";
import { catchError } from "./error";

export const toObjectId: CustomSanitizer = (id: string) => {
  return new Types.ObjectId(id);
};

export const toDecimal128: CustomSanitizer = (value: number, meta) => {
  try {
    return new Types.Decimal128(value.toString());
  } catch (maybeError) {
    const error = catchError(maybeError);
    setAlert(meta.req as Request, {
      message: error.message,
      status: AlertStatuses.Error,
    });

    return undefined;
  }
};

export function toUSD(amount: number | Types.Decimal128) {
  const formattedAmount = _.toNumber(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formattedAmount;
}
