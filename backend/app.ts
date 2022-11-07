import compression from "compression";
import flash from "connect-flash";
import connectMongoDBSession from "connect-mongodb-session";
import cors from "cors";
import express from "express";
import session from "express-session";
import helmet from "helmet";
import createError from "http-errors";
import _ from "lodash";
import methodOverride from "method-override";
import logger from "morgan";
import passport from "passport";
import path from "path";
import adminRouter from "./routes/admin";
import clientApiRouter from "./routes/client";
import indexRouter from "./routes/index";
import { env, mongoUri } from "./utils/constant";
import * as format from "./utils/format";

const app = express();

app.use(cors());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(
  "/sb-admin-2",
  express.static(path.join(__dirname, "node_modules/startbootstrap-sb-admin-2"))
);

app.use(logger("dev"));

app.use(helmet());

app.use(compression());

app.use(methodOverride("_method"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const MongoDBStore = connectMongoDBSession(session);
const mongoDBStore = new MongoDBStore({
  uri: mongoUri,
  collection: "sessions",
});
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: mongoDBStore,
  })
);

app.use(passport.authenticate("session"));

app.use(flash());

app.use((__: express.Request, res: express.Response, next) => {
  res.locals["_"] = _;
  res.locals["format"] = format;

  next();
});

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/api/v1/client", clientApiRouter);

// catch 404 and forward to error handler
app.use((_, __, next) => {
  next(createError(404));
});

// error handler
const errorHandler: express.ErrorRequestHandler = (err, req, res) => {
  // set locals, only providing error in development
  res.locals["message"] = err.message;
  res.locals["error"] = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
};
app.use(errorHandler);

export default app;
