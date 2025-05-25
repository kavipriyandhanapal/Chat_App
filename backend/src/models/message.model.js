import mongoose, { Schema } from "mongoose";
const messageModel = new Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },

    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      require: true,
    },

    text: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  {
   timestamps:true
  }
);

const Message = mongoose.model("Message", messageModel);
export default Message;
