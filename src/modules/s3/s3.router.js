import { Router } from "express";
import * as s3Controller from "./controller/s3.controller.js";
import useMulter, { fileValidation, HME } from "../../services/multer.js";

const router = Router();

router.post(
  "/",
  useMulter([
    ...fileValidation.image,
    ...fileValidation.pdf,
    ...fileValidation.text,
  ]).single("file"),
  HME,
  s3Controller.addFile
);

router.get("/", s3Controller.getAllFiles);
router.get("/folders", s3Controller.getAllFolders);

router.delete("/", s3Controller.deleteFile);

export default router;
