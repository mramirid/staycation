import express from "express";
import * as controllers from "../controllers/admin";
import { MAX_PROPERTY_IMAGES } from "../lib/constants";
import * as imagesMulter from "../middlewares/images.multer";
import * as validators from "../middlewares/admin/validators";
import * as authorizations from "../middlewares/admin/authorizations";

const router = express.Router();

//
// Authentication
//
router.get("/login", authorizations.isNotAuthenticated, controllers.viewLogin);
router.post(
  "/login",
  authorizations.isNotAuthenticated,
  validators.loginValidator,
  controllers.login
);

//
// Authorization
//
router.use(authorizations.isAuthenticated);

//
// Dashboard
//
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
  "/properties/:propertyId/images",
  validators.paramPropertyIdValidator,
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
  "/properties/:propertyId/features",
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
  "/properties/:propertyId/activities",
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

export default router;
