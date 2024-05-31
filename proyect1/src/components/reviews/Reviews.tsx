"use client";
import React, { useEffect, useState } from "react";
import Button from "../general/PrimaryButton";
import SearchBar from "./SearchBar";
import { useAppliedSelfAssessmentsStore } from "@/store/appliedSelfAssessmentStore";
import { AppliedSelfAssessment } from "@/app/types/entities";
import SelfAssessment from "./applied_self_assessment/SelfAssessmentReview";

const Reviews: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [appliedSelfAssessments, setAppliedSelfAssessments] = useState<
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
    const fetchAppliedSelfAssessments = async () => {
      const allAppliedSelfAssessments =
        await appliedSelfAssessmentStore.getCompleteAppliedSelfassessments();
      if (!("error" in allAppliedSelfAssessments)) {
        setAppliedSelfAssessments(allAppliedSelfAssessments);
      } else {
        console.error(
          "Error fetching AppliedSelfAssessments:",
          allAppliedSelfAssessments.error
        );
      }
    };

    fetchAppliedSelfAssessments();
  }, []);

  const handleRowClick = (selfAssessment: AppliedSelfAssessment) => {
    setSelectedSelfAssessment(selfAssessment);
  };

  const handleRowDoubleClick = (selfAssessment: AppliedSelfAssessment) => {
    setSelectedSelfAssessment(selfAssessment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="form-control my-3 py-8 px-4 md:px-8 lg:px-16 w-full rounded-md bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <h4 className="text-2xl text-white text-center mb-4">
        Self-Assessments Reviews
      </h4>
      <SearchBar onSearch={handleSearchChange} />
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
          <tbody>
            {appliedSelfAssessments.map((selfAssessment) => (
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
                <td className="px-4 py-2">{selfAssessment.ASA_Date}</td>
                <td className="px-4 py-2">
                  {selfAssessment.rc_departments?.DPT_Name}
                </td>
                <td className="px-4 py-2">
                  {selfAssessment.ASA_Status === "A" ? "Active" : "Inactive"}
                </td>
                <td className="flex px-4 py-2 space-x-2">
                  <Button
                    onClick={() => handleRowDoubleClick(selfAssessment)}
                    className="rounded-xl w-16"
                  >
                    View
                  </Button>
                  <Button className="rounded-xl w-16">Export</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && selectedSelfAssessment && (
        <div className="fixed inset-0 h-screen bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <button
            className="absolute top-0 right-0 m-4 text-gray-500 hover:text-gray-700"
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
