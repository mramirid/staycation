import express from "express";
import * as adminController from "../controllers/admin";
import {
  handleUploadImage,
  handleUploadImages,
} from "../middlewares/images.multer";

const router = express.Router();

router.get("/dashboard", adminController.viewDashboard);

router.get("/categories", adminController.viewCategories);
router.post("/categories", adminController.addCategory);
router.patch("/categories", adminController.editCategory);
router.delete("/categories/:id", adminController.deleteCategory);

router.get("/banks", adminController.viewBanks);
router.post("/banks", handleUploadImage("bankLogo"), adminController.addBank);
router.patch("/banks", handleUploadImage("bankLogo"), adminController.editBank);
router.delete("/banks/:id", adminController.deleteBank);

router.get("/properties", adminController.viewProperties);
router.post(
  "/properties",
  handleUploadImages("images", 3),
  adminController.addProperty
);

router.get("/bookings", adminController.viewBookings);

export default router;
