import { create } from "zustand";
import {
  deleteSelfAssessment,
  getSelfAssessments,
  getSelfAssessment,
  saveSelfAssessment,
  updateSelfAssessment
} from "@/app/controllers/rc_selfassessments/controller";
import { SelfAssessments } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface SelfAssessmentState {
  selfAssessments: SelfAssessments[];
  currentSelfAssessment: SelfAssessments | null;
  getSelfAssessment: (id: number) => Promise<SelfAssessments | ErrorResponse>;
  deleteSelfAssessment: (id: number) => Promise<SelfAssessments | ErrorResponse>;
  saveSelfAssessment: (selfAssessment: SelfAssessments) => Promise<SelfAssessments | ErrorResponse>;
  getSelfAssessments: () => Promise<SelfAssessments[] | ErrorResponse>;
  updateSelfAssessment: (selfAssessment: SelfAssessments) => Promise<SelfAssessments | ErrorResponse>;
}

export const useSelfAssessmentsStore = create<SelfAssessmentState>((set) => ({
  selfAssessments: [],
  currentSelfAssessment: null,
  getSelfAssessment: async (id: number) => {
    const selfAssessment = await getSelfAssessment(id);
    if ("error" in selfAssessment) {
      return selfAssessment;
    }
    set((state) => ({ ...state, selfAssessments: [selfAssessment] }));
    return selfAssessment;
  },
  deleteSelfAssessment: async (id: number) => {
    const selfAssessment = await deleteSelfAssessment(id);
    if ("error" in selfAssessment) {
      return selfAssessment;
    }
    set((state) => ({
      ...state,
      selfAssessments: state.selfAssessments.filter((sa) => sa.SAT_Id !== id),
    }));
    return selfAssessment;
  },
  saveSelfAssessment: async (selfAssessment: SelfAssessments) => {
    const newSelfAssessment = await saveSelfAssessment(selfAssessment);
    if ("error" in newSelfAssessment) {
      return newSelfAssessment;
    }
    set((state) => ({ ...state, selfAssessments: [...state.selfAssessments, newSelfAssessment], currentSelfAssessment: newSelfAssessment }));
    return newSelfAssessment;
  },
  getSelfAssessments: async () => {
    const selfAssessments = await getSelfAssessments();
    if ("error" in selfAssessments) {
      return selfAssessments;
    }
    set((state) => ({ ...state, selfAssessments }));
    return selfAssessments;
  },
  updateSelfAssessment: async (selfAssessment: SelfAssessments) => {
    const updatedSelfAssessment = await updateSelfAssessment(selfAssessment);
    if ("error" in updatedSelfAssessment) {
      return updatedSelfAssessment;
    }
    set((state) => ({
      ...state,
      selfAssessments: state.selfAssessments.map((sa) =>
        sa.SAT_Id === selfAssessment.SAT_Id ? updatedSelfAssessment : sa
      ),
    }));
    return updatedSelfAssessment;
  },
}));
