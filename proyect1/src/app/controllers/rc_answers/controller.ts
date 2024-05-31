import { Answers } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

//const currentUrl = window.location.href;
const API_URL =
  "/api/v6/";

export async function getAnswer(id: number): Promise<Answers | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_answers/${id}`);
    const answer: Answers | ErrorResponse = await res.json();
    return answer;
  } catch (error: any) {
    return error;
  }
}

export async function getAnswers(): Promise<Answers[] | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_answers");
    const answers: Answers[] | ErrorResponse = await res.json();
    return answers;
  } catch (error: any) {
    return error;
  }
}

export async function saveAnswer(
  answer: Answers
): Promise<Answers | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_answers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
    const newAnswer: Answers | ErrorResponse = await res.json();
    return newAnswer;
  } catch (error: any) {
    return error;
  }
}

export async function updateAnswer(
  answer: Answers
): Promise<Answers | ErrorResponse> {
  try {
    const res = await fetch(API_URL + `rc_answers/${answer.ANS_Id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(answer),
    });
    const updatedAnswer: Answers | ErrorResponse = await res.json();
    return updatedAnswer;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteAnswer(
  id: number
): Promise<Answers | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_answers/${id}`, {
      method: "DELETE",
    });
    const deletedAnswer: Answers | ErrorResponse = await res.json();
    return deletedAnswer;
  } catch (error: any) {
    return error;
  }
}
