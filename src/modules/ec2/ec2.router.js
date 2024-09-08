import { Router } from "express";
import * as ec2Controller from "./controller/ec2.controller.js";

const router = Router();

router.get("/", ec2Controller.getInstances);

export default router;
