import { cleanEnv, str } from "envalid";
import createHttpError from "http-errors";

export const env = cleanEnv(process.env, {
  MONGO_HOSTNAME: str({ default: "localhost" }),
  MONGO_INITDB_ROOT_USERNAME: str({ default: "root" }),
  MONGO_INITDB_ROOT_PASSWORD: str({ default: "jajaja" }),
  SESSION_SECRET: str({ default: "1dc52b10-adda-4376-988f-cac07784dfda" }),
});

export const MAX_PROPERTY_IMAGES = 3;

export const category404Error = new createHttpError.NotFound(
  "Category not found"
);
export const property404Error = new createHttpError.NotFound(
  "Property not found"
);
