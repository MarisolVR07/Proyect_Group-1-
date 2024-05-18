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

  
