import React, { useState, useEffect } from "react";
import SecondaryButton from "../general/SecondaryButton";
import TableTextArea from "./TableTextArea";
import InputField from "../general/InputField";
import DateTimePicker from "../general/DateTimePicker";

interface ProposedActionData {
  responsible: string;
  justification: string;
  preview: string;
}

interface ProposedActionProps {
  id?: string;
  initialData?: ProposedActionData;
  onAccept: (proposedActionData: ProposedActionData) => void;
}

const ProposedAction: React.FC<ProposedActionProps> = ({
  id,
  initialData,
  onAccept,
}) => {
  const [date, setDate] = useState<Date | null>(null);
  const [responsible, setResponsible] = useState<string>("");
  const [justification, setJustification] = useState<string>("");
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setResponsible(initialData.responsible);
      setJustification(initialData.justification);
      setPreview(initialData.preview);
    }
  }, [initialData]);

  const handleAccept = () => {
    const proposedActionData: ProposedActionData = {
      responsible,
      justification,
      preview,
    };
    onAccept(proposedActionData);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90">
      <h1 className="mt-4 text-white text-center text-2xl font-poppins font-semibold">
        {id} Proposed Action
      </h1>
      <div className="flex space-x-5 px-4">
        <div>
          <h2>Date</h2>
          <DateTimePicker
            className=""
            value={date}
            onChange={(newDate: Date | null) => setDate(newDate)}
          />
        </div>
        <div className="w-full">
          <h2 className="">Responsible</h2>
          <InputField
            type="text"
            value={responsible}
            onChange={(newValue: string) => setResponsible(newValue)}
          />
        </div>
        <input type="checkbox" />
      </div>
      <div className="flex space-x-5 items-center justify-center px-4">
        <div className="w-full">
          <h2>Justification</h2>
          <TableTextArea
            id={`Jus.${id}`}
            className="bg-white w-full h-20 rounded-lg"
            value={justification}
            onChange={(newValue: string) => setJustification(newValue)}
          />
        </div>
        <div className="w-full">
          <h2>Preview</h2>
          <TableTextArea
            id={`Pre.${id}`}
            className="bg-white w-full h-20 rounded-lg"
            value={preview}
            onChange={(newValue: string) => setPreview(newValue)}
          />
        </div>
      </div>
      <SecondaryButton className="rounded-md px-3 my-4" onClick={handleAccept}>
        Accept
      </SecondaryButton>
    </div>
  );
};

export default ProposedAction;
