import { AppliedSelfAssessment } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";
//import { getError, validateObject, validateResponse } from "@/utils/utils";*/
//const currentUrl = window.location.href;
const API_URL =
  "/api/v6/";

export async function getAppliedSelfassessment(
  id: number
): Promise<AppliedSelfAssessment | ErrorResponse> {
  try {
    const res: Response = await fetch(
      API_URL + `rc_appliedselfassessment/${id}`
    );
    //validateResponse(res);
    const appliedSelfassessment: AppliedSelfAssessment | ErrorResponse =
      await res.json();

    return appliedSelfassessment;
  } catch (error: any) {
    return error;
  }
}

export async function getAppliedSelfAssessmentByDepartmentAndStatus(
  department: number,
  status: string
): Promise<AppliedSelfAssessment[] | ErrorResponse> {
  try {
    const res: Response = await fetch(
      API_URL +
        `rc_appliedselfassessment/finddeparmentandstatus/${department}/${status}`
    );
    const appliedSelfAssessments: AppliedSelfAssessment[] | ErrorResponse =
      await res.json();
    return appliedSelfAssessments;
  } catch (error: any) {
    return error;
  }
}

export async function deleteAppliedSelfassessment(
  id: number
): Promise<AppliedSelfAssessment | ErrorResponse> {
  try {
    const res: Response = await fetch(
      API_URL + `rc_appliedselfassessment/${id}`,
      {
        method: "DELETE",
      }
    );
    //validateResponse(res);

    const appliedselfassessment: AppliedSelfAssessment | ErrorResponse =
      await res.json();
    //  validateObject(appliedselfassessment);
    return appliedselfassessment;
  } catch (error: any) {
    return error;
  }
}

export async function saveAppliedSelfassessment(
  appliedselfassessment: AppliedSelfAssessment
): Promise<AppliedSelfAssessment | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_appliedselfassessment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appliedselfassessment),
    });

    //validateResponse(res);

    const newAppliedSelfassessment: AppliedSelfAssessment | ErrorResponse =
      await res.json();
    //validateObject(newAppliedSelfassessment);
    return newAppliedSelfassessment;
  } catch (error: any) {
    return error;
  }
}

export async function getAppliedSelfassessments(): Promise<
  AppliedSelfAssessment[] | ErrorResponse
> {
  try {
    console.log(process.env.API_DIRECTION);
    const res: Response = await fetch(API_URL + "rc_appliedselfassessment");
    //validateResponse(res);

    const appliedselfassessments: AppliedSelfAssessment[] | ErrorResponse =
      await res.json();

    return appliedselfassessments;
  } catch (error: any) {
    return error;
  }
}

export async function updateAppliedSelfassessment(
  appliedselfassessment: AppliedSelfAssessment
): Promise<AppliedSelfAssessment | ErrorResponse> {
  try {
    const res = await fetch(
      API_URL + `rc_appliedselfassessment/${appliedselfassessment.ASA_Id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appliedselfassessment),
      }
    );

    const newAppliedSelfassessment: AppliedSelfAssessment | ErrorResponse =
      await res.json();
    return newAppliedSelfassessment;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getCompleteAppliedSelfassessments(): Promise<
  AppliedSelfAssessment[] | ErrorResponse
> {
  try {
    const res: Response = await fetch(
      API_URL + "rc_appliedselfassessment/complete"
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const appliedSelfassessments: AppliedSelfAssessment[] | ErrorResponse =
      await res.json();

    return appliedSelfassessments;
  } catch (error: any) {
    return { error: error.message };
  }
}
