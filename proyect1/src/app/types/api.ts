export type ErrorResponse = {
  error: string;
};

export type ParameterId = {
  params: { id: string };
};

export type ParameterFullName = {
  params: { fullname: string };
};

export type ParameterDepartmentStatus = {
  params: {
    department: string;
    status: string;
  };
};
