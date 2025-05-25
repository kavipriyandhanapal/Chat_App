import React, { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
  Mail,
  MapPin,
  UserRound,
  UserRoundPen,
} from "lucide-react";
import toast from "react-hot-toast";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { default as LOGO } from "../assets/logo/LOGO.png";

const SignUp = () => {
  //<Navbar />
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { singnUp, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName) return toast.error("Full name is required");
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(formData.fullName))
      return toast.error("Invalid Name");
    if (formData.fullName.length < 6)
      return toast.error("Full name must be atleast 6 characters");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email)
    )
      return toast.error("Invalid Email format");
    if (!formData.uname.trim()) return toast.error("User name is required");
    if (formData.uname.length < 6)
      return toast.error("User name must be atleast 6 characters");
    if (!/^[a-zA-Z0-9._@]+$/.test(formData.uname))
      return toast.error(
        "Only letters, numbers, underscores (_), periods (.), and the '@' symbol are allowed."
      );
    if (!formData.location.trim()) return toast.error("Location is required");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be atleast 6 characters");
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
        formData.password
      )
    )
      return toast.error(
        "Password must contain one uppercase , one lowercase, atleast one digit,atleast one special character"
      );

    return true;
  };

  //take event as arg --> prevent the page from refresh
  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) singnUp(formData);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side form logic */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 ">
        <div className="w-full max-w-md space-y-8">
          {/* LOGO Code*/}
          &nbsp;
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div className=" flex items-center justify-center">
                <img className="size-3/12" src={LOGO} alt="my logo" />
              </div>
              <h1 className="text-2xl font-bold mt-2">
                {" "}
                Boo-lieve in New Beginnings, Sign Up!{" "}
              </h1>
              <p className="text-base-content/60">
                Meet and Connect with Boo-mates from All Walks of Life
              </p>
            </div>
          </div>
          {/*FORM LOGIC*/}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserRound className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered  focus:outline-pink-600 w-full pl-10"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>
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
                  <UserRoundPen className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered  focus:outline-pink-600 w-full pl-10"
                  placeholder="Username"
                  value={formData.uname}
                  onChange={(e) =>
                    setFormData({ ...formData, uname: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="form-control">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="size-5 text-base-content/40" />
                </div>
                <input
                  type="text"
                  className="input input-bordered  focus:outline-pink-600 w-full pl-10"
                  placeholder="Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
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
            &nbsp;
            {/* Terms and condition display */}
            <div className="form-control">
              {/* <label className="label">
            <span className="label-text font-medium"> Full name </span>
            </label> */}
              <div className="relative">
                <p className="absolute inset-y-0 pl-10 items-center text-sm text-slate-10 ">
                  By signing up, you agree to our&nbsp;
                  <a className="text-slate-50" href="Privacy.html">
                    Terms
                  </a>
                  &nbsp;and&nbsp;
                  <a className="text-slate-50" href="Cookies.html">
                    {" "}
                    Cookies Policy{" "}
                  </a>
                  .
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="btn bg-pink-600 hover:bg-slate-50 active:bg-pink-600 
                      w-full  text-slate-50 hover:text-pink-600 active:text-slate-50
                      text-base"
              disabled={isSigningUp}
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Loading...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
          {/*link to login*/}
          <div className="relative text-center">
            <p className="pt-3 flex justify-center text-sm text-base-content/60">
              Already have an account?&nbsp;&nbsp;
              <Link to="/login" className="no-underline link link-secondary">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side of the pge */}
      <AuthImagePattern
        title="Boo-come Part of the Squad"
        subtitle="Claim your Boo-mate spot and unlock your Boo-tastic Experience"
      />
    </div>
  );
};

export default SignUp;
