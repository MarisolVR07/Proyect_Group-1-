"use client";
import React, { useEffect, useState } from "react";
import CardsSection from "./CardsSectionBackoficce";
import DateTimePicker from "../general/DateTimePicker";
import SearchBar from "@/components/general/SearchBar";
import InputField from "../general/InputField";
import PrimaryButton from "../general/PrimaryButton";
import { useUserContextStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import Spinner from "@/components/skeletons/Spinner";
import { useParameterStore } from "@/store/parameterStore";
import { Parameter } from "@/app/types/entities";
import Button from "@/components/general/PrimaryButton";
import toast from "react-hot-toast";
import { useParametersContextStore } from "@/store/authStore";
import { User } from "@/app/types/entities";
import SkeletonLoader from "./SkeletonLoader";
import RolDropdown from "../general/RolDropdowm";
import StateCheckbox from "../general/StateCheckbox";
import DepartmentDropdown from "@/components/maintenance/users/DepartmentDropdown";
import { DebugMessage } from "@/app/types/debugData";

interface BackOfficeProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const BackOffice: React.FC<BackOfficeProps> = ({ onDebugMessage }) => {
  const { setCurrentParameters, currentParameters } =
    useParametersContextStore();
  const [searchQuery, setSearchQuery] = useState("");
  const { setCurrentUser, currentUser } = useUserContextStore();
  const { users, getUsers, getUsersPerPage, getUsersByName, updateUser } =
    useUserStore();

  const { updateParameter } = useParameterStore();
  const [isLoading, setIsLoading] = useState(false);
  const filteredUsers = users.filter(
    (user) => user.USR_Role === "none" || user.USR_Role === ""
  );
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [activationDate, setActivationDate] = useState<Date | null>();
  const [deactivationDate, setDeactivationDate] = useState<Date | null>();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleStatusChange = async (
    user: User,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onDebugMessage({
      content: `Updating status (handleStatusChange)`,
      type: "Info",
    });
    const isChecked = event.target.checked;
    const updatedUser = {
      ...user,
      USR_Status: isChecked ? "a" : "i",
    };
    const resp = await updateUser(updatedUser);
    if ("error" in resp) {
      onDebugMessage({
        content: `Error updating status (handleStatusChange)->${resp.error}`,
        type: "Error",
      });
      return;
    }
    onDebugMessage({
      content: `Status updated successfully (handleStatusChange)`,
      type: "Success",
    });
    toast.success("Status updated successfully");
  };

  const handleDepartmentChange = async (user: User, newDeptId: number) => {
    onDebugMessage({
      content: `Updating department (handleDepartmentChange)`,
      type: "Info",
    });
    const updatedUser: User = {
      ...user,
      USR_Department: newDeptId !== undefined ? newDeptId : null,
    };
    const resp = await updateUser(updatedUser);
    if ("error" in resp) {
      onDebugMessage({
        content: `Error updating department (handleDepartmentChange)->${resp.error}`,
        type: "Error",
      });
      return;
    }
    if (resp.USR_Id === currentUser?.USR_Id) {
      setCurrentUser(resp);
    }
    onDebugMessage({
      content: `Department updated successfully (handleStatusChange)`,
      type: "Success",
    });
    toast.success("Department updated successfully");
  };

  const handleRolChange = async (user: User, newRol: string) => {
    onDebugMessage({
      content: `Updating rol (handleRolChange)`,
      type: "Info",
    });
    const updatedUser: User = { ...user, USR_Role: newRol };
    const resp = await updateUser(updatedUser);
    if ("error" in resp) {
      onDebugMessage({
        content: `Error updating rol (handleRolChange)->${resp.error}`,
        type: "Error",
      });
      return;
    }
    onDebugMessage({
      content: `Rol updated successfully (handleStatusChange)`,
      type: "Success",
    });
    toast.success("Rol updated successfully");
  };

  const handleSearchChange = async (query: string) => {
    if (searchQuery === query) return;
    setSearchQuery(query);
    setIsLoading(true);
    setCurrentPage(0);
    setIsSearching(!!query);
    if (!query.trim()) return;
    try {
      if (query) {
        await getUsersByName(query, 1);
      } else {
        await getUsersPerPage(1);
      }
    } catch (error) {
      onDebugMessage({
        content: `Error searching users (handleSearchChange)->${error}`,
        type: "Error",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleNextPage = () => {
    if (users.length === 10) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 0 ? prevPage - 1 : 0));
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (isSearching && searchQuery) {
        await getUsersByName(searchQuery, currentPage);
      } else {
        await getUsersPerPage(currentPage);
      }
    } catch (error) {
      onDebugMessage({
        content: `Error fetching users (fetchData)->${error}`,
        type: "Error",
      });
    }
    setIsLoading(false);
  };

  const fetchParameters = () => {
    onDebugMessage({
      content: `Loading parameters (fetchParameters)`,
      type: "Info",
    });
    setIsLoading(true);
    try {
      if (currentParameters) {
        setEmail(currentParameters.PRM_Email || "");
        setInstitution(currentParameters.PRM_Institution || "");
        if (currentParameters.PRM_ActivationDate) {
          setActivationDate(new Date(currentParameters.PRM_ActivationDate));
        }
        if (currentParameters.PRM_DeactivationDate) {
          setDeactivationDate(new Date(currentParameters.PRM_DeactivationDate));
        }
      }
      onDebugMessage({
        content: `Parameters loaded correctly (fetchParameters)`,
        type: "Success",
      });
    } catch (error) {
      onDebugMessage({
        content: `Error fetching parameters (fetchParameters)->${error}`,
        type: "Error",
      });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    fetchParameters();
  }, []);

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleInstitutionChange = (newInstitution: string) => {
    setInstitution(newInstitution);
  };
  const handleRowClick = (user: User) => {
    setSelectedUserId(user.USR_Id);
  };
  const handleSave = async () => {
    onDebugMessage({
      content: `Saving parameters (handleSave)`,
      type: "Info",
    });
    const parameterToUpdate: Parameter = {
      PRM_Email: email,
      PRM_Institution: institution,
      PRM_ActivationDate: activationDate?.toISOString() ?? null,
      PRM_DeactivationDate: deactivationDate?.toISOString() ?? null,
    };
    try {
      const result = await updateParameter(parameterToUpdate);
      if ("error" in result) {
        onDebugMessage({
          content: `Failed to update parameters (handleSave)->${result.error}`,
          type: "Error",
        });
        toast.error("Failed saving parameters, please try again");
      } else {
        onDebugMessage({
          content: `Parameters updated successfully (handleSave)`,
          type: "Success",
        });
        toast.success("Parameters updated successfully");
        setCurrentParameters(result);
      }
    } catch (error) {
      onDebugMessage({
        content: `Error updating parameters (handleSave)->${error}`,
        type: "Error",
      });
    }
  };
  const renderTableContent = () => {
    if (isLoading) {
      return Array.from(new Array(5)).map((_, index) => (
        <SkeletonLoader key={index} />
      ));
    } else {
      return filteredUsers
        .slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)
        .map((user, index) => (
          <tr
            key={index}
            onClick={() => handleRowClick(user)}
            className={selectedUserId === user.USR_Id ? "bg-gray-600" : ""}
          >
            <td className="px-4 py-2">{user.USR_Email}</td>
            <td className="px-4 py-2">{user.USR_FullName}</td>
            <td className="no-print">
              <DepartmentDropdown
                selectedDepartment={user.USR_Department}
                onChange={(newDeptId) =>
                  handleDepartmentChange(user, newDeptId)
                }
              />
            </td>
            <td>
              <RolDropdown
                selectedRol={user.USR_Role}
                onChange={(newRol) => handleRolChange(user, newRol)}
              />
            </td>
            <td className="no-print">
              <StateCheckbox
                isChecked={user.USR_Status === "a"}
                onChange={(e) => handleStatusChange(user, e)}
              />
              <span className="text-white">
                {user.USR_Status === "a" ? "Active" : "Inactive"}
              </span>
            </td>
          </tr>
        ));
    }
  };

  return (
    <div className="items-center justify-center my-4 font-poppins drop-shadow-xl">
      <CardsSection />
      <div className="flex flex-col items-center justify-center space-y-4 mx-4 w-full">
        <div className="flex-1 bg-gray-700 p-8 rounded-xl border-2 border-white text-white overflow-x-auto min-h-[500px] w-full max-w-4xl mx-auto">
          <div className="w-full py-1 items-center justify-center text-center">
            <h2 className="text-xl text-white font-semibold">NEW USERS</h2>
          </div>
          <SearchBar onSearch={handleSearchChange} />
          {isLoading ? (
            <Spinner />
          ) : (
            <div className="overflow-x-auto mt-4 rounded-md">
              <table className="table-auto w-full text-color">
                <thead className="bg-violet-800 text-white">
                  <tr>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">FullName</th>
                    <th className="px-4 py-2">Department</th>
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>{renderTableContent()}</tbody>
              </table>
            </div>
          )}
          <div className="flex justify-between mt-2">
            <Button
              className="rounded-xl w-44"
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              className="rounded-xl w-44 no-print"
              onClick={handleNextPage}
              disabled={users.length < itemsPerPage}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="flex-1 bg-gray-700 p-3 text-center border-2 border-white rounded-xl overflow-hidden min-h-[500px] w-full max-w-4xl mx-auto">
          <h2 className="text-xl text-white mb-3 font-semibold">
            APP ACTIVATION/DEACTIVATION DATE-TIME
          </h2>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-10 items-center justify-center">
            <DateTimePicker
              text="Select activation date and time:"
              value={activationDate}
              onChange={setActivationDate}
            />
            <DateTimePicker
              text="Select deactivation date and time:"
              value={deactivationDate}
              onChange={setDeactivationDate}
            />
          </div>
          <div className="mt-3">
            <InputField
              type="text"
              label="Institution"
              placeholder="Enter the Institution Name"
              value={institution}
              onChange={handleInstitutionChange}
            />
          </div>
          <div className="mt-3">
            <h2 className="text-xl text-white font-semibold">EMAIL</h2>
            <InputField
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="save-section">
            <PrimaryButton
              onClick={handleSave}
              className="w-44 rounded-md mt-4 mx-auto"
            >
              Save
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BackOffice;
