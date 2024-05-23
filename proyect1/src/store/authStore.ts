import { persist } from "zustand/middleware";
import { create } from "zustand";
import { User , Unit} from "@/app/types/entities";

type AuthStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
}

type UnitStore = {
  currentUnit: Unit | null;
  setCurrentUnit: (unit: Unit | null) => void;
}

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

