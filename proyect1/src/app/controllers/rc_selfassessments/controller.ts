import { SelfAssessments } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";
//import { getError, validateObject, validateResponse } from "@/utils/utils";*/
const currentUrl = window.location.href;
const API_URL =
  currentUrl.split("/")[0] +
  "//" +
  currentUrl.split("//")[1].split("/")[0] +
  "/api/v3/";

export async function getSelfAssessment(
  id: number
): Promise<SelfAssessments | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_selfassessments/${id}`);
    //validateResponse(res);
    const selfAssessment: SelfAssessments | ErrorResponse = await res.json();

    return selfAssessment;
  } catch (error: any) {
    return error;
  }
}

export async function deleteSelfAssessment(
  id: number
): Promise<SelfAssessments | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_selfassessments/${id}`, {
      method: "DELETE",
    });
    //validateResponse(res);

    const selfAssessment: SelfAssessments | ErrorResponse = await res.json();
    //  validateObject(user);
    return selfAssessment;
  } catch (error: any) {
    return error;
  }
}

export async function saveSelfAssessment(
  selfAssessment: SelfAssessments
): Promise<SelfAssessments | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_selfassessments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(selfAssessment),
    });

    //validateResponse(res);

    const newSelfAssessment: SelfAssessments | ErrorResponse = await res.json();
    //validateObject(newUser);
    return newSelfAssessment;
  } catch (error: any) {
    return error;
  }
}

export async function getSelfAssessments(): Promise<
  SelfAssessments[] | ErrorResponse
> {
  try {
    console.log(process.env.API_DIRECTION);
    const res: Response = await fetch(API_URL + "rc_selfassessments");
    //validateResponse(res);

    const selfAssessments: SelfAssessments[] | ErrorResponse = await res.json();

    return selfAssessments;
  } catch (error: any) {
    return error;
  }
}

export async function updateSelfAssessment(
  selfAssessment: SelfAssessments
): Promise<SelfAssessments | ErrorResponse> {
  try {
    const res = await fetch(
      API_URL + `rc_selfassessments/${selfAssessment.SAT_Id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selfAssessment),
      }
    );

    const newSelfAssessment: SelfAssessments | ErrorResponse = await res.json();
    return newSelfAssessment;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getCompleteSelfAssessment(
  id: number
): Promise<SelfAssessments | ErrorResponse> {
  try {
    const res: Response = await fetch(
      API_URL + `rc_selfassessments/complete/${id}`
    );
    const completeSelfAssessment: SelfAssessments | ErrorResponse =
      await res.json();
    return completeSelfAssessment;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateCompleteSelfAssessment(
  selfAssessment: SelfAssessments
): Promise<SelfAssessments | ErrorResponse> {
  try {
    const res: Response = await fetch(
      API_URL + `rc_selfassessments/complete/${selfAssessment.SAT_Id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(selfAssessment),
      }
    );

    const updatedSelfAssessment: SelfAssessments | ErrorResponse =
      await res.json();
    return updatedSelfAssessment;
  } catch (error: any) {
    return { error: error.message };
  }
}

