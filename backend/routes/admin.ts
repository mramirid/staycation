import express from "express";
import * as adminController from "../controllers/admin";

const router = express.Router();

router.get("/dashboard", adminController.viewDashboard);
router.get("/category", adminController.viewCategory);

export default router;
