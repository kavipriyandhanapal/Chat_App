import bcrypt from "bcrypt";
import generateToken from "../lib/generateToken.js";
import User from "../models/user.model.js";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    console.log(fullName, email, password);

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are Required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password Must Be At Least 6 Character Long" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      fullName,
      password: hashPassword,
      email: email,
    });

    if (newUser) {
      generateToken(newUser._id, res);
      const savedUser = await newUser.save();
      return res.status(200).json({
        message: "User Created SucessFully",
        savedUser,
      });
    } else {
      return res.status(400).json({ message: "User Not Created" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Both Email And Password Requried" });

    const FetchedUser = await User.findOne({ email });

    const validPassword = await bcrypt.compare(password, FetchedUser.password);
    console.log(password, FetchedUser.password);

    if (!validPassword) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    generateToken(FetchedUser._id, res);

    return res.status(200).json(
      {
        message: "Login Sucessfully",
      },
      User
    );
  } catch (error) {
    console.log(error, "ok");
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profileUrl } = req.body;
    const userId = req.user._id;

    if (!profileUrl)
      return res.status(400).json({ message: "Profile Url Required" });
    console.log(profileUrl);

    const cloudinaryResponse = await cloudinary.uploader.upload(profileUrl);

    const UpdatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profileUrl: cloudinaryResponse.secure_url,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Profile Updated Sucessfully",
      UpdatedUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(401).json({ message: "Unauthorized Access" });

    return res.status(200).json({
      message: "User Found",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
