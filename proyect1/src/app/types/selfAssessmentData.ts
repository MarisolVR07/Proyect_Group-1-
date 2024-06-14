export interface ProposedActionData {
  responsible: string;
  justification: string;
  preview: string;
  date: Date | null;
}

export interface AnswerData {
  answer: number | null;
  observations: string;
  url: string;
  responsible: string;
  justification: string;
  preview: string;
  date: Date | null;
}

export interface TableRowData {
  checkedIndex: number | null;
  textArea1: string;
  textArea2: string;
  proposedActionData?: ProposedActionData;
}

export interface ProposedActionDataReview {
  responsible: string;
  justification: string;
  preview: string;
  date: string;
}

export interface TableRowDataReview {
  answer: string;
  reference: string;
  observation: string;
  ProposedActionDataReview: ProposedActionDataReview;
}

export const initialSectionsData = {
  "1": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
  "2": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
  "3": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
  "4": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
  "5": { sectionName: "", questions: Array.from({ length: 4 }, () => "") },
};

export const initialTableData: TableRowData[][] = [
  [
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
  ],
  [
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
  ],
  [
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
  ],
  [
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
  ],
  [
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
    {
      checkedIndex: null,
      textArea1: "",
      textArea2: "",
      proposedActionData: {
        responsible: "",
        justification: "",
        preview: "",
        date: null,
      },
    },
  ],
];
