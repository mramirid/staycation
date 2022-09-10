import express from "express";
import _ from "lodash";
import mongoose from "mongoose";
import Fruit from "./models/Fruit";

const app = express();

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (_, res) => {
  res.render("index", {
    name: "Amir",
    age: 99,
    hobbies: ["Workout", "Coding", "Cleaning"],
  });
});

const mongoDbUsername = process.env.MONGO_INITDB_ROOT_USERNAME;
const mongoDbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

mongoose.connect(
  `mongodb://${mongoDbUsername}:${mongoDbPassword}@mongodb:27017/fruits?authSource=admin`,
  async (error) => {
    if (_.isError(error)) {
      console.error("Failed to connect to MongoDB:", error);
      return;
    }

    try {
      await createDummyFruit();
    } catch (error) {
      console.error("Failed to create dummy fruit:", error);
      mongoose.connection.close();
      return;
    }

    app.listen(3000, () => console.log("Listening at http://localhost:3000"));
  }
);

async function createDummyFruit() {
  await Fruit.deleteOne();

  const newFruit = new Fruit({
    name: "Banana",
    rating: 4.75,
    review: "console.log('b' + 'a' + + 'a' + 'a')",
  });
  await newFruit.save();
}
