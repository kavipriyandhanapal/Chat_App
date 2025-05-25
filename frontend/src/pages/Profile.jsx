import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import { Camera, Mail, MapPin, UserPen, UserRound } from "lucide-react";

const Profile = () => {
  const [selectedPic, setSelectedPic] = useState(null);

  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();



   const handleImageUpload = async (e) => {
     const file = e.target.files[0];
     if (!file) return;

     const reader = new FileReader();

     reader.readAsDataURL(file);

     reader.onload = async () => {
       const base64Image = reader.result;
       setSelectedPic(base64Image);
       await updateProfile({ profileUrl: base64Image });
     };
   };

  return (
    <div>
      <div className="h-screen pt-20">
        <div className="max-w-2xl mx-auto p-4 py-8">
          <div className="bg-base-300 rounded-xl p-6 space-y-8">
            <div className="text-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
            </div>

            {/* Profile img upload sec */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  src={selectedPic || authUser.profileUrl || "/avatar.png"}
                  alt="Profile Image"
                  className="size-32 rounded-full object-cover border-4"
                />

                <label
                  htmlFor="Img-upload"
                  className={`
                    absolute bottom-0 right-0
                    bg-pink-600 hover:scale-105
                    p-2 rounded-full cursor-pointer 
                    transition-all duration-200
                    ${
                      isUpdatingProfile
                        ? "animate-pulse pointer-events-none"
                        : ""
                    }
                    `}
                >
                  <Camera className="size-5 text-stone-950" />
                  <input
                    type="file"
                    id="Img-upload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={isUpdatingProfile}
                  />
                </label>
              </div>
              <p className="text-sm text-pink-600">
                {isUpdatingProfile ? "Uploading..." : ""}
              </p>
            </div>

            {/* Profile info upload sec */}
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-slate-200 flex items-center gap-2">
                  <UserRound className="size-4 text-zinc-500" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {" "}
                  {authUser?.fullname}{" "}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-slate-200 flex items-center gap-2">
                  <Mail className="size-4 text-zinc-500" />
                  Email
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.email}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-slate-200 flex items-center gap-2">
                  <UserPen className="size-4 text-zinc-500" />
                  Username
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.uname}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-slate-200 flex items-center gap-2">
                  <MapPin className="size-4 text-zinc-500" />
                  Location
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.location}
                </p>
              </div>
            </div>


            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium mb-4">
                {" "}
                Account Information{" "}
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span> Account Status </span>
                  <span className="text-pink-400"> Active </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
