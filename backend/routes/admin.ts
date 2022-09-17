import express from "express";
import * as controllers from "../controllers/admin";
import { MAX_PROPERTY_IMAGES } from "../lib/constants";
import * as imagesMulter from "../middlewares/images.multer";
import * as validators from "../middlewares/validators/admin";

const router = express.Router();

router.get("/dashboard", controllers.viewDashboard);

//
// Categories
//
router.get("/categories", controllers.viewCategories);
router.post(
  "/categories",
  validators.addCategoryValidator,
  controllers.addCategory
);
router.patch(
  "/categories/:id",
  validators.editCategoryValidator,
  controllers.editCategory
);
router.delete(
  "/categories/:id",
  validators.paramIdValidator,
  controllers.deleteCategory
);

//
// Banks
//
router.get("/banks", controllers.viewBanks);
router.post(
  "/banks",
  imagesMulter.handleUploadImage("bankLogo"),
  validators.addBankValidator,
  controllers.addBank
);
router.patch(
  "/banks/:id",
  imagesMulter.handleUploadImage("bankLogo"),
  validators.editBankValidator,
  controllers.editBank
);
router.delete(
  "/banks/:id",
  validators.paramIdValidator,
  controllers.deleteBank
);

//
// Properties
//
router.get("/properties", controllers.viewProperties);
router.post(
  "/properties",
  imagesMulter.handleUploadImages("images", MAX_PROPERTY_IMAGES),
  validators.addPropertyValidator,
  controllers.addProperty
);
router.get(
  "/properties/:id/images",
  validators.paramIdValidator,
  controllers.viewPropertyImages
);
router.get("/properties/:id/edit", controllers.viewEditProperty);
router.patch(
  "/properties/:id",
  imagesMulter.handleUploadImages("images", MAX_PROPERTY_IMAGES),
  validators.editPropertyValidator,
  controllers.editProperty
);
router.delete(
  "/properties/:id",
  validators.paramIdValidator,
  controllers.deleteProperty
);
router.get(
  "/properties/:id",
  validators.paramIdValidator,
  controllers.viewProperty
);
router.post(
  "/properties/:id/features",
  imagesMulter.handleUploadImage("icon"),
  validators.addFeatureValidator,
  controllers.addFeature
);

//
// Bookings
//
router.get("/bookings", controllers.viewBookings);

export default router;
