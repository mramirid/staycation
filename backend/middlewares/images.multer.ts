import crypto from "crypto";
import type { RequestHandler } from "express";
import fs from "fs";
import _ from "lodash";
import multer from "multer";
import path from "path";
import { AlertStatuses, setAlert } from "../utils/alert";

// Storage engine for single image upload
const uploadStorage = multer.diskStorage({
  destination: "public/images",
  filename: (_, file, cb) => {
    cb(null, crypto.randomUUID() + path.extname(file.originalname));
  },
});

export function handleUpload(fieldName: string): RequestHandler {
  const upload = multer({
    storage: uploadStorage,
    limits: { fileSize: 1_000_000 },
    fileFilter: (_, file, cb) => checkFileType(file, cb),
  }).single(fieldName);

  return (req, res, next) => {
    upload(req, res, (maybeError: unknown) => {
      if (_.isError(maybeError)) {
        setAlert(req, {
          message: maybeError.message,
          status: AlertStatuses.Error,
        });
      }
      next();
    });
  };
}

const multipleUploadStorage = multer.diskStorage({
  destination: (_, __, cb) => {
    const dir = "public/images";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (_, file, cb) => {
    cb(null, crypto.randomUUID() + path.extname(file.originalname));
  },
});

export function handleUploadArray(
  fieldName: string,
  maxFiles = 12
): RequestHandler {
  const uploadMultiple = multer({
    storage: multipleUploadStorage,
    limits: { fileSize: 1_000_000 },
    fileFilter: (_, file, cb) => checkFileType(file, cb),
  }).array(fieldName, maxFiles);

  return (req, res, next) => {
    uploadMultiple(req, res, (maybeError: unknown) => {
      if (_.isError(maybeError)) {
        setAlert(req, {
          message: maybeError.message,
          status: AlertStatuses.Error,
        });
      }
      next();
    });
  };
}

function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const isExtValid = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check mime
  const isMimeTypeValid = fileTypes.test(file.mimetype);

  if (isMimeTypeValid && isExtValid) {
    cb(null, true);
    return;
  }
  cb(new TypeError("Images Only: jpeg, jpg, png, or gif"));
}
