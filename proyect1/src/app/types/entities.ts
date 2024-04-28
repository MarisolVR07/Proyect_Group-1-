type RcUser = {
    USR_Email: string;
    USR_Name: string;
    USR_FirstLastName: string;
    USR_SecondLastName: string;
    USR_Role: string;
    USR_Department?: number | null;

  };

export type User = RcUser;