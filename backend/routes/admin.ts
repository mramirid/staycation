import express from "express";
import * as controllers from "../controllers/admin";
import { MAX_PROPERTY_IMAGES } from "../lib/constants";
import * as auth from "../middlewares/admin/auth";
import * as validators from "../middlewares/admin/validators";
import * as imagesMulter from "../middlewares/images.multer";

const router = express.Router();

//
// Authentication
//
router.get("/login", auth.isNotAuthenticated, controllers.viewLogin);
router.post(
  "/login",
  auth.isNotAuthenticated,
  validators.loginValidator,
  controllers.login
);

router.use(auth.isAuthenticated);

router.post("/logout", controllers.logout);

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
  "/properties/:id/addons",
  validators.paramIdValidator,
  controllers.viewPropertyAddons
);
router.post(
  "/properties/:id/features",
  imagesMulter.handleUploadImage("icon"),
  validators.addFeatureValidator,
  controllers.addFeature
);
router.patch(
  "/properties/:propertyId/features/:featureId",
  imagesMulter.handleUploadImage("icon"),
  validators.editFeatureValidator,
  controllers.editFeature
);
router.delete(
  "/properties/:propertyId/features/:featureId",
  validators.deleteFeatureValidator,
  controllers.deleteFeature
);
router.post(
  "/properties/:id/activities",
  imagesMulter.handleUploadImage("image"),
  validators.addActivityValidator,
  controllers.addActivity
);
router.patch(
  "/properties/:propertyId/activities/:activityId",
  imagesMulter.handleUploadImage("image"),
  validators.editActivityValidator,
  controllers.editActivity
);
router.delete(
  "/properties/:propertyId/activities/:activityId",
  validators.deleteActivityValidator,
  controllers.deleteActivity
);

//
// Bookings
//
router.get("/bookings", controllers.viewBookings);
router.get(
  "/bookings/:id",
  validators.paramIdValidator,
  controllers.viewBooking
);

export default router;
