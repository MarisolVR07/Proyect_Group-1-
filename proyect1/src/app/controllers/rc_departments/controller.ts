import { Department } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";
const currentUrl = window.location.href;
const API_URL =
  currentUrl.split("/")[0] +
  "//" +
  currentUrl.split("//")[1].split("/")[0] +
  "/api/v5/";


  export async function getDepartment(
    id: number
  ): Promise<Department | ErrorResponse> {
    try {
      const res: Response = await fetch(API_URL + `rc_departments/${id}`);
      const department: Department | ErrorResponse = await res.json();
  
      return department;
    } catch (error: any) {
      return error;
    }
  }

  export async function deleteDepartment(
    id: number
  ): Promise<Department | ErrorResponse> {
    try {
      const res: Response = await fetch(API_URL + `rc_departments/${id}`, {
        method: "DELETE",
      });
      const department: Department | ErrorResponse = await res.json();
      return department;
    } catch (error: any) {
      return error;
    }
  }

  export async function saveDepartment(
    department: Department
  ): Promise<Department | ErrorResponse> {
    try {
      const res: Response = await fetch(API_URL + "rc_departments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(department),
      });
      const newDepartment: Department | ErrorResponse = await res.json();
      return newDepartment;
    } catch (error: any) {
      return error;
    }
  }


  export async function getDepartments(): Promise<
  Department[] | ErrorResponse
> {
  try {
    console.log(process.env.API_DIRECTION);
    const res: Response = await fetch(API_URL + "rc_departments");

    const departments: Department[] | ErrorResponse = await res.json();

    return departments;
  } catch (error: any) {
    return error;
  }
}

export async function updateDepartment(
    department: Department
  ): Promise<Department | ErrorResponse> {
    try {
      const res = await fetch(
        API_URL + `rc_departments/${department.DPT_Id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(department),
        }
      );
  
      const newDepartment: Department | ErrorResponse = await res.json();
      return newDepartment;
    } catch (error: any) {
      return { error: error.message };
    }
  }

  export async function getDepartmentsByName(
    name: string
  ): Promise<Department[] | ErrorResponse> {
    try {
      const res: Response = await fetch(API_URL + `rc_departments/findname/${name}`);
      const departments: Department[] | ErrorResponse = await res.json();
      return departments;
    } catch (error: any) {
      return error;
    }
  }