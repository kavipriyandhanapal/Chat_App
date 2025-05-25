import { MessageCircleHeart } from "lucide-react";

const InitialChatScreen = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-16 bg-base-100/50">
      <div className="max-w-md text-center space-y-6">
        {/* Icon code */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative">
            <div
              className="size-16 rounded-2xl bg-primary/10 flex items-center
             justify-center animate-bounce"
            >
              <MessageCircleHeart className="size-9 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Initial Text before chat */}
        <h2 className="text-2xl font-bold text-slate-200"> Watsup Boo-mate!</h2>
        <p className="text-slate-300">
          Start vibin&apos; by selecting you boo-mate!
        </p>
      </div>
    </div>
  );
};

export default InitialChatScreen;
