import express from "express";
import _ from "lodash";
import mongoose from "mongoose";
import Fruit, { IFruit } from "./models/Fruit";
import Person from "./models/Person";

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
  `mongodb://${mongoDbUsername}:${mongoDbPassword}@mongodb:27017/shop?authSource=admin`,
  async (error) => {
    if (_.isError(error)) {
      console.error("Failed to connect to MongoDB:", error);
      return;
    }

    try {
      const createdFruit = await createFruit();
      const createdPerson = await createPerson(createdFruit);
      const personData = await getPerson(createdPerson._id);
      console.log("personData:", personData);
    } catch (error) {
      console.error("Failed to create dummy fruit:", error);
      mongoose.connection.close();
      return;
    }

    app.listen(3000, () => console.log("Listening at http://localhost:3000"));
  }
);

async function createFruit() {
  await Fruit.deleteMany();

  const newFruit = new Fruit({
    name: "Banana",
    rating: 4.75,
    review: "console.log('b' + 'a' + + 'a' + 'a')",
  });
  return newFruit.save();
}

async function createPerson(fruit: IFruit) {
  await Person.deleteMany();

  const newPerson = new Person({
    name: "Amir",
    age: 22,
    fruit,
  });
  return newPerson.save();
}

async function getPerson(_id: mongoose.Types.ObjectId) {
  const person = await Person.findOne({ _id }).populate("fruit").exec();
  return person;
}
