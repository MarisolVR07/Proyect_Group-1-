import React from "react";

const TableHeader: React.FC = () => {
  return (
    <div className="flex w-full border-b-2 border-gray-600">
      <div className="border-e-2 border-gray-600">
        <h3 className="w-10">Num.</h3>
      </div>

      <div className="border-e-2 border-gray-600 w-full">
        <h3 className="">Questionnaire</h3>
      </div>

      <div className="border-e-2 border-gray-600">
        <h3 className="w-24">Answer</h3>
        <div className="flex border-t-2 border-gray-600 w-full">
          <div className="w-full">
            <h3>Yes</h3>
          </div>
          <div className="border-s-2 border-gray-600 w-full">
            <h3>No</h3>
          </div>
        </div>
      </div>

      <div className="border-e-2 border-gray-600">
        <h3 className="w-28">References Work Papers</h3>
      </div>

      <div className="w-80 border-e-2 border-gray-600">
        <h3 className="w-80">Observations</h3>
      </div>

      <div className="w-48">
        <h3 className="">Proposed Action</h3>
      </div>
    </div>
  );
};

export default TableHeader;
