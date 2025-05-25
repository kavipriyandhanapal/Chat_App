import  useAuthStore  from "../store/useAuthStore";
import  useChatStore  from "../store/useChatStore";

import { ChevronDown, X } from "lucide-react";
import { useState } from "react";
import ProfileView from "./Profile/ProfileView";

const ProfileHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { activeUsers } = useAuthStore();
  const [isClicked, setIsClicked] = useState(false);

  const handleView = () => {
    setIsClicked(!isClicked);
  };

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* profilePic section */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profileUrl || "/avatar.png"}
                alt={selectedUser.fullname}
              />
            </div>
          </div>

          {/* User details */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {activeUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* terminate chat */}
        <button onClick={() => setSelectedUser(null)}>
          <X className="text-pink-500  hover:animate-bounce" />
        </button>
      </div>
      <button onClick={handleView}>
        <ChevronDown className="text-pink-500 hover:text-pink-500/50" />
        {isClicked ? <ProfileView /> : ""}
      </button>
    </div>
  );
};

export default ProfileHeader;
