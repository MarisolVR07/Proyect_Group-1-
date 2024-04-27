import React from "react";

import InputField from './InputField';
import Button from './PrimaryButton';


const LoginForm = () => (
  <div>
    <h1 className="mt-3 text-3xl text-white">LOGIN</h1>
    <InputField label="Email:" type="email" placeholder="example@example.com" />
    <InputField label="Password:" type="password" placeholder="your password" />
    <div className="mt-7 mb-16">
      <Button className="rounded-md">SIGN IN</Button>
    </div>

  </div>
);

export default LoginForm;