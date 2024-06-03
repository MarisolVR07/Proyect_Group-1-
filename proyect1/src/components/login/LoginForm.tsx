
import React from "react";
import LoginButton from "./LoginButton";
import { DebugMessage } from "@/app/types/debugData";

interface LoginFormProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onDebugMessage }) => (
  <div>
    <h1 className="mt-3 text-3xl text-white">LOGIN</h1>
    <div className="mt-7 mb-16">
      <LoginButton onDebugMessage={onDebugMessage} />
    </div>
  </div>
);

export default LoginForm;
