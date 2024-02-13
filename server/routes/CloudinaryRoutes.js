import express from "express";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.post("/", upload.single("image"), (req, res) => {
  // Get the uploaded file
  console.log(req.file);
  const file = req.file;

  // Upload the file to Cloudinary
  const uploadPromise = new Promise((resolve, reject) => {
    cloudinary.uploader.upload(file.path, (err, result) => {
      if (err) {
        console.error("Error uploading file:", err);
        reject(err);
      } else {
        // File uploaded successfully
        console.log("Upload result:", result);
        resolve(result.secure_url);
      }

      // Remove the temporary file
      fs.unlinkSync(file.path);
    });
  });

  // Wait for the upload to finish
  uploadPromise
    .then((imageUrl) => {
      // Send the response with the uploaded image URL
      console.log("Image URL:", imageUrl);
      res.send({
        message: "Image uploaded successfully",
        image: imageUrl,
      });
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      res.status(500).json({ error: "Failed to upload file" });
    });
});

export default router;
