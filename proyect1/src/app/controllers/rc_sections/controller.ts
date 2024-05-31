import { Section } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

const API_URL = "/api/v6/";

export async function getSection(id: number): Promise<Section | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_sections/${id}`);
    const section: Section | ErrorResponse = await res.json();

    return section;
  } catch (error: any) {
    return error;
  }
}

export async function deleteSection(
  id: number
): Promise<Section | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_sections/${id}`, {
      method: "DELETE",
    });

    const section: Section | ErrorResponse = await res.json();
    return section;
  } catch (error: any) {
    return error;
  }
}

export async function saveSection(
  section: Section
): Promise<Section | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_sections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(section),
    });

    const newSection: Section | ErrorResponse = await res.json();
    return newSection;
  } catch (error: any) {
    return error;
  }
}

export async function getSections(): Promise<Section[] | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_sections");

    const sections: Section[] | ErrorResponse = await res.json();

    return sections;
  } catch (error: any) {
    return error;
  }
}

export async function updateSection(
  section: Section
): Promise<Section | ErrorResponse> {
  try {
    const res = await fetch(API_URL + `rc_sections/${section.SEC_Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(section),
    });

    const updatedSection: Section | ErrorResponse = await res.json();
    return updatedSection;
  } catch (error: any) {
    return { error: error.message };
  }
}
