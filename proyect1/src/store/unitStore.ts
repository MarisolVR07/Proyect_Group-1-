import { create } from "zustand";
import {
    deleteUnit,
    getUnit,
    saveUnit,
    getUnits,
    updateUnit,
} from "@/app/controllers/rc_unit/controller";
import { Unit } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface UnitState {
    units: Unit[];
    currentUnit: Unit | null;
    getUnit: (id: number) => Promise<Unit | ErrorResponse>;
    deleteUnit: (
      id: number
    ) => Promise<Unit | ErrorResponse>;
    saveUnit: (
        unit: Unit
    ) => Promise<Unit | ErrorResponse>;
    getUnits: () => Promise<Unit[] | ErrorResponse>;
    updateUnit: (
        unit : Unit
    ) => Promise<Unit | ErrorResponse>;
  }

  export const useUnitStore = create<UnitState>((set) => ({
    units: [],
    currentUnit: null,
    getUnit: async (id: number) => {
      const unit = await getUnit(id);
      if ("error" in unit) {
        return unit;
      }
      set((state) => ({ ...state, units: [unit] }));
      return unit;
    },
    deleteUnit: async (id: number) => {
      const unit = await deleteUnit(id);
      if ("error" in unit) {
        return unit;
      }
      set((state) => ({
        ...state,
        departments: state.units.filter((un) => un.UND_Id !== id),
      }));
      return unit;
    },
    saveUnit: async (unit: Unit) => {
      const newUnit = await saveUnit(unit);
      if ("error" in newUnit) {
        return newUnit;
      }
      set((state) => ({
        ...state,
        units: [...state.units, newUnit],
        currentUnit: newUnit,
      }));
      return newUnit;
    },
    getUnits: async () => {
      const units = await getUnits();
      if ("error" in units) {
        return units;
      }
      set((state) => ({ ...state, units }));
      return units;
    },
    updateUnit: async (unit: Unit) => {
      const updatedUnit = await updateUnit(unit);
      if ("error" in updatedUnit) {
        return updatedUnit;
      }
      set((state) => ({
        ...state,
        units: state.units.map((un) =>
            un.UND_Id === unit.UND_Id? updatedUnit  : un
        ),
      }));
      return updatedUnit;
    },
  }));
  
