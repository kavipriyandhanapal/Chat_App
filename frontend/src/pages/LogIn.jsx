import React, { useState } from "react";
import { default as Logo } from "../assets/logo/LOGO.png";
import useAuthStore from "../store/useAuthStore";
import { LockKeyhole, Mail, EyeOff, Eye, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Chatbubblelottie from "../components/Chatbubblelottie";

const LogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side form logic */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO Code*/}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className=" flex items-center justify-center">
                <img className="size-3/12" src={Logo} alt="my logo" />
              </div>
              <h1 className="text-2xl font-bold mt-2">
                {" "}
                Welcome back Boo-mate!{" "}
              </h1>
              <p className="text-base-content/60">Log in to your vibe</p>
            </div>
          </div>
          {/*FORM LOGIC*/}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="size-5 text-base-content/40" />
                </div>
                <input
                  type="email"
                  className="input input-bordered  focus:outline-pink-600 w-full pl-10"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKeyhole className="size-5 text-base-content/40" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered  focus:outline-pink-600 w-full pl-10"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/40" />
                  ) : (
                    <Eye className="size-5 text-base-content/40" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn bg-pink-600 hover:bg-slate-50 active:bg-pink-600 
                        w-full  text-slate-50 hover:text-pink-600 active:text-slate-50
                        text-base"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Log in"
              )}
            </button>
          </form>
          {/*link to login*/}
          <div className="relative text-center">
            <p className="pt-3 flex justify-center text-sm text-base-content/60">
              Don&#39;t have an account?&nbsp;&nbsp;{" "}
              <Link to="/signup" className="link link-secondary  no-underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side of the pge */}
      <Chatbubblelottie
        title="Your world, your login. Let’s get you in"
        subtitle="Time to spill the tea. Start the chat."
      />
    </div>
  );
};

export default LogIn;
