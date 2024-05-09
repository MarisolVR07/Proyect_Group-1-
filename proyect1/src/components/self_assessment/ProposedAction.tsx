import React, { useState } from "react";
import SecondaryButton from "../general/SecondaryButton";
import TableTextArea from "./TableTextArea";
import InputField from "../general/InputField";
import DateTimePicker from "../general/DateTimePicker";

interface ProposedActionProps {
  id?: String;
  onAccept: () => void;
}

const ProposedAction: React.FC<ProposedActionProps> = ({ id, onAccept }) => {
  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90">
      <h1 className="mt-4 text-white text-center text-2xl font-poppins font-semibold">
        Proposed Action
      </h1>
      <div className="flex space-x-5 px-4">
        <div>
          <h2>Date</h2>
          <DateTimePicker className="" />
        </div>
        <div className="w-full">
          <h2 className="">Responsible</h2>
          <InputField type="text" />
        </div>
        <input type="checkbox" />
      </div>
      <div className="flex space-x-5 items-center justify-center px-4">
        <div className="w-full">
          <h2>Justification</h2>
          <TableTextArea
            id={`Jus.${id}`}
            className="bg-white w-full h-20 rounded-lg"
          />
        </div>
        <div className="w-full">
          <h2>Preview</h2>
          <TableTextArea
            id={`Pre.${id}`}
            className="bg-white w-full h-20 rounded-lg"
          />
        </div>
      </div>
      <SecondaryButton className="rounded-md px-3 my-4" onClick={onAccept}>
        Accept
      </SecondaryButton>
    </div>
  );
};

export default ProposedAction;
