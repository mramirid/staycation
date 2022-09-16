import express from "express";
import * as adminController from "../controllers/admin";
import { MAX_PROPERTY_IMAGES } from "../lib/constants";
import * as imagesMulter from "../middlewares/images.multer";
import * as adminValidators from "../middlewares/validators/admin";

const router = express.Router();

router.get("/dashboard", adminController.viewDashboard);

//
// Categories
//
router.get("/categories", adminController.viewCategories);
router.post(
  "/categories",
  adminValidators.addCategoryValidator,
  adminController.addCategory
);
router.patch(
  "/categories",
  adminValidators.editCategoryValidator,
  adminController.editCategory
);
router.delete(
  "/categories/:id",
  adminValidators.deleteValidator,
  adminController.deleteCategory
);

//
// Banks
//
router.get("/banks", adminController.viewBanks);
router.post(
  "/banks",
  imagesMulter.handleUploadImage("bankLogo"),
  adminValidators.addBankValidator,
  adminController.addBank
);
router.patch(
  "/banks",
  imagesMulter.handleUploadImage("bankLogo"),
  adminValidators.editBankValidator,
  adminController.editBank
);
router.delete(
  "/banks/:id",
  adminValidators.deleteValidator,
  adminController.deleteBank
);

//
// Properties
//
router.get("/properties", adminController.viewProperties);
router.get(
  "/properties/:id/images",
  adminValidators.viewPropertyImagesValidator,
  adminController.viewPropertyImages
);
router.post(
  "/properties",
  imagesMulter.handleUploadImages("images", MAX_PROPERTY_IMAGES),
  adminValidators.addPropertyValidator,
  adminController.addProperty
);
router.get("/properties/:id/edit", adminController.viewEditProperty);
router.patch(
  "/properties/:id",
  imagesMulter.handleUploadImages("images", MAX_PROPERTY_IMAGES),
  adminValidators.editPropertyValidator,
  adminController.editProperty
);

//
// Bookings
//
router.get("/bookings", adminController.viewBookings);

export default router;
