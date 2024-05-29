import React, { useState, useEffect } from "react";
import SecondaryButton from "../general/SecondaryButton";
import TableTextArea from "./TableTextArea";
import InputField from "../general/InputField";
import DateTimePicker from "../general/DateTimePicker";

interface ProposedActionData {
  responsible: string;
  justification: string;
  preview: string;
  date: Date | null;
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
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (initialData) {
      setResponsible(initialData.responsible);
      setJustification(initialData.justification);
      setPreview(initialData.preview);
      setDate(initialData.date);
    }
  }, [initialData]);

  const handleAccept = () => {
    if (!responsible || !justification || !preview || !date) {
      setError("Please fill out all fields.");
      return;
    }

    const proposedActionData: ProposedActionData = {
      responsible,
      justification,
      preview,
      date,
    };
    onAccept(proposedActionData);
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full bg-gray-800 bg-opacity-90">
      <h1 className="my-4 text-white text-center text-2xl font-poppins font-semibold">
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
      </div>
      <div className="flex space-x-5 px-4">
        <div className="w-full">
          <h2>Justification</h2>
          <TableTextArea
            id={`Jus.${id}`}
            className="bg-white w-full h-full rounded-lg"
            value={justification}
            onChange={(newValue: string) => setJustification(newValue)}
          />
        </div>
        <div className="w-full">
          <h2>Preview</h2>
          <TableTextArea
            id={`Pre.${id}`}
            className="bg-white w-full h-full rounded-lg"
            value={preview}
            onChange={(newValue: string) => setPreview(newValue)}
          />
        </div>
      </div>
      {error && <div className="text-red-500 text-center mt-2">{error}</div>}
      <SecondaryButton className="rounded-md px-3 my-4" onClick={handleAccept}>
        Accept
      </SecondaryButton>
    </div>
  );
};

export default ProposedAction;
