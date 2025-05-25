import React from "react";
import { THEMES } from "../constants";
import useAuthStore from "../store/useAuthStore.js";
import useThemeStore from "../store/useThemeStore.jsx";
import { Send } from "lucide-react";
import { default as preview } from "../assets/logo/preview.avif";
import NavHeaderBar from "../components/NavHeaderBar.jsx";

const Settings = () => {
  const preview_msg = [
    { id: 1, content: "Bro! My crush replied", isSent: false },
    { id: 2, content: "Whaat?", isSent: true },
    { id: 3, content: "Finally! nailed it yar", isSent: true },
  ];

  const { authUser } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  return (
    <div>
      <NavHeaderBar />
      {authUser && (
        <>
          <div className="h-screen container mx-auto px-4 pt-20 max-w-5xl">
            <div className="space-y-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-lg font-semibold"> Theme </h2>
                <p> Choose a theme & Change the vibe! </p>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                {THEMES.map((t) => (
                  <button
                    key={t}
                    className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
                `}
                    onClick={() => setTheme(t)}
                  >
                    {/* display theme colors */}
                    <div
                      className="relative h-8 w-full rounded-md overflow-hidden"
                      data-theme={t}
                    >
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                        <div className="rounded bg-primary"></div>
                        <div className="rounded bg-secondary"></div>
                        <div className="rounded bg-accent"></div>
                        <div className="rounded bg-neutral"></div>
                      </div>
                    </div>
                    {/* display theme names */}
                    <span className="text-[11px] font-medium truncate w-full text-center">
                      {t.charAt(0).toUpperCase() + t.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            &nbsp; &nbsp;&nbsp;
            {/* Preview section */}
            <h3 className="text-2xl text-center font-bold mb-3">
              {" "}
              Check it out Homie!{" "}
            </h3>
            <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
              <div className="p-4 bg-base-200">
                <div className="max-w-lg mx-auto">
                  {/* Mock Chat UI */}
                  <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden">
                    {/* Chat Header */}
                    <div className="px-4 py-3 border-b border-base-300 bg-base-100">
                      <div className="flex items-center gap-3">
                        <div className=" flex items-center justify-center text-primary-content font-medium">
                          <img
                            className="size-8 rounded-full"
                            src={preview}
                            alt="demo-user-img"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-sm">Emily Smith</h3>
                          <p className="text-xs text-base-content/70">Online</p>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-4 space-y-4 min-h-[200px] max-h-[200px] overflow-y-auto bg-base-100">
                      {preview_msg.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isSent ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`
                          max-w-[80%] rounded-xl p-3 shadow-sm
                          ${
                            message.isSent
                              ? "bg-primary text-primary-content"
                              : "bg-base-200"
                          }
                        `}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p
                              className={`
                            text-[10px] mt-1.5
                            ${
                              message.isSent
                                ? "text-primary-content/70"
                                : "text-base-content/70"
                            }
                          `}
                            >
                              12:00 PM
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-base-300 bg-base-100">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          className="input input-bordered flex-1 text-sm h-10"
                          value="Type a message . . ."
                          readOnly
                        />
                        <button className="btn btn-primary h-10 min-h-0">
                          <Send size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Settings;
