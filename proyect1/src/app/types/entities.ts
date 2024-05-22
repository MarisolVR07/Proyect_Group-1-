export type Department = {
  DPT_Id?: number | null;
  DPT_Name: string;
  DPT_Status?: string;
  DPT_Unit?: number | null | Unit;
  rc_unit?: Unit | null;
  rc_users?: User[] | null;
};

export type User = {
  USR_Id?: number | null;
  USR_Email: string;
  USR_FullName: string;
  USR_Role: string;
  USR_Department?: number | null;
  USR_Status?: string;
};

export type SelfAssessments = {
  SAT_Id?: number | null;
  SAT_Status?: string;
  SAT_Audit: string;
  SAT_Description: string;
  rc_sections?: Section[] | null;
};

export type Unit = {
  UND_Id?: number | null;
  UND_Name: string;
  UND_Email: String;
  UND_Status?: String;
  rc_answers?: Department[] | null;
};

export type Section = {
  SEC_Id?: number | null;
  SEC_Name: string;
  SEC_Number: string;
  SEC_SelfAssessments: number | null;
  rc_selfassessments?: SelfAssessments | null;
  rc_questions?: Question[] | null;
};

export type Question = {
  QES_Id?: number | null;
  QES_Text: string;
  QES_Number: string;
  QES_Section: number | null;
  rc_sections?: Section | null;
};

export type Parameter = {
  PRM_Id?: number | null;
  PRM_ActivationDate: String | null;
  PRM_DeactivationDate: String | null;
  PRM_Logo?: Blob | null;
  PRM_Email?: String | null;
  PRM_Institution?: String | null;
};

export type AppliedSelfAssessment = {
  ASA_Id?: number | null;
  ASA_Date: String | null;
  ASA_ReviewedBy: String | null;
  ASA_MadeBy?: String | null;
  ASA_Assessment?: number | null;
  ASA_Department?: number | null;
  rc_answers?: Answers[] | null;
};

export type Answers = {
  ANS_Id?: number | null;
  ANS_Selection: String | null;
  ANS_Observations: String | null;
  ANS_WorkDocument?: String | null;
  ANS_Question?: number | null;
  ANS_SelfAssessment?: number | null;
  rc_questions?: Question[] | null;
};

export type ProposedAction = {
  PAC_Id?: number | null;
  PAC_Date: String | null;
  PAC_Status: String | null;
  PAC_Responsible?: String | null;
  PAC_Justification?: String | null;
  PAC_Preview?: String | null;
  PAC_Answer?: number | null;
  rc_answers?: Answers[];
};
