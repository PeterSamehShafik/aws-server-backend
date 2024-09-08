import { asyncHandler } from "./../../../middlewares/errorHandle.js";
import client_s3, { bucketName } from "../../../services/AWS-S3.js";
import {
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const addFile = asyncHandler(async (req, res, next) => {
  const { folder } = req.body;
  const file = req.file;

  if (!file) {
    return next(Error("No file uploaded", { cause: 400 }));
  }

  const fileName = folder
    ? `${folder}/${Date.now()}_${file.originalname}`
    : `${Date.now()}_${file.originalname}`;
  const params = {
    Bucket: bucketName,
    // Key: `test/${fileName}`,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
  };

  const command = new PutObjectCommand(params);
  const response = await client_s3.send(command);

  return res.status(200).json({ message: "done", fileName });
  //   return res.status(200).send(params);
});

export const getAllFiles = asyncHandler(async (req, res, next) => {
  const params = {
    Bucket: bucketName,
  };
  const command = new ListObjectsV2Command(params);
  const aws_response = await client_s3.send(command);
  aws_response.Contents = aws_response.Contents.filter(
    (file) => file.Size !== 0
  );

  const signedUrls = await Promise.all(
    aws_response.Contents.map(async (file) => {
      const getObjectParams = {
        Bucket: bucketName,
        Key: file.Key,
      };

      // Generate a signed URL for each object
      const signedUrl = await getSignedUrl(
        client_s3,
        new GetObjectCommand(getObjectParams),
        { expiresIn: 3600 }
      );

      return {
        key: file.Key,
        url: signedUrl,
        lastModified: file.LastModified,
        size: file.Size,
        storageClass: file.StorageClass,
      };
    })
  );

  const res_to_front = {
    count: aws_response.Contents.length,
    files: signedUrls,
  };

  // Return the list of objects (files) in the bucket
  return res.status(200).json({ message: "done", data: res_to_front });
});

export const deleteFile = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  const params = {
    Bucket: bucketName,
    Key: id,
  };

  const command = new DeleteObjectCommand(params);
  const aws_res = await client_s3.send(command);

  return res.status(204).send({});
});

export const getAllFolders = asyncHandler(async (req, res, next) => {
  const params = {
    Bucket: bucketName,
  };
  const command = new ListObjectsV2Command(params);
  const aws_response = await client_s3.send(command);
  aws_response.Contents = aws_response.Contents.filter(
    (file) => file.Size == 0
  );

  const res_to_front = {
    count: aws_response.Contents.length,
    files: aws_response.Contents,
  };

  // Return the list of objects (files) in the bucket
  return res.status(200).json({ message: "done", data: res_to_front });
});
