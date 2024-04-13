import React from "react";

import InputField from './InputField'; 
import Button from './Button';


const LoginForm = () => (
    <div>
      <h1 className="mt-3 text-3xl text-white">LOGIN</h1>
      <InputField label="Email:" type="email" placeholder="example@example.com" />
      <InputField label="Password:" type="password" placeholder="your password" />
      <Button>SIGN IN</Button>
    </div>
  );
  
  export default LoginForm;