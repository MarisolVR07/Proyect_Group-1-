"use client";
import React, { useEffect, useState } from "react";
import Button from "../general/PrimaryButton";
import { useAppliedSelfAssessmentsStore } from "@/store/appliedSelfAssessmentStore";
import { AppliedSelfAssessment } from "@/app/types/entities";
import SelfAssessment from "./applied_self_assessment/v2/SelfAssessment";
import { useExportStore } from "@/store/excelStore";
import DropdownMenu from "@/components/reviews/DropDownMenuSearch";
import toast from "react-hot-toast";
import { DebugMessage } from "@/app/types/debugData";
import StateCheckbox from "@/components/reviews/Checkbox";
import Spinner from "@/components/skeletons/Spinner";

interface ReviewsProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const Reviews: React.FC<ReviewsProps> = ({ onDebugMessage }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const exportStore = useExportStore();
  const [filters, setFilters] = useState({
    active: false,
    inactive: false,
  });

  const [appliedSelfAssessments, setAppliedSelfAssessments2] = useState<
    AppliedSelfAssessment[]
  >([]);
  const [selectedSelfAssessment, setSelectedSelfAssessment] =
    useState<AppliedSelfAssessment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const appliedSelfAssessmentStore = useAppliedSelfAssessmentsStore();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  useEffect(() => {
    fetchAppliedSelfAssessments();
  }, [currentPage]);
  useEffect(() => {
    onDebugMessage({
      content: "Fetching Applied Self-Assessments",
      type: "Info",
    });
    

    const fetchAppliedSelfAssessments = async () => {
      const allAppliedSelfAssessments =
        await appliedSelfAssessmentStore.getAppliedSelfAssessmentPerPage(1);
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

    const intervalId = setInterval(fetchAppliedSelfAssessments, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const fetchAppliedSelfAssessments = async () => {
    setIsLoading(true);
    const allAppliedSelfAssessments =
      await appliedSelfAssessmentStore.getCompleteAppliedSelfassessments();
    if (!("error" in allAppliedSelfAssessments)) {
      setAppliedSelfAssessments2(allAppliedSelfAssessments);
    } else {
      onDebugMessage({
        content: `Failed to Fetch Applied Self-Assessments->${allAppliedSelfAssessments.error}`,
        type: "Error",
      });
    }
    setIsLoading(false);
  };

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
    setIsLoading(true);
    try {
      const filteredSelfAssessments =
        await appliedSelfAssessmentStore.getAppliedSelfAssessmentsByDepartment(
          departmentId
        );
      if (!("error" in filteredSelfAssessments)) {
        setAppliedSelfAssessments2(filteredSelfAssessments);
        onDebugMessage({
          content: `Filtered results for department ${departmentId}`,
          type: "Success",
        });
      } else {
        throw new Error(filteredSelfAssessments.error);
      }
    } catch (error) {
      onDebugMessage({
        content: `Failed to fetch assessments by department -> ${error.message}`,
        type: "Error",
      });
      toast.error(`Error fetching department data: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRowDoubleClick = (selfAssessment: AppliedSelfAssessment) => {
    setSelectedSelfAssessment(selfAssessment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const toggleFilter = async (filterType: "active" | "inactive") => {
    setIsLoading(true);
    const newFilters = {
      ...filters,
      [filterType]: !filters[filterType],
    };
    setFilters(newFilters);

    let filteredSelfAssessments: AppliedSelfAssessment[] = [];

    if (newFilters.active) {
      const activeSelfAssessments =
        await appliedSelfAssessmentStore.getAppliedSelfAssessmentsByStatus("A");
      if (!("error" in activeSelfAssessments)) {
        filteredSelfAssessments = activeSelfAssessments;
      } else {
        console.error(
          "Error fetching active assessments:",
          activeSelfAssessments.error
        );
        return;
      }
    }
    if (newFilters.inactive) {
      const inactiveSelfAssessments =
        await appliedSelfAssessmentStore.getAppliedSelfAssessmentsByStatus("I");
      if (!("error" in inactiveSelfAssessments)) {
        filteredSelfAssessments = [
          ...filteredSelfAssessments,
          ...inactiveSelfAssessments,
        ];
      } else {
        console.error(
          "Error fetching inactive assessments:",
          inactiveSelfAssessments.error
        );
        return;
      }
    }
    if (!newFilters.active && !newFilters.inactive) {
      fetchAppliedSelfAssessments();
    } else {
      setAppliedSelfAssessments2(filteredSelfAssessments);
      setIsLoading(false);
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
          <td className="px-4 py-2 space-x-2 justify-center hidden sm:flex">
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

  const handleNextPage = () => {
    if (appliedSelfAssessments.length === 5) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  return (
    <div className="lg:py-2 lg:px-2">
      <div className="form-control  sm:py-8 py-2 sm:px-4 px-1 md:px-8 lg:px-10 w-full rounded-md bg-gray-800 font-poppins font-semibold drop-shadow-xl">
        <h4 className="sm:text-2xl text-white text-center sm:mb-4">
          Self-Assessments Reviews
        </h4>

        <div className="sm:mt-4 mt-2 rounded-md bg-gradient-to-r text-white from-gray-800 via-violet-600 to-gray-800 sm:p-4 p-2 flex items-center justify-center space-x-4 z-20">
          <StateCheckbox
            isChecked={filters.active}
            onChange={() => toggleFilter("active")}
            label="Active"
          />
          <StateCheckbox
            isChecked={filters.inactive}
            onChange={() => toggleFilter("inactive")}
            label="Inactive"
          />
        </div>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="overflow-x-auto mt-4 rounded-md">
            <table className="table-auto w-full">
              <thead className="bg-violet-800 text-white">
                <tr>
                  <th className="sm:px-4 sm:py-2">Date</th>
                  <th className="sm:px-4 sm:py-2">Department</th>
                  <th className="sm:px-4 sm:py-2">Status</th>
                  <th className="hidden sm:table-cell sm:px-4 sm:py-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>{renderTableContent()}</tbody>
            </table>
            <div className="flex justify-between mt-2">
              <Button
                className="rounded-xl w-44 no-print"
                onClick={handlePreviousPage}
                disabled={currentPage === 0}
              >
                Previous
              </Button>
              <Button
                className="rounded-xl w-44 no-print"
                onClick={handleNextPage}
                disabled={appliedSelfAssessments.length < itemsPerPage}
              >
                Next
              </Button>
            </div>
          </div>
        )}
        {isModalOpen && selectedSelfAssessment && (
          <div className="fixed inset-0 bg-gray-900 h-screen bg-opacity-75 px-2 py-2 z-50">
            <button
              className="absolute top-0 right-0 text-3xl mx-7 my-5 z-50 text-white hover:text-gray-400"
              onClick={closeModal}
            >
              &times;
            </button>
            <SelfAssessment
              appliedSelfAssessment={selectedSelfAssessment}
              closeModal={closeModal}
              onDebugMessage={onDebugMessage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default Reviews;
