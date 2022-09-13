import crypto from "crypto";
import fs from "fs";
import multer from "multer";
import path from "path";

// Storage engine for single image upload
const uploadStorage = multer.diskStorage({
  destination: "public/images",
  filename: (_, file, cb) => {
    cb(null, crypto.randomUUID() + path.extname(file.originalname));
  },
});

export function handleUploadImage(fieldName: string) {
  return multer({
    storage: uploadStorage,
    limits: { fileSize: 1_000_000 },
    fileFilter: (_, file, cb) => checkFileType(file, cb),
  }).single(fieldName);
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

export function handleUploadImages(fieldName: string, maxFiles = 12) {
  return multer({
    storage: multipleUploadStorage,
    limits: { fileSize: 1_000_000 },
    fileFilter: (_, file, cb) => checkFileType(file, cb),
  }).array(fieldName, maxFiles);
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
  cb(new TypeError("Images Only: jpeg, jpg, png, or gif."));
}
