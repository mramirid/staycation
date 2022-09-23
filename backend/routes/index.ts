import express from "express";

const router = express.Router();

/* GET home page. */
router.get("/", function (_, res) {
  res.redirect("/admin/login");
});

export default router;
