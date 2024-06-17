import { persist } from "zustand/middleware";
import { create } from "zustand";
import { User, Unit, Parameter, SelfAssessments } from "@/app/types/entities";

type UserStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

type UnitStore = {
  currentUnit: Unit | null;
  setCurrentUnit: (unit: Unit | null) => void;
}

type ParametersStore = {
  currentParameters: Parameter | null;
  setCurrentParameters: (parameter: Parameter | null) => void;
}

type SelfAssessmentStore = {
  currentSelfAssessment: SelfAssessments | null;
  setCurrentSelfAssessment: (
    selfAssessment: SelfAssessments | null
  ) => void;
};

export const useParametersContextStore = create<ParametersStore>()(persist(
  (set) => ({
    currentParameters: null,
    setCurrentParameters: (parameter) => set({ currentParameters: parameter }),
  }),
  {
    name: "parameter-storage",
    getStorage: () => localStorage,
  }
));

export const useUserContextStore = create<UserStore>()(
  persist(
    (set) => ({
      currentUser: null,
      setCurrentUser: (user) => set({ currentUser: user }),
    }),
    {
      name: "user-storage",
      getStorage: () => localStorage,
    }
  )
);

export const useUnitContextStore = create<UnitStore>()(persist(
  (set) => ({
    currentUnit: null,
    setCurrentUnit: (unit) => set({ currentUnit: unit }),
  }),
  {
    name: "unit-storage",
    getStorage: () => localStorage,
  }
));

export const useSelfAssessmentContextStore = create<SelfAssessmentStore>()(
  persist(
    (set) => ({
      currentSelfAssessment: null,
      setCurrentSelfAssessment: (selfAssessment) =>
        set({ currentSelfAssessment: selfAssessment }),
    }),
    {
      name: "self-assessment-storage",
      getStorage: () => localStorage,
    }
  )
);

