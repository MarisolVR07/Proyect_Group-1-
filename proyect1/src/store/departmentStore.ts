import { create } from "zustand";
import {
    deleteDepartment,
    getDepartment,
    saveDepartment,
    getDepartments,
    updateDepartment,
    getDepartmentsByName,
    getDepartmentsPerPage
} from "@/app/controllers/rc_departments/controller";
import { Department } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface DepartmentState {
    departments: Department[];
    currentDepartment: Department | null;
    getDepartment: (id: number) => Promise<Department | ErrorResponse>;
    deleteDepartment: (
      id: number
    ) => Promise<Department | ErrorResponse>;
    saveDepartment: (
        department: Department
    ) => Promise<Department | ErrorResponse>;
    getDepartments: () => Promise<Department[] | ErrorResponse>;
    updateDepartment: (
        department: Department
    ) => Promise<Department | ErrorResponse>;
    getDepartmentsByName: (name: string, page: number) => Promise<Department[]  | ErrorResponse>;
    getDepartmentsPerPage: (page: number) => Promise<Department[] | ErrorResponse>;
  }

  
export const useDepartmentsStore = create<DepartmentState>((set) => ({
    departments: [],
    currentDepartment: null,
    getDepartment: async (id: number) => {
      const department = await getDepartment(id);
      if ("error" in department) {
        return department;
      }
      set((state) => ({ ...state, departments: [department] }));
      return department;
    },
    deleteDepartment: async (id: number) => {
      const department = await deleteDepartment(id);
      if ("error" in department) {
        return department;
      }
      set((state) => ({
        ...state,
        departments: state.departments.filter((dep) => dep.DPT_Id !== id),
      }));
      return department;
    },
    saveDepartment: async (department: Department) => {
      const newDepartment = await saveDepartment(department);
      if ("error" in newDepartment) {
        return newDepartment;
      }
      set((state) => ({
        ...state,
        departments: [...state.departments, newDepartment],
        currentDepartment: newDepartment,
      }));
      return newDepartment;
    },
    getDepartments: async () => {
      const departments = await getDepartments();
      if ("error" in departments) {
        return departments;
      }
      set((state) => ({ ...state, departments }));
      return departments;
    },
    updateDepartment: async (department: Department) => {
      const updatedDepartment = await updateDepartment(department);
      if ("error" in updatedDepartment) {
        return updatedDepartment;
      }
      set((state) => ({
        ...state,
        departments: state.departments.map((dep) =>
            dep.DPT_Id === department.DPT_Id? updatedDepartment : dep
        ),
      }));
      return updatedDepartment;
    },
    getDepartmentsByName: async (name: string, page: number) => {
      const departments = await getDepartmentsByName(name,page);
      if ("error" in departments) {
        return departments;
      }
      set((state) => ({ ...state, departments }));
      return departments;
    },
    getDepartmentsPerPage: async (page:number) => {
      const departments = await getDepartmentsPerPage(page);
      if ("error" in departments) {
        return departments;
      }
      set((state) => ({ ...state, departments }));
      return departments;
    }
  }));
  