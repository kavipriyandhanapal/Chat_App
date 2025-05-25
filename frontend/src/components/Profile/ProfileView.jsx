import  useChatStore  from "../../store/useChatStore";
import { X } from "lucide-react";

const ProfileView = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <figure className="px-10 pt-10">
        <img src={selectedUser.profilePic} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{selectedUser.fullname}</h2>
        <p> Location : {selectedUser.location} </p>
        <p> Member Since : {selectedUser.createdAt?.split("T")[0]}</p>
        &nbsp;&nbsp;
        <div className="card-actions">
          <button>
            <X className="text-pink-600 hover:text-pink-600/50" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
