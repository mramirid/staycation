import { cleanEnv, str } from "envalid";
import createHttpError from "http-errors";

export const env = cleanEnv(process.env, {
  MONGO_HOSTNAME: str(),
  MONGO_INITDB_ROOT_USERNAME: str(),
  MONGO_INITDB_ROOT_PASSWORD: str(),
  SESSION_SECRET: str(),
});

export const mongoUri = `mongodb://${env.MONGO_INITDB_ROOT_USERNAME}:${env.MONGO_INITDB_ROOT_PASSWORD}@${env.MONGO_HOSTNAME}:27017/staycation?authSource=admin`;

export const MAX_PROPERTY_IMAGES = 3;

export const category404Error = new createHttpError.NotFound(
  "Category not found"
);
export const property404Error = new createHttpError.NotFound(
  "Property not found"
);
