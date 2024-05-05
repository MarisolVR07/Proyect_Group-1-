import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../app/msalConfig";
import Button from "../general/PrimaryButton";
import { WindowsOutlined } from "@ant-design/icons";
import { User } from "@/app/types/entities";
import React, { useState, useEffect } from "react";
import { AccountInfo } from "@azure/msal-browser";
import { useUserStore } from "@/store/userStore";
import { ErrorResponse } from "@/app/types/api";

const LoginButton = () => {
  const [error, setError] = useState<ErrorResponse>();
  const { getUser, saveUser } = useUserStore();
  const [user, setUser] = useState<User | ErrorResponse>();
  const { instance } = useMsal();
  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const userInfo = loginResponse.account;
      await getUserInfo(userInfo);
      window.location.href="views/dashboard";
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const getUserInfo = async (user: AccountInfo) => {
    try {
      const userData = await getUser(user.username);
      if ("error" in userData) createUser(user.username, user.name || "");
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async (username: string, name: string) => {
    try {
      const userToCreate: User = {
        USR_Email: username,
        USR_FullName: name,
        USR_Role: "none",
        USR_Department: null,
      };
      const response = await saveUser(userToCreate);
      if (response) {
        console.log("User saved successfully");
      } else {
        console.error("Error saving the user");
      }
    } catch (error) {
      console.error("Error saving the user:", error);
    }
  };

  useEffect(() => {
    if (user) {
      //Here you can use the user information for something else 
    }
  }, [user]);

  return (
    <Button onClick={handleLogin} className="rounded-md w-44">
      <WindowsOutlined /> SIGN IN
    </Button>
  );
};

export default LoginButton;