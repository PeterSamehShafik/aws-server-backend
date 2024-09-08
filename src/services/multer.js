import multer from "multer";

export const fileValidation = {
  image: ["image/png", "image/jpeg", "image/gif", "image/webp"],
  pdf: ["application/pdf"],
  text: ["text/plain", "text/csv", "text/html", "text/css", "text/xml"],
};

export const HME = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: "multer error", err });
  } else {
    next();
  }
};

const useMulter = (customValidation = fileValidation.image) => {
  const storage = multer.memoryStorage({});
  function fileFilter(req, file, cb) {
    if (!customValidation.includes(file.mimetype)) {
      cb("Invalid format", false);
    } else {
      cb(null, true);
    }
  }
  const upload = multer({ fileFilter, storage });

  return upload;
};

export default useMulter;
