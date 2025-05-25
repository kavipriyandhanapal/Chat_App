import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      require: true,
    },
    profileUrl:{
      type:String
    }
  },
  {
   timestamps:true
  }
);

const User = mongoose.model("Users", userModel);

export default User;
