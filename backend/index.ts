import flash from "connect-flash";
import express, { ErrorRequestHandler, Response } from "express";
import session from "express-session";
import createError from "http-errors";
import _ from "lodash";
import methodOverride from "method-override";
import mongoose from "mongoose";
import logger from "morgan";
import path from "path";
import { env } from "./lib/constants";
import { AppLocals, UserSession } from "./lib/types";
import adminRouter from "./routes/admin";
import indexRouter from "./routes/index";
import * as format from "./utils/format";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use(logger("dev"));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// express session setup
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60_000 },
  })
);
declare module "express-session" {
  interface SessionData {
    user: UserSession;
  }
}

app.use(flash());

// app locals.
app.use((__, res: Response<unknown, AppLocals>, next) => {
  res.locals._ = _;
  res.locals.format = format;

  next();
});

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

mongoose.connect(
  `mongodb://${env.MONGO_INITDB_ROOT_USERNAME}:${env.MONGO_INITDB_ROOT_PASSWORD}@${env.MONGO_HOSTNAME}:27017/staycation?authSource=admin`,
  (error) => {
    if (_.isError(error)) {
      console.error("Failed to connect to MongoDB:", error);
      return;
    }

    app.listen(3000, () => console.log("Listening at http://localhost:3000"));
  }
);

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
