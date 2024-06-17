import { create } from "zustand";
import {
  getParameter,
  deleteParameter,
  saveParameter,
  getParameters,
  updateParameter,
  getParametersByName,
} from "@/app/controllers/rc_parameters/controller";
import { Parameter } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface ParameterState {
    parameters: Parameter[];
    currentUser: Parameter | null;
    getParameter: (id?: number) => Promise<Parameter | ErrorResponse>;
    deleteParameter: (id: number) => Promise<Parameter | ErrorResponse>;
    saveParameter: (parameter: Parameter) => Promise<Parameter | ErrorResponse>;
    getParameters: () => Promise<Parameter[] | ErrorResponse>;
    updateParameter: (parameter: Parameter) => Promise<Parameter | ErrorResponse>;
    getParametersByName: (name: string) => Promise<Parameter[] | ErrorResponse>;
  }
  
  export const useParameterStore = create<ParameterState>((set) => ({
    parameters: [],
    currentUser: null,
getParameter: async (id: number = 8) => {
  const parameter = await getParameter(id);
  if ("error" in parameter) {
    return parameter;
  }
  set((state) => ({
    ...state,
    parameters: [...state.parameters, parameter],
    currentUser: parameter,
  }));
  return parameter;
},
    deleteParameter: async (id: number) => {
      const parameter = await deleteParameter(id);
      if ("error" in parameter) {
        return parameter;
      }
      set((state) => ({
        ...state,
        parameters: state.parameters.filter((u) => u.PRM_Id !== id),
      }));
      return parameter;
    },
    saveParameter: async (parameter: Parameter) => {
      const newParameter = await saveParameter(parameter);
      if ("error" in newParameter) {
        return newParameter;
      }
      set((state) => ({
        ...state,
        parameters: [...state.parameters, newParameter],
        currentUser: newParameter,
      }));
      return newParameter;
    },
    getParameters: async () => {
      const parameters = await getParameters();
      if ("error" in parameters) {
        return parameters;
      }
      set((state) => ({ ...state, parameters }));
      return parameters;
    },
    updateParameter: async (parameter: Parameter) => {
      const updatedParameter = await updateParameter(parameter);
      if ("error" in updatedParameter) {
        return updatedParameter;
      }
      set((state) => ({
        ...state,
        parameters: state.parameters.map((u) =>
          u.PRM_Id === parameter.PRM_Id ? updatedParameter : u
        ),
      }));
      return updatedParameter;
    },
    getParametersByName: async (name: string) => {
      const parameters = await getParametersByName(name);
      if ("error" in parameters) {
        return parameters;
      }
      set((state) => ({ ...state, parameters }));
      return parameters;
    },
  }));
  
