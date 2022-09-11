import express from "express";
import * as adminController from "../controllers/admin";

const router = express.Router();

router.get("/dashboard", adminController.getIndex);

export default router;
