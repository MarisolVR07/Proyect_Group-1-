export type Department = {
  DPT_Id?: number | null,
  DPT_Name: string,
  DPT_Status: string,
  DPT_Institution?: number | null | Institution,
  rc_users?: User[] | null;


}

export type User = {

    USR_Id?: number | null;
    USR_Email: string;
    USR_FullName: string;
    USR_Role: string;
    USR_Department?: number | null | Department;

};

export type Institution = {
    INS_Id?: number | null;
    INS_Name: string,
    INS_Email: string,
    INS_Telephone: number,
    INS_PhysicalAddress: string,
    rc_departments?: Department[] | null

}

