import { CustomSanitizer } from "express-validator";
import { Types } from "mongoose";

export const toObjectId: CustomSanitizer = (id: string) => {
  return new Types.ObjectId(id);
};

export function formatToUSD(amount: number) {
  const formattedAmount = amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return formattedAmount;
}
