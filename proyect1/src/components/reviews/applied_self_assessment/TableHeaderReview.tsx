import React from "react";

const TableHeader: React.FC = () => {
  return (
    <div className="flex w-full border-b-2 border-gray-600">
      <div className="border-e-2 border-gray-600 ">
        <h3 className="w-10">Num.</h3>
      </div>

      <div className="border-e-2 border-gray-600 w-full">
        <h3 className="w-full">Questionnaire</h3>
      </div>

      <div className="border-e-2 border-gray-600 w-28">
        <h3 className="">Answer</h3>
      </div>

      <div className="border-e-2 border-gray-600 w-40">
        <h3 className="">References Work Papers</h3>
      </div>

      <div className="w-96 border-e-2 border-gray-600">
        <h3 className="">Observations</h3>
      </div>

      <div className="w-36">
        <h3 className="">Proposed Action</h3>
      </div>
    </div>
  );
};

export default TableHeader;
