import _ from "lodash";
import mongoose from "mongoose";
import { seed } from "../seeds";
import { mongoUri } from "../utils/constant";
import { toError } from "../utils/error";

mongoose.connect(mongoUri, async (error) => {
  if (_.isError(error)) {
    throw new Error("Failed to connect to MongoDB", { cause: error });
  }

  try {
    console.log("[seed]", "dropping the database...");
    await mongoose.connection.dropDatabase();
    console.log("[seed]", "the database has been dropped");

    console.log("[seed]", "seeding...");
    await seed();
    console.log("[seed]", "done");
  } catch (maybeError) {
    await mongoose.connection.dropDatabase();
    throw new Error("Seeding failed", { cause: toError(maybeError) });
  } finally {
    await mongoose.connection.close();
  }
});
