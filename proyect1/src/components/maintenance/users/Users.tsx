import Button from "@/components/general/PrimaryButton";
import React, { useEffect, useState } from "react";
import SearchBar from "@/components/maintenance/users/SearchBar";
import { useUserStore } from "@/store/userStore";
import { useUserContextStore } from "@/store/authStore";
import Spinner from "@/components/skeletons/Spinner";
import DepartmentDropdown from "./DepartmentDropdown";
import RolDropdown from "@/components/general/RolDropdowm";
import StateCheckbox from "@/components/general/StateCheckbox";
import { User } from "@/app/types/entities";
import toast from "react-hot-toast";
import { DebugMessage } from "@/app/types/debugData";

interface UsersProps {
  onDebugMessage?: (message: DebugMessage) => void;
}

const Users: React.FC<UsersProps> = ({ onDebugMessage }) => {
  useEffect(() => {});

  const [searchQuery, setSearchQuery] = useState("");
  const { users, getUsers, getUsersByName, getUsersPerPage, updateUser } =
    useUserStore();
  const { setCurrentUser, currentUser } = useUserContextStore();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const itemsPerPage = 20;
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handlePrintClick = () => {
    window.print();
  };

  useEffect(() => {
    const fetchData = async () => {
      onDebugMessage({ content: "Fetching users (fetchData)", type: "Info" });
      setIsLoading(true);
      try {
        if (isSearching && searchQuery) {
          await getUsersByName(searchQuery, currentPage);
        } else {
          await getUsersPerPage(currentPage);
        }
        onDebugMessage({
          content: "Users fetched successfully.",
          type: "Success",
        });
      } catch (error) {
        console.error(`Failed to fetch users (fetchData)->${error}`);
        onDebugMessage({ content: "Failed to Fetch Users", type: "Error" });
      }
      setIsLoading(false);
    };
    fetchData();
    setUser(currentUser);
  }, [currentPage, searchQuery, isSearching]);

  const handleStatusChange = async (
    user: User,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onDebugMessage({
      content: "Changing user status (handleStatusChange)",
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
    toast.success("Status updated successfully");
    onDebugMessage({
      content: "Status updated successfully (handleStatusChange)",
      type: "Success",
    });
  };

  const handleDepartmentChange = async (user: User, newDeptId: number) => {
    console.log(user)
    onDebugMessage({
      content: "Changing user department (handleDepartmentChange)",
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
    toast.success("Department updated successfully");
    onDebugMessage({
      content: "Department updated successfully(handleDepartmentChange)",
      type: "Success",
    });
  };

  const handleRolChange = async (user: User, newRol: string) => {
    onDebugMessage({
      content: "Changing user rol (handleRolChange)",
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
      content: "Rol updated successfully (handleRolChange)",
      type: "Success",
    });
    toast.success("Rol updated successfully");
  };

  const handleSearchChange = async (query: string) => {
    if (searchQuery === query) return;
    setSearchQuery(query);
    setCurrentPage(0);
    setIsSearching(!!query);
    setIsLoading(true);
    if (!query.trim()) return;
    setIsLoading(true);
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

  const handleRowClick = (user: User) => {
    setSelectedUserId(user.USR_Id);
  };

  return (
    <div className="form-control lg:my-3 lg:py-8 px-1 md:px-8 lg:px-16 w-full rounded-md bg-gray-700 font-poppins font-semibold drop-shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="m-5 print-only">
          <h5 className="text-sm text-white text-center lg:mb-4 text-color">
            Current user: {user?.USR_FullName}
          </h5>
        </div>
        <Button
          onClick={handlePrintClick}
          className="md:w-auto md:px-10 md:mt-0 rounded-xl ml-auto no-print"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0 .229 2.523a1.125 1.125 0 0 1-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0 0 21 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 0 0-1.913-.247M6.34 18H5.25A2.25 2.25 0 0 1 3 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 0 1 1.913-.247m10.5 0a48.536 48.536 0 0 0-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5Zm-3 0h.008v.008H15V10.5Z"
            />
          </svg>
        </Button>
      </div>
      <h4 className="text-2xl text-white text-center lg:mb-4 print-only text-color">
        USERS
      </h4>
      <SearchBar onSearch={handleSearchChange} />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-auto mt-4 rounded-md print-only">
          <table className="table-auto w-full text-color ">
            <thead className="bg-violet-800 text-white mb-2">
              <tr>
                <th className="hidden sm:table-cell lg:px-4 lg:py-2 text-xs lg:text-base">
                  Email
                </th>
                <th className="lg:px-4 lg:py-2 text-xs lg:text-base">
                  FullName
                </th>
                <th className="lg:px-4 lg:py-2 text-xs lg:text-base no-print">
                  Department
                </th>
                <th className="lg:px-4 lg:py-2 text-xs lg:text-base">Rol</th>
                <th className="lg:px-4 lg:py-2 text-xs lg:text-base no-print">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((userMap, index) => (
                <tr
                  key={index}
                  onClick={() => handleRowClick(userMap)}
                  className={
                    selectedUserId === userMap.USR_Id
                      ? "bg-gray-600 text-center"
                      : "text-center"
                  }
                >
                  <td className="lg:px-4 lg:py-2 text-xs lg:text-base hidden sm:flex">
                    {userMap.USR_Email}
                  </td>
                  <td className="lg:px-4 lg:py-2 text-xs lg:text-base ">
                    {userMap.USR_FullName}
                  </td>
                  <td className="no-print">
                    <DepartmentDropdown
                      selectedDepartment={userMap.USR_Department}
                      onChange={(newDeptId) =>
                        handleDepartmentChange(userMap, newDeptId)
                      }
                    />
                  </td>
                  <td>
                    <RolDropdown
                      selectedRol={userMap.USR_Role}
                      onChange={(newRol) => handleRolChange(userMap, newRol)}
                    />
                  </td>
                  <td className="no-print flex items-center text-xs lg:text-base lg:space-x-1">
                    <StateCheckbox
                      isChecked={userMap.USR_Status === "a"}
                      onChange={(e) => handleStatusChange(userMap, e)}
                    />
                    <span className="text-white">
                      {userMap.USR_Status === "a" ? "Active" : "Inactive"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
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
              disabled={users.length < itemsPerPage}
            >
              Next
            </Button>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between mt-4 items-center"></div>
    </div>
  );
};

export default Users;
