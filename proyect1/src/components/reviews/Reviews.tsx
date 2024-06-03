"use client";
import React, { useEffect, useState } from "react";
import Button from "../general/PrimaryButton";
import SearchBar from "@/components/general/SearchBar";
import RolDropDown from "@/components/general/RolDropdowm";
import { useAppliedSelfAssessmentsStore } from "@/store/appliedSelfAssessmentStore";
import { AppliedSelfAssessment } from "@/app/types/entities";
import SelfAssessment from "./applied_self_assessment/SelfAssessmentReview";
import { useExportStore } from "@/store/excelStore";
import DropdownMenu from "@/components/reviews/DropDownMenuSearch";
import toast from "react-hot-toast";
import { DebugMessage } from "@/app/types/debugData";
import StateCheckbox from "../general/StateCheckbox";

interface ReviewsProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ onDebugMessage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const exportStore = useExportStore();
  const [filterActive, setFilterActive] = useState(false);
  const [appliedSelfAssessments, setAppliedSelfAssessments2] = useState<
  AppliedSelfAssessment[]
>([]);
  const [selectedSelfAssessment, setSelectedSelfAssessment] =
    useState<AppliedSelfAssessment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appliedSelfAssessmentStore = useAppliedSelfAssessmentsStore();

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    onDebugMessage({
      content: "Fetching Applied Self-Assessments",
      type: "Info",
    });



    const fetchAppliedSelfAssessments = async () => {
      const allAppliedSelfAssessments =
        await appliedSelfAssessmentStore.getCompleteAppliedSelfassessments();
      if (!("error" in allAppliedSelfAssessments)) {
        onDebugMessage({
          content: "Successfully Obtained Applied Self-Assessments",
          type: "Success",
        });
        setAppliedSelfAssessments2(allAppliedSelfAssessments);
      } else {
        onDebugMessage({
          content: `Failed to Fetch Applied Self-Assessments->${allAppliedSelfAssessments.error}`,
          type: "Error",
        });
      }
    };
    fetchAppliedSelfAssessments();
  }, []);

  
  const fetchAppliedSelfAssessments = async () => {
    const allAppliedSelfAssessments =
      await appliedSelfAssessmentStore.getCompleteAppliedSelfassessments();
    if (!("error" in allAppliedSelfAssessments)) {
      setAppliedSelfAssessments2(allAppliedSelfAssessments);
    } else {
      console.error(
        "Error fetching AppliedSelfAssessments:",
        allAppliedSelfAssessments.error
      );
    }
  };
  useEffect(() => {
    fetchAppliedSelfAssessments();  
  }, []);

  const handleRowClick = (selfAssessment: AppliedSelfAssessment) => {
    setSelectedSelfAssessment(selfAssessment);
  };

  const handleExport = async (ASA_Id) => {
    onDebugMessage({
      content: `Exporting Self-Assessment ${ASA_Id}(handleExport)`,
      type: "Info",
    });
    const result = await exportStore.exportAppliedSelfAssessment(ASA_Id);
    if (result && "error" in result) {
      onDebugMessage({
        content: `Failed to Export Self-Assessment ${ASA_Id}(handleExport)->${result.error}`,
        type: "Error",
      });
      toast.error("Problems When Exporting!");
      return;
    }
    onDebugMessage({
      content: `Successfully Exported Self-Assessment ${ASA_Id}(handleExport)`,
      type: "Success",
    });
    toast.success("Self-Assessment Exported!");
  };

  const handleDepartmentSearch = async (departmentId) => {
    const filteredSelfAssessments =
      await appliedSelfAssessmentStore.getAppliedSelfAssessmentsByDepartment(
        departmentId
      );
    if (!("error" in filteredSelfAssessments)) {
      setAppliedSelfAssessments2(filteredSelfAssessments);
    } else {
      onDebugMessage({
        content: `Failed to Fetch Applied Self-Assessments by Department->${filteredSelfAssessments.error}`,
        type: "Error",
      });
    }
  };

  const handleRowDoubleClick = (selfAssessment: AppliedSelfAssessment) => {
    setSelectedSelfAssessment(selfAssessment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleActiveFilter = async () => {
    setFilterActive(!filterActive);
    if (!filterActive) {
      const activeSelfAssessments = await appliedSelfAssessmentStore.getAppliedSelfAssessmentsByStatus("A");
      if (!("error" in activeSelfAssessments)) {
        setAppliedSelfAssessments2(activeSelfAssessments);
      } else {
        console.error("Error fetching active self-assessments:", activeSelfAssessments.error);
      }
    } else {
      fetchAppliedSelfAssessments();  
    }
  };
  
  const renderTableContent = () => {
    return appliedSelfAssessments.map((selfAssessment) => {
      const date = new Date(selfAssessment.ASA_Date).toLocaleDateString();

      return (
        <tr
          key={selfAssessment.ASA_Id}
          onClick={() => handleRowClick(selfAssessment)}
          onDoubleClick={() => handleRowDoubleClick(selfAssessment)}
          className={
            selectedSelfAssessment?.ASA_Id === selfAssessment.ASA_Id
              ? "bg-gray-600"
              : ""
          }
        >
          <td className="px-4 py-2 text-center">{date}</td>
          <td className="px-4 py-2 text-center">
            {selfAssessment.rc_departments?.DPT_Name}
          </td>
          <td className="px-4 py-2 text-center">
            {selfAssessment.ASA_Status === "A" ? "Active" : "Inactive"}
          </td>
          <td className="flex px-4 py-2 space-x-2 justify-center">
            <Button
              onClick={() => handleRowDoubleClick(selfAssessment)}
              className="rounded-xl w-16"
            >
              View
            </Button>
            <Button
              onClick={() => handleExport(selfAssessment.ASA_Id)}
              className="rounded-xl w-16"
            >
              Export
            </Button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="form-control my-3 py-8 px-4 md:px-8 lg:px-16 w-full rounded-md bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <h4 className="text-2xl text-white text-center mb-4">
        Self-Assessments Reviews
      </h4>
      <DropdownMenu onSearch={handleDepartmentSearch} />
      <StateCheckbox isChecked={filterActive} onChange={toggleActiveFilter} />
      <div className="overflow-x-auto mt-4 rounded-md">
        <table className="table-auto w-full">
          <thead className="bg-violet-800 text-white">
            <tr>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>

          <tbody>{renderTableContent()}</tbody>
        </table>
      </div>
      {isModalOpen && selectedSelfAssessment && (
        <div className="fixed inset-0 h-screen p-4 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-0 right-0 my-4 mx-6 text-3xl text-white hover:text-gray-400"
            onClick={closeModal}
          >
            &times;
          </button>
          <SelfAssessment
            appliedSelfAssessment={selectedSelfAssessment}
            closeModal={closeModal}
          />
        </div>
      )}
    </div>
  );
};

export default Reviews;
