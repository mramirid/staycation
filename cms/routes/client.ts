import express from "express";
import * as controller from "../controllers/client";
import * as imagesMulter from "../middlewares/images.multer";

const clientApiRouter = express.Router();

clientApiRouter.get("/landing", controller.getLanding);

clientApiRouter.get("/properties/:id", controller.getProperty);

clientApiRouter.get("/banks", controller.getBanks);

clientApiRouter.post(
  "/bookings",
  imagesMulter.handleUpload("payment-proof"),
  controller.addBooking
);

clientApiRouter.get("/test", controller.getTest);

export default clientApiRouter;
