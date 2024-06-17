"use client";
import React, { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import UserIcon from "../svg/UserIcon";
import { useParameterStore } from "@/store/parameterStore";
import {
  useParametersContextStore,
  useSelfAssessmentContextStore,
} from "@/store/authStore";
import { Parameter } from "@/app/types/entities";
import { useSelfAssessmentsStore } from "@/store/selfAssessmentStore";
import { DebugMessage } from "@/app/types/debugData";


interface LoginProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const Login: React.FC<LoginProps> = ({ onDebugMessage }) => {
  const { getParameter } = useParameterStore();
  const { setCurrentParameters } = useParametersContextStore();
  const { setCurrentSelfAssessment } = useSelfAssessmentContextStore();
  const [parameter, setParameter] = useState<Parameter | null>(null);
  const selfAssessmentStore = useSelfAssessmentsStore();

  const loadParameters = async () => {
    onDebugMessage({
      content: `Loading parameters (loadParameters)`,
      type: "Info",
    });
    try {
      const params = await getParameter(1);
      if ("error" in params) {
        onDebugMessage({
          content: `Error loading parameters(loadParameters)->${params.error}`,
          type: "Error",
        });
        return;
      }
      setParameter(params);
      setCurrentParameters(params);
      if (params.PRM_CurrentSelfAssessment) {
        loadSelfAssessmentData(params.PRM_CurrentSelfAssessment);
      }
      onDebugMessage({
        content: `Parameter loading successful (loadParameters)`,
        type: "Success",
      });
    } catch (error) {
      onDebugMessage({
        content: `Error loading parameters(loadParameters)->${error}`,
        type: "Error",
      });
    }
  };

  const loadSelfAssessmentData = async (currentSelfAssessment: number) => {
    onDebugMessage({
      content: `Loading self-assessment data (loadSelfAssessmentData)`,
      type: "Info",
    });
    try {
      const selfAssessment =
        await selfAssessmentStore.getCompleteSelfAssessment(
          currentSelfAssessment
        );
      if ("error" in selfAssessment) {
        onDebugMessage({
          content: `Error loading self-assessment data(loadSelfAssessmentData)->${selfAssessment.error}`,
          type: "Error",
        });
        return;
      }
      setCurrentSelfAssessment(selfAssessment);
      onDebugMessage({
        content: `Self-assessment data loading successful (loadSelfAssessmentData)`,
        type: "Success",
      });
    } catch (error) {
      onDebugMessage({
        content: `Error loading self-assessment data(loadSelfAssessmentData)->${error}`,
        type: "Error",
      });
    }
  };

  useEffect(() => {
    loadParameters();
  }, []);

  return (
    <>
      <header className="w-full bg-transparent text-white sm:py-3 py-1 px-2 top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="items-center">
            <div className="sm:text-4xl text-2xl font-bold text-color print-only">ISC</div>
            <div className="text-xs text-color print-only ">
              Internal System Control
            </div>
          </div>
          <div className="sm:text-4xl text-base font-bold text-color print-only">
            {parameter?.PRM_Institution}
          </div>
        </div>
      </header>
      <div className="w-full h-full flex flex-col items-center justify-center my-auto">
        <div className="form-control p-6 w-full items-center justify-center bg-gray-700 rounded-2xl font-poppins font-semibold max-w-md drop-shadow-xl text-center">
          <UserIcon />
          <LoginForm onDebugMessage={onDebugMessage} />
        </div>
      </div>
    </>
  );
};

export default Login;
