import { CustomSanitizer } from "express-validator";
import _ from "lodash";
import { Types } from "mongoose";

export const toObjectId: CustomSanitizer = (id: string) => {
  return new Types.ObjectId(id);
};

export function formatToUSD(amount: number | Types.Decimal128) {
  const formattedAmount = _.toNumber(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
  return formattedAmount;
}
