import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: localStorage.getItem("chat-theme") || "dracula",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme:", theme);
    set({ theme });
  },
}));

export default useThemeStore;
