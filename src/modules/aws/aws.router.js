import { Router } from "express";
import * as awsController from "./controller/aws.controller.js";

const router = Router();

router.get("/", (req, res, next) => {
  res.send("Hey");
});

export default router;
