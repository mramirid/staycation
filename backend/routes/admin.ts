import express from "express";
import * as adminController from "../controllers/admin";
import { handleUploadImage } from "../middlewares/images.multer";

const router = express.Router();

router.get("/dashboard", adminController.viewDashboard);

router.get("/categories", adminController.viewCategories);
router.post("/categories", adminController.addCategory);
router.patch("/categories", adminController.editCategory);
router.delete("/categories/:id", adminController.deleteCategory);

router.get("/banks", adminController.viewBanks);
router.post("/banks", handleUploadImage("bankLogo"), adminController.addBank);

router.get("/properties", adminController.viewProperties);

router.get("/bookings", adminController.viewBookings);

export default router;
