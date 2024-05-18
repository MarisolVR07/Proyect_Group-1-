import React from "react";
import LoginForm from "./LoginForm";
import UserIcon from "../svg/UserIcon";

const Login = () => (
  <div className="w-full h-full flex flex-col items-center justify-center min-h-screen">
    <div className="form-control p-6 w-full items-center justify-center bg-gray-700 rounded-2xl font-poppins font-semibold max-w-md drop-shadow-xl text-center">
      <UserIcon />
      <LoginForm />
    </div>
  </div>
);

export default Login;
