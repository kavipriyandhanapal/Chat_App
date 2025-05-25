import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/";

const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningIn: false,
  isLogingIn: false,
  isCheckAuth: false,
  isUpdatingProfile: false,
  activeUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      set({ isCheckAuth: true });
      const user = await axiosInstance.get("/auth/check");
      get().connectSocket();
      set({ authUser: user.data.user });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isCheckAuth: false });
    }
  },

  singnUp: async (data) => {
    try {
      set({ isSigningIn: true });
      const user = await axiosInstance.post("/auth/signup", data);
      set({ authUser: user.data });
      toast.success(user.data.message);
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      set({ isSigningIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success(response.data.message);
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message + " Something Went Wrong");
    }
  },

  login: async (data) => {
    try {
      set({ isLogingIn: true });
      console.log(data);
      const user = await axiosInstance.post("/auth/login", data);
      toast.success(user.data.message);

      set({ authUser: user.data });
      get().connectSocket();
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      set({ isLogingIn: false });
    }
  },

  updateProfile: async (data) => {
    try {
      set({ isUpdatingProfile: true });
      const updatedProfile = await axiosInstance.put(
        "auth/update-profile",
        data
      );
      set({ authUser: updatedProfile.data });
      set({ isUpdatingProfile: false });
      toast.success("Progile Updated Sucessfully");
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong Try Agin Later");
    }
  },
  connectSocket: () => {
    const { authUser } = get();

    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
      transports: ["websocket"],
    });
    socket.connect();
    set({ socket });

    socket.on("connect", () => {
      console.log("🟢 Socket Connected:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket Disconnected");
    });

    socket.on("connect_error", (err) => {
      console.error("🚫 Socket connection failed", err.message);
    });

    socket.on("getUsers", (userIds) => {
      console.log(userIds);
      set({ activeUsers: userIds });
    });
  },

  disconnectSocket: () => {
    console.log("test");
    if (get().socket.connected) get().socket?.disconnect();
  },
}));

export default useAuthStore;
