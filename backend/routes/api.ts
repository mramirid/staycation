import express from "express";
import * as controller from "../controllers/api";

const apiRouter = express.Router();

apiRouter.get("/landing-page", controller.getLandingPage);

export default apiRouter;
