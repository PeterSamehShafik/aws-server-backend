import { Router } from "express";
import * as ec2Controller from "./controller/ec2.controller.js";

const router = Router();

router.get("/", ec2Controller.getInstances);
router.post("/manage", ec2Controller.manageEc2);

export default router;
