import React, { useState } from "react";
import { Link } from "react-router-dom";
import useSignup from "../hooks/useSignup.js";

const SignUp = () => {

  const [inputs, setInputs] = useState({
    fullname: "",
    username: "",
    profilePic: null,
    password: "",
    confirmPassword: ""
  })

  const { loading, signup } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(inputs);
  }
  
  return (
    <div className="flex flex-col items-center justify-center min-w-[25rem] mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-lg"  style={{backgroundColor: "rgb(192 192 192 / 36%)"}}>
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-blue-500"> ChatApp</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              className="w-full input input-bordered  h-10"
              value={inputs.fullname}
              onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter Username"
              className="w-full input input-bordered h-10"
              value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            />
          </div>

          <div>
            <label className="label p-2 ">
              <span className="text-base label-text">Profile Picture</span>
            </label>
            <input
              type="file"
              placeholder="upload image"
              className="text-white"
              onChange={(e) => setInputs({ ...inputs, profilePic: e.target.files[0] })}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
          </div>

          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmPassword}
              onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })}
            />
          </div>

          <Link
          to="/login"
            className="text-sm hover:underline hover:text-slate-50 mt-2 inline-block"
          >
            Already have an account?
          </Link>

          <div>
            <button className="btn btn-block btn-sm mt-2 max-w-40 flex items-center mx-auto" disabled={loading}>
              {loading ? <span className="loading loading-spinner"></span> : "SignUp"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
