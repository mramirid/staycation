import express from "express";
import * as adminController from "../controllers/admin";

const router = express.Router();

router.get("/dashboard", adminController.viewDashboard);
router.get("/categories", adminController.viewCategories);
router.get("/banks", adminController.viewBanks);
router.get("/properties", adminController.viewProperties);
router.get("/bookings", adminController.viewBookings);

export default router;
