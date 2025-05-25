import { useRef, useState } from "react";
import { Link, Paperclip, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import useChatStore from "../store/useChatStore";

const InputMessage = () => {
  const [textmessage, setTextMessage] = useState("");
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleAttachments = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type! select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAttachmentPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const cancelAttachment = () => {
    setAttachmentPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleText = async (e) => {
    e.preventDefault();
    if (!textmessage.trim() && !attachmentPreview) return;
    try {
      await sendMessage({
        text: textmessage.trim(),
        image: attachmentPreview,
      });

      setTextMessage("");
      setAttachmentPreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Couldn't send messages", error);
    }
  };

  return (
    <div className="p-4 w-full">
      {attachmentPreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={attachmentPreview}
              alt="Preview"
              className="size-20 object-cover rounded-xl border border-zinc-700"
            />
            <button
              onClick={cancelAttachment}
              className="absolute -top-1.5 -right-1.5 size-5 rounded-full bg-base-300 flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input section */}
      <form onSubmit={handleText} className="space-y-6 ">
        <div className="form-control">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
              <Link className="size-4 text-base-content/40" />
            </div>
            {/* input input-bordered rounded-lg input-sm sm:input-md focus:outline-pink-600 w-full  */}
            <input
              type="text"
              className="input input-bordered rounded-lg pl-8 input-sm sm:pl-8 sm:input-md w-full focus:outline-pink-600 "
              placeholder="Type a message..."
              value={textmessage}
              onChange={(e) => setTextMessage(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={handleAttachments}
            />
            <button
              type="button"
              className={`absolute inset-y-0 right-0 pr-12 flex items-center pointer-events-auto
                  ${attachmentPreview ? "text-emerald-500" : "text-pink-600"} `}
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="size-4 sm:size-5" />
            </button>
            <button
              type="submit"
              className=" absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-auto text-pink-600 hover:text-pink-600/50"
              disabled={!textmessage.trim() && !attachmentPreview}
            >
              <Send className="size-4 sm:size-5" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputMessage;
