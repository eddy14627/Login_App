import asyncHandler from "../middleware/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // console.log("authUser", email, password);

  const user = await User.findOne({ email });

  if (user && password !== "" && (await user.matchPassword(password))) {
    const token = generateToken(res, user._id);
    // console.log("helloe");
    return res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      token: token,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asyncHandler(async (req, res) => {
  const {
    city,
    dob,
    email,
    fullname,
    password,
    profile,
    state,
    streetAddress,
    username,
    zipCode,
  } = req.body;
  console.log("req.body: ", req.body);

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const zipcodeNumber = zipCode ? parseInt(zipCode, 10) : undefined;

  const user = await User.create({
    city,
    dob: dob ? new Date(dob) : undefined,
    email,
    fullname,
    password,
    profile,
    state,
    streetAddress,
    username,
    zipCode: zipcodeNumber,
  });

  if (user) {
    generateToken(res, user._id);
    return res.status(201).json({
      _id: user._id,
      fullname: user.fullname, // Corrected from 'name' to 'fullname'
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Get user profiles
const getUserProfile = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const user = await User.findById(id);

  if (user) {
    res.json({
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      username: user.username,
      dob: user.dob,
      profile: user.profile,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export { authUser, registerUser, getUserProfile, updateUserProfile };
