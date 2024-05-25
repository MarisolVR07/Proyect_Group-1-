import { create } from "zustand";
import {
  getProposedAction,
  deleteProposedAction,
  saveProposedAction,
  getProposedActions,
  updateProposedAction,
} from "@/app/controllers/rc_proposedaction/controller";
import { ProposedAction } from "@/app/types/entities";
import { ErrorResponse } from "@/app/types/api";

interface ProposedActionState {
  proposedActions: ProposedAction[];
  currentProposedAction: ProposedAction | null;
  getProposedAction: (id: number) => Promise<ProposedAction | ErrorResponse>;
  deleteProposedAction: (id: number) => Promise<ProposedAction | ErrorResponse>;
  saveProposedAction: (
    proposedAction: ProposedAction
  ) => Promise<ProposedAction | ErrorResponse>;
  getProposedActions: () => Promise<ProposedAction[] | ErrorResponse>;
  updateProposedAction: (
    proposedAction: ProposedAction
  ) => Promise<ProposedAction | ErrorResponse>;
}

export const useProposedActionsStore = create<ProposedActionState>((set) => ({
  proposedActions: [],
  currentProposedAction: null,
  getProposedAction: async (id: number) => {
    const proposedAction = await getProposedAction(id);
    if ("error" in proposedAction) {
      return proposedAction;
    }
    set((state) => ({ ...state, proposedActions: [proposedAction] }));
    return proposedAction;
  },
  deleteProposedAction: async (id: number) => {
    const result = await deleteProposedAction(id);
    if ("error" in result) {
      return result;
    }
    set((state) => ({
      ...state,
      proposedActions: state.proposedActions.filter(
        (action) => action.PAC_Id !== id
      ),
    }));
    return result;
  },
  saveProposedAction: async (proposedAction: ProposedAction) => {
    const newProposedAction = await saveProposedAction(proposedAction);
    if ("error" in newProposedAction) {
      return newProposedAction;
    }
    set((state) => ({
      ...state,
      proposedActions: [...state.proposedActions, newProposedAction],
      currentProposedAction: newProposedAction,
    }));
    return newProposedAction;
  },
  getProposedActions: async () => {
    const proposedActions = await getProposedActions();
    if ("error" in proposedActions) {
      return proposedActions;
    }
    set((state) => ({ ...state, proposedActions }));
    return proposedActions;
  },
  updateProposedAction: async (proposedAction: ProposedAction) => {
    const updatedProposedAction = await updateProposedAction(proposedAction);
    if ("error" in updatedProposedAction) {
      return updatedProposedAction;
    }
    set((state) => ({
      ...state,
      proposedActions: state.proposedActions.map((action) =>
        action.PAC_Id === proposedAction.PAC_Id ? updatedProposedAction : action
      ),
    }));
    return updatedProposedAction;
  },
}));
