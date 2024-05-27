"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import UserIcon from "../svg/UserIcon";
import { useParameterStore } from "@/store/parameterStore";
import { useParametersContextStore } from "@/store/authStore";
import { Parameter } from "@/app/types/entities";
import { Container } from "postcss";
const Login = () => {
  const { getParameter } = useParameterStore();
  const { setCurrentParameters } = useParametersContextStore();
  const [parameter, setParameter] = useState<Parameter | null>(null);

  const fetchParameters = async () => {
    try {
      const params = await getParameter(1);
      if (!("error" in params)) {
        setParameter(params);
        setCurrentParameters(params);
      }
    } catch (error) {
      console.error("Failed to fetch parameters:", error);
    }
  };

  useEffect(() => {
    fetchParameters();
  }, []);

  return (
    <>
      <header className="w-full bg-transparent text-white py-3 top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="items-center">
            <div className="text-4xl font-bold text-color print-only">ISC</div>
            <div className="text-xs text-color print-only ">
              Internal System Control
            </div>
          </div>
          <div className="text-4xl font-bold text-color print-only">
            {parameter?.PRM_Institution}
          </div>
        </div>
      </header>
      <div className="w-full h-full flex flex-col items-center justify-center mt-20">
        <div className="form-control p-6 w-full items-center justify-center bg-gray-700 rounded-2xl font-poppins font-semibold max-w-md drop-shadow-xl text-center">
          <UserIcon />
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
