import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const protectedRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ message: "Unauthorized Access" });

    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized Access" });

    const user = await User.findOne({ _id: decoded.userId });

    if (!user) return res.status(404).json({ message: "User Not Found" });

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export default protectedRoute;
