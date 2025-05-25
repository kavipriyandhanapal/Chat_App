import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import useAuthStore from "./useAuthStore";

const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isMessageLoading: false,
  isUserLoading: false,
  setSelectedUser: (user) => set({ selectedUser: user }),

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const response = await axiosInstance.get("/messages/users");
      set({ users: response.data.allUsers });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      set({ isUserLoading: false });
    }
  },
  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const response = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: response.data });
      console.log(response);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      set({ isMessageLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data.newMessage] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
  subcribeToMessage: () => {
    const { selectedUser } = get();
    const socket = useAuthStore.getState().socket;

    if (!selectedUser || !socket || !socket.connected) return;

    socket.on("newMessage", (newMessage) => {
      const messageToActualUser = newMessage.senderId === selectedUser._id;
      if (!messageToActualUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubcribeTomessage: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket || !socket.connected) return;
    socket.off("newMessage");
  },
}));

export default useChatStore;
