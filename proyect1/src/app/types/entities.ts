export type Department = {
  DPT_Id?: number | null;
  DPT_Name: string;
  DPT_Status: string;
  DPT_Institution?: number | null | Institution;
  rc_users?: User[] | null;
};

export type User = {
  USR_Id?: number | null;
  USR_Email: string;
  USR_FullName: string;
  USR_Role: string;
  USR_Department?: number | null | Department;
};

export type Institution = {
  INS_Id?: number | null;
  INS_Name: string;
  INS_Email: string;
  INS_Telephone: number;
  INS_PhysicalAddress: string;
  rc_departments?: Department[] | null;
};

export type SelfAssessments = {
  SAT_Id?: number | null;
  SAT_Status: string;
  SAT_Audit: string;
  SAT_Description: string;
  SAT_Department?: number | null;
  rc_departments?: number | null | Department;
};

export type Unit = {
  UND_Id?: number | null;               
  UND_Name:       string           
  UND_Email:      String          
  UND_Status:     String          
  rc_departments?: Department[] | null;

};