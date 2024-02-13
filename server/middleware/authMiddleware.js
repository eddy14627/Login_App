import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// User must be authenticated
const protect = (req, res, next) => {
  // Check if Authorization header is present
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    // Token is not present
    return res.status(401).json({ message: "Authorization header missing" });
  }

  // Check if the Authorization header is in the correct format
  const tokenParts = authHeader.split(" ");

  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Invalid Authorization header format" });
  }

  const token = tokenParts[1];

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId; // You can now access the userId in the route handlers
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export { protect };
