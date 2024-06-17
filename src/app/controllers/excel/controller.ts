import { ErrorResponse } from "@/app/types/api";

const API_URL =
  "/api/v6/";

export async function exportAppliedSelfAssessment(
  id: number
): Promise<void | ErrorResponse> {
  try {
    const res: Response = await fetch(
      API_URL + `excel/appliedselfassessment/${id}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SelfAssessment_${id}.xlsx`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (error: any) {
    return { error: error.message };
  }
}
