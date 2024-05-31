import { Parameter } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";
//const currentUrl = window.location.href;
const API_URL = "/api/v6/";

export async function getParameter(
  id: number
): Promise<Parameter | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_parameters/${id}`);
    const parameter: Parameter | ErrorResponse = await res.json();
    return parameter;
  } catch (error: any) {
    return error;
  }
}

export async function getParametersByName(
  name: string
): Promise<Parameter[] | ErrorResponse> {
  try {
    const res: Response = await fetch(
      API_URL + `rc_parameters/findname/${name}`
    );
    const parameters: Parameter[] | ErrorResponse = await res.json();
    return parameters;
  } catch (error: any) {
    return error;
  }
}

export async function deleteParameter(
  id: number
): Promise<Parameter | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_parameters/${id}`, {
      method: "DELETE",
    });
    //validateResponse(res);

    const parameter: Parameter | ErrorResponse = await res.json();
    //  validateObject(parameter);
    return parameter;
  } catch (error: any) {
    return error;
  }
}

export async function saveParameter(
  parameter: Parameter
): Promise<Parameter | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_parameters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameter),
    });

    //validateResponse(res);

    const newParameter: Parameter | ErrorResponse = await res.json();
    //validateObject(newParameter);
    return newParameter;
  } catch (error: any) {
    return error;
  }
}

export async function getParameters(): Promise<Parameter[] | ErrorResponse> {
  try {
    console.log(process.env.API_DIRECTION);
    const res: Response = await fetch(API_URL + "rc_parameters");
    //validateResponse(res);

    const parameters: Parameter[] | ErrorResponse = await res.json();

    return parameters;
  } catch (error: any) {
    return error;
  }
}

export async function updateParameter(
  parameter: Parameter
): Promise<Parameter | ErrorResponse> {
  try {
    const res = await fetch(API_URL + `rc_parameters/1`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameter),
    });

    const newParameter: Parameter | ErrorResponse = await res.json();
    return newParameter;
  } catch (error: any) {
    return { error: error.message };
  }
}
