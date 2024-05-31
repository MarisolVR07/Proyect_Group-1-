import { ProposedAction } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

//const currentUrl = window.location.href;
const API_URL = "/api/v6/";

export async function getProposedAction(
  id: number
): Promise<ProposedAction | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_proposedaction/${id}`);
    const proposedAction: ProposedAction | ErrorResponse = await res.json();
    return proposedAction;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function getProposedActions(): Promise<
  ProposedAction[] | ErrorResponse
> {
  try {
    const res: Response = await fetch(API_URL + "rc_proposedaction");
    const proposedActions: ProposedAction[] | ErrorResponse = await res.json();
    return proposedActions;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function saveProposedAction(
  proposedAction: ProposedAction
): Promise<ProposedAction | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + "rc_proposedaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(proposedAction),
    });
    const newProposedAction: ProposedAction | ErrorResponse = await res.json();
    return newProposedAction;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateProposedAction(
  proposedAction: ProposedAction
): Promise<ProposedAction | ErrorResponse> {
  try {
    const res: Response = await fetch(
      API_URL + `rc_proposedaction/${proposedAction.PAC_Id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(proposedAction),
      }
    );
    const updatedProposedAction: ProposedAction | ErrorResponse =
      await res.json();
    return updatedProposedAction;
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function deleteProposedAction(
  id: number
): Promise<ProposedAction | ErrorResponse> {
  try {
    const res: Response = await fetch(API_URL + `rc_proposedaction/${id}`, {
      method: "DELETE",
    });
    const proposedAction: ProposedAction | ErrorResponse = await res.json();
    return proposedAction;
  } catch (error: any) {
    return { error: error.message };
  }
}
