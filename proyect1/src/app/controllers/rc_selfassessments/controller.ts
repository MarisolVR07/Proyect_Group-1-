import { SelfAssessments } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";
//import { getError, validateObject, validateResponse } from "@/utils/utils";*/
const currentUrl = window.location.href;
const API_URL =
  currentUrl.split("/")[0] +
  "//" +
  currentUrl.split("//")[1].split("/")[0] +
  "/api/";

export async function getSelfAssessment(
  id: number
): Promise<SelfAssessments | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_selfassessment/${id}`);
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
    const res: Response = await fetch(API_URL + `rc_selfassessment/${id}`, {
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
    const res: Response = await fetch(API_URL + "rc_selfassessment", {
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
    const res: Response = await fetch(API_URL + "rc_selfassessment");
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
      API_URL + `rc_selfassessment/${selfAssessment.SAT_Id}`,
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