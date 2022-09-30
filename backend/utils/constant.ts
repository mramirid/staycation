import { cleanEnv, str } from "envalid";
import createHttpError from "http-errors";

export const env = cleanEnv(process.env, {
  MONGO_HOSTNAME: str(),
  MONGO_INITDB_ROOT_USERNAME: str(),
  MONGO_INITDB_ROOT_PASSWORD: str(),
  SESSION_SECRET: str(),
});

export const MAX_PROPERTY_IMAGES = 3;

export const category404Error = new createHttpError.NotFound(
  "Category not found"
);
export const property404Error = new createHttpError.NotFound(
  "Property not found"
);
