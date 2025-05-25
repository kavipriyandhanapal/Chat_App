import React from "react";
import useAuthStore from "../store/useAuthStore";
import { default as LOGO } from "../assets/logo/LOGO.png";
import { default as JUSTIN } from "../assets/logo/JUSTIN.jpg";
import { PowerSquareIcon, Settings, UserPen } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center hover:opacity-80 transition-all"
            >
              <div className="flex items-center justify-center gap-2">
                <img className="h-16 w-16" src={LOGO} alt="my logo" />
                <img className="h-16 w-auto" src={JUSTIN} alt="my app name" />
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-2">
            {authUser && (
              <>
                <Link to={"/settings"} className="btn btn-sm gap-2">
                  <Settings className="size-5" />
                  <span className="hidden sm:inline">Settings</span>
                </Link>

                <Link to={"/profile"} className="btn btn-sm gap-2">
                  <UserPen className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="flex btn btn-sm gap-2 items-center"
                  onClick={logout}
                >
                  <PowerSquareIcon className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
