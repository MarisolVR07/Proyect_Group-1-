import { persist } from "zustand/middleware";
import { create } from "zustand";
import { User } from "@/app/types/entities";

type AuthStore = {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
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
