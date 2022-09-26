import csrf from "csurf";
import express from "express";
import * as controllers from "../controllers/admin";
import { MAX_PROPERTY_IMAGES } from "../lib/constants";
import * as auth from "../middlewares/admin/auth";
import * as validators from "../middlewares/admin/validators";
import * as imagesMulter from "../middlewares/images.multer";

const adminRouter = express.Router();

adminRouter.use(csrf());

//
// Authentication
//
adminRouter.get("/login", auth.isNotAuthenticated, controllers.viewLogin);
adminRouter.post(
  "/login",
  auth.isNotAuthenticated,
  validators.loginValidator,
  controllers.login
);

adminRouter.use(auth.isAuthenticated);

adminRouter.post("/logout", controllers.logout);

adminRouter.get("/dashboard", controllers.viewDashboard);

//
// Categories
//
adminRouter.get("/categories", controllers.viewCategories);
adminRouter.post(
  "/categories",
  validators.addCategoryValidator,
  controllers.addCategory
);
adminRouter.patch(
  "/categories/:id",
  validators.editCategoryValidator,
  controllers.editCategory
);
adminRouter.delete(
  "/categories/:id",
  validators.paramIdValidator,
  controllers.deleteCategory
);

//
// Banks
//
adminRouter.get("/banks", controllers.viewBanks);
adminRouter.post(
  "/banks",
  imagesMulter.handleUploadImage("bankLogo"),
  validators.addBankValidator,
  controllers.addBank
);
adminRouter.patch(
  "/banks/:id",
  imagesMulter.handleUploadImage("bankLogo"),
  validators.editBankValidator,
  controllers.editBank
);
adminRouter.delete(
  "/banks/:id",
  validators.paramIdValidator,
  controllers.deleteBank
);

//
// Properties
//
adminRouter.get("/properties", controllers.viewProperties);
adminRouter.post(
  "/properties",
  imagesMulter.handleUploadImages("images", MAX_PROPERTY_IMAGES),
  validators.addPropertyValidator,
  controllers.addProperty
);
adminRouter.get(
  "/properties/:id/images",
  validators.paramIdValidator,
  controllers.viewPropertyImages
);
adminRouter.get("/properties/:id/edit", controllers.viewEditProperty);
adminRouter.patch(
  "/properties/:id",
  imagesMulter.handleUploadImages("images", MAX_PROPERTY_IMAGES),
  validators.editPropertyValidator,
  controllers.editProperty
);
adminRouter.delete(
  "/properties/:id",
  validators.paramIdValidator,
  controllers.deleteProperty
);
adminRouter.get(
  "/properties/:id/addons",
  validators.paramIdValidator,
  controllers.viewPropertyAddons
);
adminRouter.post(
  "/properties/:id/features",
  imagesMulter.handleUploadImage("icon"),
  validators.addFeatureValidator,
  controllers.addFeature
);
adminRouter.patch(
  "/properties/:propertyId/features/:featureId",
  imagesMulter.handleUploadImage("icon"),
  validators.editFeatureValidator,
  controllers.editFeature
);
adminRouter.delete(
  "/properties/:propertyId/features/:featureId",
  validators.deleteFeatureValidator,
  controllers.deleteFeature
);
adminRouter.post(
  "/properties/:id/activities",
  imagesMulter.handleUploadImage("image"),
  validators.addActivityValidator,
  controllers.addActivity
);
adminRouter.patch(
  "/properties/:propertyId/activities/:activityId",
  imagesMulter.handleUploadImage("image"),
  validators.editActivityValidator,
  controllers.editActivity
);
adminRouter.delete(
  "/properties/:propertyId/activities/:activityId",
  validators.deleteActivityValidator,
  controllers.deleteActivity
);

//
// Bookings
//
adminRouter.get("/bookings", controllers.viewBookings);
adminRouter.get(
  "/bookings/:id",
  validators.paramIdValidator,
  controllers.viewBooking
);
adminRouter.patch(
  "/bookings/:id/payment/accept",
  validators.paramIdValidator,
  controllers.acceptPayment
);
adminRouter.patch(
  "/bookings/:id/payment/reject",
  validators.paramIdValidator,
  controllers.rejectPayment
);

export default adminRouter;
