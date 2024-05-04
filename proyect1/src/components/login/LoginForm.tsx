"use client"

import React from "react";

import InputField from '../general/InputField';
import Button from '../general/PrimaryButton';
import LoginButton from "./LoginButton";


const LoginForm = () => (
  <div>
    <h1 className="mt-3 text-3xl text-white">LOGIN</h1>
    <div className="mt-7 mb-16">
      <LoginButton/>
    </div>

  </div>
);

export default LoginForm;