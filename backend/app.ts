import cookieParser from "cookie-parser";
import express, { ErrorRequestHandler } from "express";
import createError from "http-errors";
import logger from "morgan";
import path from "path";
import adminRouter from "./routes/admin";
import indexRouter from "./routes/index";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use("/", indexRouter);
app.use("/admin", adminRouter);

// catch 404 and forward to error handler
app.use((_, __, next) => {
  next(createError(404));
});

// error handler
const errorHandler: ErrorRequestHandler = (err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};
app.use(errorHandler);

export default app;

// const mongoDbUsername = process.env.MONGO_INITDB_ROOT_USERNAME;
// const mongoDbPassword = process.env.MONGO_INITDB_ROOT_PASSWORD;

// mongoose.connect(
//   `mongodb://${mongoDbUsername}:${mongoDbPassword}@mongodb:27017/shop?authSource=admin`,
//   async (error) => {
//     if (_.isError(error)) {
//       console.error("Failed to connect to MongoDB:", error);
//       return;
//     }

//     try {
//       const createdFruit = await createFruit();
//       const createdPerson = await createPerson(createdFruit);
//       const personData = await getPerson(createdPerson._id);
//       console.log("personData:", personData);
//     } catch (error) {
//       console.error("Failed to create dummy fruit:", error);
//       mongoose.connection.close();
//       return;
//     }

//     app.listen(3000, () => console.log("Listening at http://localhost:3000"));
//   }
// );

// async function createFruit() {
//   await Fruit.deleteMany();

//   const newFruit = new Fruit({
//     name: "Banana",
//     rating: 4.75,
//     review: "console.log('b' + 'a' + + 'a' + 'a')",
//   });
//   return newFruit.save();
// }

// async function createPerson(fruit: IFruit) {
//   await Person.deleteMany();

//   const newPerson = new Person({
//     name: "Amir",
//     age: 22,
//     fruit,
//   });
//   return newPerson.save();
// }

// async function getPerson(_id: mongoose.Types.ObjectId) {
//   const person = await Person.findOne({ _id }).populate("fruit").exec();
//   return person;
// }
