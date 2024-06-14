import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../app/msalConfig";
import Button from "../general/PrimaryButton";
import { WindowsOutlined } from "@ant-design/icons";
import { User } from "@/app/types/entities";
import React, { useState } from "react";
import { AccountInfo } from "@azure/msal-browser";
import { useUserStore } from "@/store/userStore";
import { ErrorResponse } from "@/app/types/api";
import { useUserContextStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import jwt from "jsonwebtoken";
import { DebugMessage } from "@/app/types/debugData";
import toast from "react-hot-toast";
interface LoginButtonProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const LoginButton: React.FC<LoginButtonProps> = ({ onDebugMessage }) => {
  const { getUser, saveUser } = useUserStore();
  const [user, setUser] = useState<User | undefined>(undefined);
  const { setCurrentUser, currentUser } = useUserContextStore();
  const { instance } = useMsal();
  const router = useRouter();

  const handleLogin = async () => {
    onDebugMessage({
      content: `Login button clicked(handleLogin)`,
      type: "Info",
    });
    try {
      const loginResponse = await instance.loginPopup(loginRequest);
      const userInfo = loginResponse.account;
      const { name, username } = userInfo;

      if (typeof userInfo !== "object") {
        onDebugMessage({
          content: `Invalid user info(handleLogin)->${userInfo}`,
          type: "Error",
        });
        throw new Error("Invalid user info`");
      }

      const secretKey = "EmKKi2PNCmdn1qhvRsBDolXubPNcK7dl";
      const payload = { name, username };
      const token = jwt.sign(payload, secretKey);

      const user = await getUserInfo(userInfo);

      if (user && user.USR_Role !== "none" && user.USR_Status === "a") {
        Cookies.set("auth_token", token, {
          secure: true,
          sameSite: "strict",
          expires: 1 / 24,
        });
        router.push("views/dashboard");
        onDebugMessage({
          content: `User accepted(handleLogin)->${user}`,
          type: "Success",
        });
      } else {
        onDebugMessage({
          content: `User not accepted(handleLogin)->${user}`,
          type: "Error",
        });
        toast.success("Your account has been signed up successfully, please wait to be accepted")
      }
    } catch (error) {
      onDebugMessage({
        content: `Error logging in(handleLogin)->${error}`,
        type: "Error",
      });
    }
  };

  const getUserInfo = async (userInfo: AccountInfo) => {
    onDebugMessage({
      content: `Getting user info(getUserInfo)`,
      type: "Info",
    });
    try {
      const userData = await getUser(userInfo.username);
      if ("error" in userData) {
        onDebugMessage({
          content: `Error getting user info(getUserInfo)->${userData.error}`,
          type: "Error",
        });
        const newUser = await createUser(
          userInfo.username,
          userInfo.name || ""
        );
        setUser(newUser);
        setCurrentUser(newUser);
        return newUser;
      } else {
        onDebugMessage({
          content: `User info gotten(getUserInfo)->${userData}`,
          type: "Success",
        });
        setUser(userData as User);
        setCurrentUser(userData);
        return userData;
      }
    } catch (error) {
      onDebugMessage({
        content: `Error getting user info(getUserInfo)->${error}`,
        type: "Error",
      });
      return undefined;
    }
  };

  const createUser = async (username: string, name: string): Promise<User> => {
    onDebugMessage({
      content: `Creating user(createUser)`,
      type: "Info",
    });
    try {
      const userToCreate: User = {
        USR_Email: username,
        USR_FullName: name,
        USR_Role: "none",
        USR_Department: null,
      };
      const response = await saveUser(userToCreate);
      if ("error" in response) {
        onDebugMessage({
          content: `Error creating user(createUser)->${response.error}`,
          type: "Error",
        });
        throw new Error(response.error);
      } else {
        onDebugMessage({
          content: `User created(createUser)->${response}`,
          type: "Success",
        });
        return response as User;
      }
    } catch (error) {
      onDebugMessage({
        content: `Error creating user(createUser)->${error}`,
        type: "Error",
      });
      throw error;
    }
  };

  return (
    <Button onClick={handleLogin} className="rounded-md w-44 h-8 text-xl">
      <WindowsOutlined className="me-1"/> SIGN IN
    </Button>
  );
};

export default LoginButton;
