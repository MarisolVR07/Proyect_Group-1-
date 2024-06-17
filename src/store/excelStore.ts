import { create } from "zustand";
import { exportAppliedSelfAssessment } from "@/app/controllers/excel/controller";
import { ErrorResponse } from "@/app/types/api";

interface ExportState {
  exportAppliedSelfAssessment: (id: number) => Promise<ErrorResponse | void>;
}

export const useExportStore = create<ExportState>((set) => ({
  exportAppliedSelfAssessment: async (id: number) => {
    try {
      await exportAppliedSelfAssessment(id);
      return;
    } catch (error: any) {
      return { error: error.message } as ErrorResponse;
    }
  },
}));
