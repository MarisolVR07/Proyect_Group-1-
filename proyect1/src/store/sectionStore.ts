import { create } from "zustand";
import {
  deleteSection,
  getSection,
  saveSection,
  getSections,
  updateSection,
} from "@/app/controllers/rc_sections/controller";
import { Section } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface SectionState {
  sections: Section[];
  currentSection: Section | null;
  getSection: (id: number) => Promise<Section | ErrorResponse>;
  deleteSection: (id: number) => Promise<Section | ErrorResponse>;
  saveSection: (section: Section) => Promise<Section | ErrorResponse>;
  getSections: () => Promise<Section[] | ErrorResponse>;
  updateSection: (section: Section) => Promise<Section | ErrorResponse>;
}

export const useSectionStore = create<SectionState>((set) => ({
  sections: [],
  currentSection: null,
  getSection: async (id: number) => {
    const section = await getSection(id);
    if ("error" in section) {
      return section;
    }
    set((state) => ({ ...state, sections: [section] }));
    return section;
  },
  deleteSection: async (id: number) => {
    const section = await deleteSection(id);
    if ("error" in section) {
      return section;
    }
    set((state) => ({
      ...state,
      sections: state.sections.filter((sec) => sec.SEC_Id !== id),
    }));
    return section;
  },
  saveSection: async (section: Section) => {
    const newSection = await saveSection(section);
    if ("error" in newSection) {
      return newSection;
    }
    set((state) => ({
      ...state,
      sections: [...state.sections, newSection],
      currentSection: newSection,
    }));
    return newSection;
  },
  getSections: async () => {
    const sections = await getSections();
    if ("error" in sections) {
      return sections;
    }
    set((state) => ({ ...state, sections }));
    return sections;
  },
  updateSection: async (section: Section) => {
    const updatedSection = await updateSection(section);
    if ("error" in updatedSection) {
      return updatedSection;
    }
    set((state) => ({
      ...state,
      sections: state.sections.map((sec) =>
        sec.SEC_Id === section.SEC_Id ? updatedSection : sec
      ),
    }));
    return updatedSection;
  },
}));
