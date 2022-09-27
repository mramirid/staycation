import express from "express";
import * as controller from "../controllers/member";

const memberRouter = express.Router();

memberRouter.get("/test", controller.getTest);
memberRouter.get("/landing-page", controller.getLandingPage);

export default memberRouter;
