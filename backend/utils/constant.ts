import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  MONGO_HOSTNAME: str({ default: "localhost" }),
  MONGO_INITDB_ROOT_USERNAME: str({ default: "root" }),
  MONGO_INITDB_ROOT_PASSWORD: str({ default: "jajaja" }),
  SESSION_SECRET: str({ default: "1dc52b10-adda-4376-988f-cac07784dfda" }),
});

export const MAX_PROPERTY_IMAGES = 3;

export const category404Error = new Error("The Category does not exist");
