import Button from "@/components/general/PrimaryButton";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { useUserStore } from "@/store/userStore";
import { useUserContextStore } from "@/store/authStore";
import Spinner from "@/components/skeletons/Spinner";
import DepartmentDropdown from "./DepartmentDropdown";
import RolDropdown from "./RolDropdowm";
import StateCheckbox from "./StateCheckbox";
import { User } from "@/app/types/entities";
import toast from 'react-hot-toast';

interface DebugMessage {
  content: string;
  type: "Error" | "Info" | "Warning" | "Success";
}

interface UsersProps {
  onDebugMessage: (message: DebugMessage) => void;
}

const Users: React.FC<UsersProps> = ({ onDebugMessage }) => {
  useEffect(() => {});
  const [searchQuery, setSearchQuery] = useState("");
  const [editUserId, setEditUserId] = useState<number | null>(null);
  const { users, getUsers, getUsersByName, updateUser } = useUserStore();
  const { setCurrentUser, currentUser } = useUserContextStore();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;
  const handlePrintClick = () => {
    window.print();
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getUsers();
        onDebugMessage({
          content: "Successfully Obtained Users",
          type: "Success",
        });
      } catch (error) {
        console.error("Failed to fetch users", error);
        onDebugMessage({ content: "Failed to Fetch Users", type: "Error" });
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleStatusChange = (
    user: User,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;
    console.log(
      `Checkbox para usuario ${user.USR_Id} intenta cambiar a: ${
        isChecked ? "Active" : "Inactive"
      }`
    );
    const updatedUser = {
      ...user,
      USR_Status: isChecked ? "a" : "i",
    };
    updateUser(updatedUser);
    toast.success("Status updated successfully");
  };

  const handleDepartmentChange = async (user: User, newDeptId: number) => {
    console.log(
      `Usuario ${user.USR_Id} intenta cambiar de departamento a: ${newDeptId}`
    );
    const updatedUser: User = {
      ...user,
      USR_Department: newDeptId !== undefined ? newDeptId : null,
    };
    const resp = await updateUser(updatedUser);
    if ("error" in resp) {
      console.error("Error updating department", resp.error);
      return;
    }
    if (resp.USR_Id === currentUser?.USR_Id) {
      setCurrentUser(resp);
    }
    toast.success("Department updated successfully");
  };

  const handleRolChange = (user: User, newRol: string) => {
    const updatedUser: User = { ...user, USR_Role: newRol };
    updateUser(updatedUser);
    toast.success("Rol updated successfully");
};

  const handleSearchChange = async (query: string) => {
    if (searchQuery === query) return;
    setSearchQuery(query);
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const results = query.length > 0 ? await getUsersByName(query) : await getUsers();
    } catch (error) {
      console.error("Error searching users", error);
      onDebugMessage({ content: "Error searching users", type: "Error" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextPage = () => {
    if ((currentPage + 1) * itemsPerPage < users.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="form-control my-3 py-8 px-4 md:px-8 lg:px-16 w-full rounded-md bg-gray-800 font-poppins font-semibold drop-shadow-xl">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="m-5 print-only">
          <h5 className="text-sm text-white text-center mb-4 text-color">
            Current user: {currentUser?.USR_FullName}
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
      <h4 className="text-2xl text-white text-center mb-4 print-only text-color">
        USERS
      </h4>
      <SearchBar onSearch={handleSearchChange} />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto mt-4 rounded-md print-only">
          <table className="table-auto w-full text-color">
            <thead className="bg-violet-800 text-white">
              <tr>
                <th className="px-4 py-2 text-color">Email</th>
                <th className="px-4 py-2 text-color">FullName</th>
                <th className="px-4 py-2 text-color no-print">Department</th>
                <th className="px-4 py-2 text-color ">Rol</th>
                <th className="px-4 py-2 text-color no-print">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((userMap, index) => (
                <tr key={index}>
                  <td className="px-4 py-2">{userMap.USR_Email}</td>
                  <td className="px-4 py-2">{userMap.USR_FullName}</td>
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
                  <td className="no-print">
                    <StateCheckbox
                      isChecked={userMap.USR_Status === "a"}
                      onChange={(e) => handleStatusChange(userMap, e)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between mt-2">
            <Button className="rounded-xl w-44 no-print" onClick={handlePreviousPage} disabled={currentPage === 0}>Previous</Button>
            <Button className="rounded-xl w-44 no-print" onClick={handleNextPage} disabled={(currentPage + 1) * itemsPerPage >= users.length}>Next</Button>
          </div>
        </div>
      )}
      <div className="flex flex-col md:flex-row justify-between mt-4 items-center"></div>
    </div>
  );
};

export default Users;
