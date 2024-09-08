import { Router } from "express";
import * as awsController from "./controller/aws.controller.js";
import useMulter, { fileValidation, HME } from "./../../services/multer.js";

const router = Router();

router.post(
  "/",
  useMulter([...fileValidation.image,...fileValidation.pdf]).single("file"),
  HME,
  awsController.addFile
);

router.get('/',awsController.getAllFiles)
router.get('/folders',awsController.getAllFolders)

router.delete('/',awsController.deleteFile)

export default router;
