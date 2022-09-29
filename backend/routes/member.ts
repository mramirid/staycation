import express from "express";
import * as controller from "../controllers/member";
import * as imagesMulter from "../middlewares/images.multer";

const memberRouter = express.Router();

memberRouter.get("/landing", controller.getLanding);

memberRouter.get("/properties/:id", controller.getProperty);

memberRouter.post(
  "/bookings",
  imagesMulter.handleUpload("payment-proof"),
  controller.addBooking
);

memberRouter.get("/test", controller.getTest);

export default memberRouter;
