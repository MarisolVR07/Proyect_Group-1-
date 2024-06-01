export type ErrorResponse = {
  error: string;
};

export type ParameterId = {
  params: { id: string };
};

export type ParameterFullName = {
  params: { name: string };
};

export type ParameterDepartmentStatus = {
  params: {
    department: string;
    status: string;
  };
}
export type ParameterStatus = {
    params: {
      status: string;
    };
  
};
