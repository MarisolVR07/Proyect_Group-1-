import { Unit } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";
//import { getError, validateObject, validateResponse } from "@/utils/utils";*/
//const currentUrl = window.location.href;
const API_URL = "/api/v6/";

export async function getUnit(id: number): Promise<Unit | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_unit/${id}`);
    //validateResponse(res);
    const unit: Unit | ErrorResponse = await res.json();

    return unit;
  } catch (error: any) {
    return error;
  }
}

export async function deleteUnit(id: number): Promise<Unit | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_unit/${id}`, {
      method: "DELETE",
    });
    //validateResponse(res);

    const unit: Unit | ErrorResponse = await res.json();
    //  validateObject(user);
    return unit;
  } catch (error: any) {
    return error;
  }
}

export async function saveUnit(unit: Unit): Promise<Unit | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_unit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unit),
    });

    //validateResponse(res);

    const newUnit: Unit | ErrorResponse = await res.json();
    //validateObject(newUser);
    return newUnit;
  } catch (error: any) {
    return error;
  }
}

export async function getUnits(): Promise<Unit[] | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_unit");
    //validateResponse(res);

    const units: Unit[] | ErrorResponse = await res.json();

    return units;
  } catch (error: any) {
    return error;
  }
}

export async function getUnitsPerPage(page: number): Promise<Unit[] | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_unit/getperpage?page=${page}`);
    //validateResponse(res);

    const units: Unit[] | ErrorResponse = await res.json();

    return units;
  } catch (error: any) {
    return error;
  }
}

export async function updateUnit(unit: Unit): Promise<Unit | ErrorResponse> {
  try {
    const res = await fetch(API_URL + `rc_unit/${unit.UND_Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(unit),
    });

    const newUnit: Unit | ErrorResponse = await res.json();
    return newUnit;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getUnitsByName(
  name: string,
  page: number
): Promise<Unit[] | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_unit/findname/${name}?page=${page}`);
    const units: Unit[] | ErrorResponse = await res.json();
    return units;
  } catch (error: any) {
    return error;
  }
}
