import { create } from "zustand";
import {
  getAnswer,
  deleteAnswer,
  saveAnswer,
  getAnswers,
  updateAnswer,
} from "@/app/controllers/rc_answers/controller";
import { Answers } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface AnswersState {
  answers: Answers[];
  currentAnswer: Answers | null;
  getAnswer: (id: number) => Promise<Answers | ErrorResponse>;
  deleteAnswer: (id: number) => Promise<Answers | ErrorResponse>;
  saveAnswer: (answer: Answers) => Promise<Answers | ErrorResponse>;
  getAnswers: () => Promise<Answers[] | ErrorResponse>;
  updateAnswer: (answer: Answers) => Promise<Answers | ErrorResponse>;
}

export const useAnswersStore = create<AnswersState>((set) => ({
  answers: [],
  currentAnswer: null,
  getAnswer: async (id: number) => {
    const answer = await getAnswer(id);
    if ("error" in answer) {
      return answer;
    }
    set((state) => ({ ...state, answers: [answer] }));
    return answer;
  },
  deleteAnswer: async (id: number) => {
    const result = await deleteAnswer(id);
    if ("error" in result) {
      return result;
    }
    set((state) => ({
      ...state,
      answers: state.answers.filter((ans) => ans.ANS_Id !== id),
    }));
    return result;
  },
  saveAnswer: async (answer: Answers) => {
    const newAnswer = await saveAnswer(answer);
    if ("error" in newAnswer) {
      return newAnswer;
    }
    set((state) => ({
      ...state,
      answers: [...state.answers, newAnswer],
      currentAnswer: newAnswer,
    }));
    return newAnswer;
  },
  getAnswers: async () => {
    const answers = await getAnswers();
    if ("error" in answers) {
      return answers;
    }
    set((state) => ({ ...state, answers }));
    return answers;
  },
  updateAnswer: async (answer: Answers) => {
    const updatedAnswer = await updateAnswer(answer);
    if ("error" in updatedAnswer) {
      return updatedAnswer;
    }
    set((state) => ({
      ...state,
      answers: state.answers.map((ans) =>
        ans.ANS_Id === answer.ANS_Id ? updatedAnswer : ans
      ),
    }));
    return updatedAnswer;
  },
}));
