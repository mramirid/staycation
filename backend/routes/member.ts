import express from "express";
import * as controller from "../controllers/member";

const memberRouter = express.Router();

memberRouter.get("/landing", controller.getLanding);

memberRouter.get("/properties/:id", controller.getProperty);

memberRouter.get("/test", controller.getTest);

export default memberRouter;
