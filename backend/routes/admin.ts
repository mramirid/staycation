import express from "express";
import * as adminControllers from "../controllers/admin";
import { MAX_PROPERTY_IMAGES } from "../lib/constants";
import * as imagesMulter from "../middlewares/images.multer";
import * as adminValidators from "../middlewares/validators/admin";

const router = express.Router();

router.get("/dashboard", adminControllers.viewDashboard);

//
// Categories
//
router.get("/categories", adminControllers.viewCategories);
router.post(
  "/categories",
  adminValidators.addCategoryValidator,
  adminControllers.addCategory
);
router.patch(
  "/categories/:id",
  adminValidators.editCategoryValidator,
  adminControllers.editCategory
);
router.delete(
  "/categories/:id",
  adminValidators.paramIdValidator,
  adminControllers.deleteCategory
);

//
// Banks
//
router.get("/banks", adminControllers.viewBanks);
router.post(
  "/banks",
  imagesMulter.handleUploadImage("bankLogo"),
  adminValidators.addBankValidator,
  adminControllers.addBank
);
router.patch(
  "/banks/:id",
  imagesMulter.handleUploadImage("bankLogo"),
  adminValidators.editBankValidator,
  adminControllers.editBank
);
router.delete(
  "/banks/:id",
  adminValidators.paramIdValidator,
  adminControllers.deleteBank
);

//
// Properties
//
router.get("/properties", adminControllers.viewProperties);
router.post(
  "/properties",
  imagesMulter.handleUploadImages("images", MAX_PROPERTY_IMAGES),
  adminValidators.addPropertyValidator,
  adminControllers.addProperty
);
router.get(
  "/properties/:id/images",
  adminValidators.paramIdValidator,
  adminControllers.viewPropertyImages
);
router.get("/properties/:id/edit", adminControllers.viewEditProperty);
router.patch(
  "/properties/:id",
  imagesMulter.handleUploadImages("images", MAX_PROPERTY_IMAGES),
  adminValidators.editPropertyValidator,
  adminControllers.editProperty
);
router.delete(
  "/properties/:id",
  adminValidators.paramIdValidator,
  adminControllers.deleteProperty
);
router.get(
  "/properties/:id",
  adminValidators.paramIdValidator,
  adminControllers.viewProperty
);
router.post(
  "/properties/:id/features",
  imagesMulter.handleUploadImage("icon"),
  adminValidators.addFeatureValidator,
  adminControllers.addFeature
);

//
// Bookings
//
router.get("/bookings", adminControllers.viewBookings);

export default router;
