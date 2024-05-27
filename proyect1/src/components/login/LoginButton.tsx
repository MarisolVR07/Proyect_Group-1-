import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../app/msalConfig";
import Button from "../general/PrimaryButton";
import { WindowsOutlined } from "@ant-design/icons";
import { User } from "@/app/types/entities";
import React, { useState, useEffect } from "react";
import { AccountInfo } from "@azure/msal-browser";
import { useUserStore } from "@/store/userStore";
import { ErrorResponse } from "@/app/types/api";
import { useUserContextStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const LoginButton = () => {
  const [error, setError] = useState<ErrorResponse>();
  const { getUser, saveUser } = useUserStore();
  const [user, setUser] = useState<User | undefined>(undefined);
  const { setCurrentUser, currentUser } = useUserContextStore();
  const { instance } = useMsal();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const userInfo = loginResponse.account;
      const { name, username } = userInfo;

      if (typeof userInfo !== "object") {
        throw new Error("Información del usuario inválida");
      }

      const secretKey = "EmKKi2PNCmdn1qhvRsBDolXubPNcK7dl";
      const payload = { name, username };
      const token = jwt.sign(payload, secretKey);

      const user = await getUserInfo(userInfo);

      if (user && user.USR_Role !== "none") {
        Cookies.set("auth_token", token, {
          secure: true,
          sameSite: "strict",
          expires: 1 / 24, 
        });
        router.push("views/dashboard");
      } else {
        alert(
          "Your account has been signed up successfully, please wait to be accepted"
        );
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  const getUserInfo = async (userInfo: AccountInfo) => {
    try {
      const userData = await getUser(userInfo.username);
      if ("error" in userData) {
        const newUser = await createUser(userInfo.username, userInfo.name || "");
        setUser(newUser);
        setCurrentUser(newUser);
        return newUser;
      } else {
        setUser(userData as User);
        setCurrentUser(userData);
        return userData;
      }
    } catch (error) {
      console.error(error);
      return undefined;
    }
  };

  const createUser = async (username: string, name: string): Promise<User> => {
    try {
      const userToCreate: User = {
        USR_Email: username,
        USR_FullName: name,
        USR_Role: "none",
        USR_Department: null,
      };
      const response = await saveUser(userToCreate);
      if ("error" in response) {
        console.error("Error creating user:", response.error);
        throw new Error(response.error);
      } else {
        return response as User;
      }
    } catch (error) {
      console.error("Error saving the user:", error);
      throw error;
    }
  };

  return (
    <Button onClick={handleLogin} className="rounded-md w-44">
      <WindowsOutlined /> SIGN IN
    </Button>
  );
};

export default LoginButton;
