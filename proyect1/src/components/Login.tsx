import React from "react";
import LoginForm from './LoginForm'; 
import UserIcon from './UserIcon';

const Login = () => (
  <div className="form-control p-6 w-screen items-center justify-center bg-slate-700 rounded-2xl font-poppins font-semibold max-w-md drop-shadow-xl text-center">
    <UserIcon />
    <LoginForm />
  </div>
);

export default Login;
