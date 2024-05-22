import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../app/msalConfig";
import Button from "../general/PrimaryButton";
import { WindowsOutlined } from "@ant-design/icons";
import { User } from "@/app/types/entities";
import React, { useState, useEffect } from "react";
import { AccountInfo } from "@azure/msal-browser";
import { useUserStore } from "@/store/userStore";
import { ErrorResponse } from "@/app/types/api";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";

const LoginButton = () => {
  const [error, setError] = useState<ErrorResponse>();
  const { getUser, saveUser } = useUserStore();
  const [user, setUser] = useState<User | ErrorResponse>();
  const { setCurrentUser } = useAuthStore();
  const { instance } = useMsal();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const userInfo = loginResponse.account;
      const { name, username } = userInfo;
      console.log(userInfo);
      if (typeof userInfo !== "object") {
        throw new Error("Información del usuario inválida");
      }

      const secretKey = "EmKKi2PNCmdn1qhvRsBDolXubPNcK7dl";
      const payload = { name, username };
      const token = jwt.sign(payload, secretKey);

      console.log(token);

      await getUserInfo(userInfo);
      Cookies.set("auth_token", token, {
        secure: true,
        sameSite: "strict",
        expiresIn: "1h",
      });
      router.push("views/dashboard");
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  const getUserInfo = async (user: AccountInfo) => {
    try {
      const userData = await getUser(user.username);
      if ("error" in userData) {
        createUser(user.username, user.name || "");
      } else {
        setCurrentUser(userData);
      }
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
      if ("error" in response) {
        console.error("Error creating user:", response.error);
      } else {
        setCurrentUser(response);
      }
    } catch (error) {
      console.error("Error saving the user:", error);
    }
  };

  useEffect(() => {
    if (user) {
    }
  }, [user]);

  return (
    <Button onClick={handleLogin} className="rounded-md w-44">
      <WindowsOutlined /> SIGN IN
    </Button>
  );
};

export default LoginButton;
