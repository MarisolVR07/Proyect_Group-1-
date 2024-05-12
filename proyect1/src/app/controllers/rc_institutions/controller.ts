import { Institution } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

const currentUrl = window.location.href;
const API_URL =
  currentUrl.split("/")[0] +
  "//" +
  currentUrl.split("//")[1].split("/")[0] +
  "/api/";

  export async function getInstitution(
    id: number
  ): Promise<Institution | ErrorResponse> {
    try {
      const res: Response = await fetch(API_URL + `rc_institutions/${id}`);
      //validateResponse(res);
      const institution: Institution | ErrorResponse = await res.json();
  
      return institution;
    } catch (error: any) {
      return error;
    }
  }

  export async function deleteInstitution(
    id: number
  ): Promise<Institution | ErrorResponse> {
    try {
      const res: Response = await fetch(API_URL + `rc_institutions/${id}`, {
        method: "DELETE",
      });
      //validateResponse(res);
  
      const institution: Institution | ErrorResponse = await res.json();
      //  validateObject(user);
      return institution;
    } catch (error: any) {
      return error;
    }
  }
  export async function saveInstitution(
    institution: Institution
): Promise<Institution | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_institutions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(institution),
    });

    //validateResponse(res);

    const newInstitution: Institution | ErrorResponse = await res.json();
    //validateObject(newUser);
    return newInstitution;
  } catch (error: any) {
    return error;
  }
}

      export async function updateInstitution(
        institution: Institution
      ): Promise<Institution | ErrorResponse> {
        try {
          const res = await fetch(
            API_URL + `rc_institutions/${institution.INS_Id}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(institution),
            }
          );
      
          const newInstitution: Institution | ErrorResponse = await res.json();
          return newInstitution;
        } catch (error: any) {
          return { error: error.message };
        }
      }