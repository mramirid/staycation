import csrf from "csurf";
import express from "express";
import * as controllers from "../controllers/admin";
import * as auth from "../middlewares/admin.auth";
import * as imagesMulter from "../middlewares/images.multer";
import { MAX_PROPERTY_IMAGES } from "../utils/constant";

const adminRouter = express.Router();

adminRouter.use(csrf());

//
// Authentication
//
adminRouter.get("/signup", auth.isNotAuthenticated, controllers.viewSignup);
adminRouter.post("/signup", auth.isNotAuthenticated, controllers.signup);

adminRouter.get("/login", auth.isNotAuthenticated, controllers.viewLogin);
adminRouter.post("/login", auth.isNotAuthenticated, controllers.login);

adminRouter.use(auth.isAuthenticated);

adminRouter.post("/logout", controllers.logout);

adminRouter.get("/dashboard", controllers.viewDashboard);

//
// Categories
//
adminRouter.get("/categories", controllers.viewCategories);
adminRouter.post("/categories", controllers.addCategory);
adminRouter.patch("/categories/:id", controllers.editCategory);
adminRouter.delete("/categories/:id", controllers.deleteCategory);

//
// Banks
//
adminRouter.get("/banks", controllers.viewBanks);
adminRouter.post(
  "/banks",
  imagesMulter.handleUpload("bankLogo"),
  controllers.addBank
);
adminRouter.patch(
  "/banks/:id",
  imagesMulter.handleUpload("bankLogo"),
  controllers.editBank
);
adminRouter.delete("/banks/:id", controllers.deleteBank);

//
// Properties
//
adminRouter.get("/properties", controllers.viewProperties);
adminRouter.post(
  "/properties",
  imagesMulter.handleUploadArray("images", MAX_PROPERTY_IMAGES),
  controllers.addProperty
);
adminRouter.get("/properties/:id/images", controllers.viewPropertyImages);
adminRouter.get("/properties/:id/edit", controllers.viewEditProperty);
adminRouter.patch(
  "/properties/:id",
  imagesMulter.handleUploadArray("images", MAX_PROPERTY_IMAGES),
  controllers.editProperty
);
adminRouter.delete("/properties/:id", controllers.deleteProperty);
adminRouter.get("/properties/:id/addons", controllers.viewPropertyAddons);
adminRouter.post(
  "/properties/:id/features",
  imagesMulter.handleUpload("icon"),
  controllers.addFeature
);
adminRouter.patch(
  "/properties/:propertyId/features/:featureId",
  imagesMulter.handleUpload("icon"),
  controllers.editFeature
);
adminRouter.delete(
  "/properties/:propertyId/features/:featureId",
  controllers.deleteFeature
);
adminRouter.post(
  "/properties/:id/activities",
  imagesMulter.handleUpload("image"),
  controllers.addActivity
);
adminRouter.patch(
  "/properties/:propertyId/activities/:activityId",
  imagesMulter.handleUpload("image"),
  controllers.editActivity
);
adminRouter.delete(
  "/properties/:propertyId/activities/:activityId",
  controllers.deleteActivity
);

//
// Bookings
//
adminRouter.get("/bookings", controllers.viewBookings);
adminRouter.get("/bookings/:id", controllers.viewBooking);
adminRouter.patch("/bookings/:id/payment/accept", controllers.acceptPayment);
adminRouter.patch("/bookings/:id/payment/reject", controllers.rejectPayment);

export default adminRouter;
