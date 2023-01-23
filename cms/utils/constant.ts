import { cleanEnv, str, testOnly } from "envalid";
import createHttpError from "http-errors";
import mongodbUri from "mongodb-uri";

export const env = cleanEnv(process.env, {
  MONGO_HOST: str(),
  MONGO_INITDB_ROOT_USERNAME: str(),
  MONGO_INITDB_ROOT_PASSWORD: str(),
  MONGO_DB_NAME: str({
    default: "staycation",
    devDefault: testOnly("staycationTest"),
  }),
  SESSION_SECRET: str(),
});

export const mongoUri = mongodbUri.formatMongoose({
  scheme: "mongodb",
  username: env.MONGO_INITDB_ROOT_USERNAME,
  password: env.MONGO_INITDB_ROOT_PASSWORD,
  hosts: [{ host: env.MONGO_HOST, port: 27017 }],
  database: env.MONGO_DB_NAME,
  options: {
    authSource: "admin",
  },
});

export const MAX_PROPERTY_IMAGES = 3;

export const category404Error = new createHttpError.NotFound(
  "Category not found"
);
export const property404Error = new createHttpError.NotFound(
  "Property not found"
);
