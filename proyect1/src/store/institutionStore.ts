import { create } from "zustand";
import {
    deleteInstitution,
    getInstitution,
  saveInstitution,
  updateInstitution,
} from "@/app/controllers/rc_institutions/controller";
import { Institution } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";


interface InstitutionState {
    institutions: Institution[];
    currentInstitution: Institution | null;
    getInstitution: (id: number) => Promise<Institution | ErrorResponse>;
    deleteInstitution: (
      id: number
    ) => Promise<Institution | ErrorResponse>;
    saveInstitution: (
        institution: Institution
    ) => Promise<Institution | ErrorResponse>;
    updateInstitution: (
        institution: Institution
    ) => Promise<Institution | ErrorResponse>;
  }
  export const useInstitutionStore = create<InstitutionState>((set) => ({
    institutions: [],
    currentInstitution: null,
    getInstitution: async (id: number) => {
        const institution = await getInstitution(id);
        if ("error" in institution) {
            return institution;
        }
        set((state) => {
            const existingIndex = state.institutions.findIndex(ins => ins.INS_Id === id);
            const updatedInstitutions = [...state.institutions];
            if (existingIndex !== -1) {
                updatedInstitutions[existingIndex] = institution;
            } else {
                updatedInstitutions.push(institution);
            }
            return { ...state, institutions: updatedInstitutions };
        });
        return institution;
    },
    deleteInstitution: async (id: number) => {
        const institution = await deleteInstitution(id);
        if ("error" in institution) {
            return institution;
        }
        set((state) => ({
            ...state,
            institutions: state.institutions.filter(ins => ins.INS_Id !== id),
        }));
        return institution;
    },
    saveInstitution: async (institution: Institution) => {
        const newInstitution = await saveInstitution(institution);
        if ("error" in newInstitution) {
            return newInstitution;
        }
        set((state) => ({
            ...state,
            institutions: [...state.institutions, newInstitution],
            currentInstitution: newInstitution,
        }));
        return newInstitution;
    },
    updateInstitution: async (institution: Institution) => {
        const updatedInstitution = await updateInstitution(institution);
        if ("error" in updatedInstitution) {
            return updatedInstitution;
        }
        set((state) => ({
            ...state,
            institutions: state.institutions.map(ins =>
                ins.INS_Id === institution.INS_Id ? updatedInstitution : ins
            ),
        }));
        return updatedInstitution;
    },
}));
