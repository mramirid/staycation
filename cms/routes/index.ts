import express from "express";

const indexRouter = express.Router();

/* GET home page. */
indexRouter.get("/", function (_, res) {
  res.redirect("/admin/login");
});

export default indexRouter;
