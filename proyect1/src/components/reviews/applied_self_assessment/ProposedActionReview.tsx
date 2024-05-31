import React, { useState, useEffect } from "react";
import SecondaryButton from "../../general/SecondaryButton";

interface ProposedActionProps {
  id?: string;
  responsible: string;
  justification: string;
  preview: string;
  date: string;
  onAccept: () => void;
}

const ProposedAction: React.FC<ProposedActionProps> = ({
  id,
  responsible,
  justification,
  preview,
  date,
  onAccept,
}) => {

  return (
    <div className="absolute top-0 left-0 w-full h-full px-4 bg-gray-700">
      <h1 className=" text-white text-center text-2xl font-poppins font-semibold">
        {id} Proposed Action
      </h1>
      <div className="flex space-x-5 px-4 ">
        <div className="flex">
          <h2 className="text-white">Date:</h2>
          <p>{date}</p>
        </div>
        <div className="w-full flex">
          <h2 className="text-white">Responsible:</h2>
          <p>{responsible}</p>
        </div>
      </div>
      <div className="flex space-x-5 px-4 ">
        <div className="w-full">
          <h2 className="text-white">Justification</h2>
          <p>{justification}</p>
        </div>
        <div className="w-full">
          <h2 className="text-white">Preview</h2>
          <p>{preview}</p>
        </div>
      </div>
      <SecondaryButton className="rounded-md px-3 my-4" onClick={onAccept}>
        Accept
      </SecondaryButton>
    </div>
  );
};

export default ProposedAction;
