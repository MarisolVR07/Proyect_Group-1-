import { create } from "zustand";
import {
  deleteQuestion,
  getQuestion,
  saveQuestion,
  getQuestions,
  updateQuestion,
} from "@/app/controllers/rc_questions/controller";
import { Question } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface QuestionState {
  questions: Question[];
  currentQuestion: Question | null;
  getQuestion: (id: number) => Promise<Question | ErrorResponse>;
  deleteQuestion: (id: number) => Promise<Question | ErrorResponse>;
  saveQuestion: (question: Question) => Promise<Question | ErrorResponse>;
  getQuestions: () => Promise<Question[] | ErrorResponse>;
  updateQuestion: (question: Question) => Promise<Question | ErrorResponse>;
}

export const useQuestionStore = create<QuestionState>((set) => ({
  questions: [],
  currentQuestion: null,
  getQuestion: async (id: number) => {
    const question = await getQuestion(id);
    if ("error" in question) {
      return question;
    }
    set((state) => ({ ...state, questions: [question] }));
    return question;
  },
  deleteQuestion: async (id: number) => {
    const question = await deleteQuestion(id);
    if ("error" in question) {
      return question;
    }
    set((state) => ({
      ...state,
      questions: state.questions.filter((q) => q.QES_Id !== id),
    }));
    return question;
  },
  saveQuestion: async (question: Question) => {
    const newQuestion = await saveQuestion(question);
    if ("error" in newQuestion) {
      return newQuestion;
    }
    set((state) => ({
      ...state,
      questions: [...state.questions, newQuestion],
      currentQuestion: newQuestion,
    }));
    return newQuestion;
  },
  getQuestions: async () => {
    const questions = await getQuestions();
    if ("error" in questions) {
      return questions;
    }
    set((state) => ({ ...state, questions }));
    return questions;
  },
  updateQuestion: async (question: Question) => {
    const updatedQuestion = await updateQuestion(question);
    if ("error" in updatedQuestion) {
      return updatedQuestion;
    }
    set((state) => ({
      ...state,
      questions: state.questions.map((q) =>
        q.QES_Id === question.QES_Id ? updatedQuestion : q
      ),
    }));
    return updatedQuestion;
  },
}));
