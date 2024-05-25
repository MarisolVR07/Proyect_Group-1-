import { persist } from "zustand/middleware";
import { create } from "zustand";
import { User , Unit, Parameter} from "@/app/types/entities";

type AuthStore = {
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

export const useAuthStore = create<AuthStore>()(persist(
  (set) => ({
    currentUser: null,
    setCurrentUser: (user) => set({ currentUser: user }),
  }),
  {
    name: "auth-storage",
    getStorage: () => localStorage,
  }
));

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

