import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", function (_, res) {
  res.render("index", { title: "Express" });
});

export default router;
