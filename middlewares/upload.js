const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: "Avatars",
  allowedFormats: ["jpg", "png", "jpeg"],
  filename: (req, file, cb) => {
    const { _id } = req.user;
    cb(null, _id + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cd) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cd(null, true);
  } else {
    cd({ message: "Unsupported file format. Must be jpeg, png, jpg" }, false);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = upload;
