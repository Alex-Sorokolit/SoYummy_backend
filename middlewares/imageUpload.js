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
  // public_id: (req, file) => `${Date.now()}-${file.originalname}`,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "recipes",
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [
      { width: 700, height: 700, crop: "fill" },
      //   { width: 350, height: 350, crop: "fill" },
    ],
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
