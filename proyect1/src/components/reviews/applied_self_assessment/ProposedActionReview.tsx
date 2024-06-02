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

    const dateFormat = new Date(date).toLocaleDateString();

  return (
    <div className="absolute top-0 left-0 w-full h-full px-4 text-gray-300 bg-gray-800 rounded-md font-poppins font-semibold drop-shadow-xl">
      <h1 className=" text-white text-center text-2xl font-poppins font-semibold mb-2">
        {id} Proposed Action
      </h1>
      <div className="flex space-x-5 px-4 mb-2">
        <div className="flex">
          <h2 className="text-white me-1 pt-1">Date:</h2>
          <p className="ring-1 p-1 rounded-xl ring-white">{dateFormat}</p>
        </div>
        <div className="w-full flex">
          <h2 className="text-white pt-1 me-1">Responsible:</h2>
          <p className="ring-1 p-1 rounded-xl ring-white w-full text-start">
            {responsible}
          </p>
        </div>
      </div>
      <div className="flex space-x-5 px-4 ">
        <div className="w-full">
          <h2 className="text-white">Justification</h2>
          <p className="ring-1 p-1 rounded-xl ring-white h-full text-start">
            {justification}
          </p>
        </div>
        <div className="w-full">
          <h2 className="text-white">Preview</h2>
          <p className="ring-1 p-1 rounded-xl ring-white h-full text-start">
            {preview}
          </p>
        </div>
      </div>
      <SecondaryButton className="rounded-md px-3 mt-10" onClick={onAccept}>
        Accept
      </SecondaryButton>
    </div>
  );
};

export default ProposedAction;
