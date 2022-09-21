import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  MONGO_HOSTNAME: str(),
  MONGO_INITDB_ROOT_USERNAME: str(),
  MONGO_INITDB_ROOT_PASSWORD: str(),
  SESSION_SECRET: str(),
});

export const MAX_PROPERTY_IMAGES = 3;

export const category404 = new Error("The Category does not exist");
