const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configuration

require("dotenv").config();

const { CLOUD_NAME, API_KEY, API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const { _id } = req.user;
    const imageName = `${_id}_${timestamp}`;

    return {
      folder: "recipes",
      public_id: imageName,
      allowed_formats: ["jpg", "jpeg", "png"],
      transformation: [{ width: 700, height: 700, crop: "fill" }],
    };
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

const imageUpload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 },
  fileFilter: fileFilter,
});

module.exports = imageUpload;
