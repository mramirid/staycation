import express from "express";
import * as adminController from "../controllers/admin";
import * as imagesMulter from "../middlewares/images.multer";
import * as adminValidators from "../middlewares/validators/admin";

const router = express.Router();

router.get("/dashboard", adminController.viewDashboard);

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
  adminValidators.deleteCategoryValidator,
  adminController.deleteCategory
);

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
router.delete("/banks/:id", adminController.deleteBank);

router.get("/properties", adminController.viewProperties);
router.post(
  "/properties",
  imagesMulter.handleUploadImages("images", 3),
  adminValidators.addPropertyValidator,
  adminController.addProperty
);
router.get(
  "/properties/:id/images",
  adminValidators.viewPropertyImagesValidator,
  adminController.viewPropertyImages
);

router.get("/bookings", adminController.viewBookings);

export default router;
