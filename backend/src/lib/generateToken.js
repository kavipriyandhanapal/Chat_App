import jwt from "jsonwebtoken";

const generateToken = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRETE, {
    expiresIn: "7d",
  });


    res.cookie("jwt", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
      httpOnly: true,
      sameSite: "Strict", // Ensure cookies are secure in production
      secure: process.env.NODE_ENV !== "development",
    });
};


export default generateToken
