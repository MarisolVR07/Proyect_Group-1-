import React from "react";
import LoginForm from "./LoginForm";
import UserIcon from "../svg/UserIcon";

const Login = () => (
  <header className="w-full bg-transparent text-white py-3 top-0 z-10">
    <div className="container mx-auto flex justify-between items-center">
      <div className="items-center">
        <div className="text-4xl font-bold text-color print-only">ISC</div>
        <div className="text-xs text-color print-only ">
          Internal System Control
        </div>
      </div>
    </div>
    <div className="w-full h-full flex flex-col items-center justify-center min-h-screen">
      <div className="form-control p-6 w-full items-center justify-center bg-gray-700 rounded-2xl font-poppins font-semibold max-w-md drop-shadow-xl text-center">
        <UserIcon />
        <LoginForm />
      </div>
    </div>
  </header>
);

export default Login;