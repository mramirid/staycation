import { CustomSanitizer } from "express-validator";
import { Types } from "mongoose";

export const toObjectId: CustomSanitizer = (id: string) => {
  return new Types.ObjectId(id);
};
