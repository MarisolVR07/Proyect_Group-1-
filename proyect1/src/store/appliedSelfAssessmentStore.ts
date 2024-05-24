import { create } from "zustand";
import {
    getAppliedSelfassessment,
    deleteAppliedSelfassessment,
    saveAppliedSelfassessment,
    getAppliedSelfassessments,
    updateAppliedSelfassessment,
} from "@/app/controllers/rc_appliedselfassessment/controller";
import { AppliedSelfAssessment } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface AppliedSelfAssessmentState {
    appliedselfassessments: AppliedSelfAssessment[];
    currentAppliedSelfAssessment: AppliedSelfAssessment | null;
    getAppliedSelfAssessment: (id: number) => Promise<AppliedSelfAssessment | ErrorResponse>;
    deleteAppliedSelfAssessment: (
      id: number
    ) => Promise<AppliedSelfAssessment | ErrorResponse>;
    saveAppliedSelfAssessment: (
        appliedselfassessment: AppliedSelfAssessment
    ) => Promise<AppliedSelfAssessment | ErrorResponse>;
    getAppliedSelfAssessments: () => Promise<AppliedSelfAssessment[] | ErrorResponse>;
    updateAppliedSelfAssessment: (
        appliedselfassessment: AppliedSelfAssessment
    ) => Promise<AppliedSelfAssessment | ErrorResponse>;
}

export const useAppliedSelfAssessmentsStore = create<AppliedSelfAssessmentState>((set) => ({
    appliedselfassessments: [],
    currentAppliedSelfAssessment: null,
    getAppliedSelfAssessment: async (id: number) => {
      const appliedselfassessment = await getAppliedSelfassessment(id);
      if ("error" in appliedselfassessment) {
        return appliedselfassessment;
      }
      set((state) => ({ ...state, appliedselfassessments: [appliedselfassessment] }));
      return appliedselfassessment;
    },
    deleteAppliedSelfAssessment: async (id: number) => {
      const result = await deleteAppliedSelfassessment(id);
      if ("error" in result) {
        return result;
      }
      set((state) => ({
        ...state,
        appliedselfassessments: state.appliedselfassessments.filter((dep) => dep.ASA_Id !== id),
      }));
      return result;
    },
    saveAppliedSelfAssessment: async (appliedselfassessment: AppliedSelfAssessment) => {
      const newAppliedSelfAssessment = await saveAppliedSelfassessment(appliedselfassessment);
      if ("error" in newAppliedSelfAssessment) {
        return newAppliedSelfAssessment;
      }
      set((state) => ({
        ...state,
        appliedselfassessments: [...state.appliedselfassessments, newAppliedSelfAssessment],
        currentAppliedSelfAssessment: newAppliedSelfAssessment,
      }));
      return newAppliedSelfAssessment;
    },
    getAppliedSelfAssessments: async () => {
      const appliedselfassessments = await getAppliedSelfassessments();
      if ("error" in appliedselfassessments) {
        return appliedselfassessments;
      }
      set((state) => ({ ...state, appliedselfassessments }));
      return appliedselfassessments;
    },
    updateAppliedSelfAssessment: async (appliedselfassessment: AppliedSelfAssessment) => {
      const updatedAppliedSelfAssessment = await updateAppliedSelfassessment(appliedselfassessment);
      if ("error" in updatedAppliedSelfAssessment) {
        return updatedAppliedSelfAssessment;
      }
      set((state) => ({
        ...state,
        appliedselfassessments: state.appliedselfassessments.map((dep) =>
            dep.ASA_Id === appliedselfassessment.ASA_Id ? updatedAppliedSelfAssessment : dep
        ),
      }));
      return updatedAppliedSelfAssessment;
    },
}));