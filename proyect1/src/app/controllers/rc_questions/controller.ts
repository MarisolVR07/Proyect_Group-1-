import { Question } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

const currentUrl = window.location.href;
const API_URL =
  currentUrl.split("/")[0] +
  "//" +
  currentUrl.split("//")[1].split("/")[0] +
  "/api/v3/";

export async function getQuestion(id: number): Promise<Question | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_questions/${id}`);
    const question: Question | ErrorResponse = await res.json();

    return question;
  } catch (error: any) {
    return error;
  }
}

export async function deleteQuestion(id: number): Promise<Question | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_questions/${id}`, {
      method: "DELETE",
    });

    const question: Question | ErrorResponse = await res.json();
    return question;
  } catch (error: any) {
    return error;
  }
}

export async function saveQuestion(
  question: Question
): Promise<Question | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    const newQuestion: Question | ErrorResponse = await res.json();
    return newQuestion;
  } catch (error: any) {
    return error;
  }
}

export async function getQuestions(): Promise<Question[] | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_questions");

    const questions: Question[] | ErrorResponse = await res.json();

    return questions;
  } catch (error: any) {
    return error;
  }
}

export async function updateQuestion(
  question: Question
): Promise<Question | ErrorResponse> {
  try {
    const res = await fetch(API_URL + `rc_questions/${question.QES_Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    });

    const updatedQuestion: Question | ErrorResponse = await res.json();
    return updatedQuestion;
  } catch (error: any) {
    return { error: error.message };
  }
}
