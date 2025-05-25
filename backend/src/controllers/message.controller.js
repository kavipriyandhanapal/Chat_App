import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import { getReceiverChatId, myserver } from "../lib/socket.js";

export const getSideNavUsers = async (req, res) => {
  const userId = req.user._id;
  console.log(req.user._id);

  if (!userId) return res.status(401).json({ message: "Unauthorized Access" });

  const allUsers = await User.find({ _id: { $ne: userId } }).select(
    "-password"
  );

  res.status(200).json({
    message: "All Users ",
    allUsers,
  });
};

export const getAllMessages = async (req, res) => {
  const myId = req.user._id;
  const { id: userToChatId } = req.params;

  const allChats = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChatId },
      { senderId: userToChatId, receiverId: myId },
    ],
  });
  console.log(allChats);

  res.status(200).json(allChats);
};

export const saveMessage = async (req, res) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user._id;

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image,
  });

  await newMessage.save();
  const ReceiverChatId = getReceiverChatId(receiverId);

  if (ReceiverChatId) {
    myserver.to(ReceiverChatId).emit("newMessage", newMessage);
  }

  return res.status(201).json({
    message: "Messsage sent sucessfully",
    newMessage,
  });
};
