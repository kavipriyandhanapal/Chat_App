import useChatStore from "../store/useChatStore";
import useAuthStore from "../store/useAuthStore";
import { useEffect, useRef } from "react";

import ProfileHeader from "./ProfileHeader";
import InputMessage from "./InputMessage";
import MessageLoader from "./Loader/MessageLoader";
import { timeFormatter } from "../lib/utils";

const FinalChatScreen = () => {
  const { selectedUser } = useChatStore();
  const {
    messages,
    getMessages,
    isMessagesLoading,
    subcribeToMessage,
    unsubcribeTomessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const newMessageRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subcribeToMessage();

    return () => {
      unsubcribeTomessage();
    };
  }, [selectedUser._id, getMessages, subcribeToMessage, unsubcribeTomessage]);
  console.log(messages);

  useEffect(() => {
    if (newMessageRef.current && messages) {
      newMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ProfileHeader />
        <MessageLoader />
        <InputMessage />
      </div>
    );
  }
  console.log(messages, authUser._id);

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ProfileHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={newMessageRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="user image"
                />
              </div>
            </div>
            {/* chat bubble section */}
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Picture Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
            {/* dispaying time */}
            <div className="chat-footer mb-1">
              <time className="text-xs opacity-50 ml-1">
                {timeFormatter(message.createdAt)}
              </time>
            </div>
          </div>
        ))}
      </div>

      <InputMessage />
    </div>
  );
};

export default FinalChatScreen;
