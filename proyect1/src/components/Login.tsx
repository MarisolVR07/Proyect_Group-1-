import React from "react";

const Login = () => {
  return (
    <div className="form-control p-6 w-full items-center justify-center bg-slate-700 rounded-2xl font-poppins font-semibold max-w-md drop-shadow-xl text-center">
      <div>
        <svg
          className="h-32 w-32 text-black bg-slate-100 rounded-full shadow-xl"
          fill="none"
          viewBox="0 0 24 26"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </div>
      <h1 className="mt-3 text-3xl text-white">LOGIN</h1>
      <div className="mb-6 w-full">
        <label className="label">
          <span className="label-text text-white">Email:</span>
        </label>
        <input
          type="email"
          placeholder="example@example.com"
          className="input bg-white text-slate-700 input-bordered w-full h-8"
        />
      </div>
      <div className="w-full">
        <label className="label">
          <span className="label-text text-white">Password:</span>
        </label>
        <input
          type="password"
          placeholder="your password"
          className="input bg-white text-slate-700 input-bordered w-full h-8"
        />
      </div>
      <button className=" text-white bg-violet-800 hover:bg-violet-700 rounded-md h-8 w-44 mt-7 mb-16">
        SING IN
      </button>
    </div >
  );
};

export default Login;