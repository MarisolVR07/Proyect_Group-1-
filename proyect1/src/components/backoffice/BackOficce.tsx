"use client";
import React, { useEffect, useState } from "react";
import CardsSection from "./CardsSectionBackoficce";
import DateTimePicker from "../general/DateTimePicker";
import SearchBar from "../maintenance/users/SearchBar";
import Image from "next/image";
import InputField from "../general/InputField";
import PrimaryButton from "../general/PrimaryButton";
import { useUserContextStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import Spinner from "@/components/skeletons/Spinner";
import { useParameterStore } from "@/store/parameterStore";
import { Parameter } from "@/app/types/entities";
import Button from "@/components/general/PrimaryButton";
import toast from "react-hot-toast";
const BackOffice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoURL, setLogoURL] = useState<string | null>(null);
  const { currentUser } = useUserContextStore();
  const { users, getUsers, getUsersByName, updateUser } = useUserStore();
  const { parameters, getParameter, updateParameter, saveParameter } =
    useParameterStore();
  const [isLoading, setIsLoading] = useState(false);
  const filteredUsers = users.filter((user) => user.USR_Role === "none");
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [activationDate, setActivationDate] = useState<Date | null>();
  const [deactivationDate, setDeactivationDate] = useState<Date | null>();
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20;

  const convertFileToBlob = async (file: File): Promise<Blob> => {
    return new Blob([file], { type: file.type });
  };
  console.log(currentUser);
  const handleSearchChange = async (query: string) => {
    if (searchQuery === query) return;
    setSearchQuery(query);
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const results =
        query.length > 0 ? await getUsersByName(query) : await getUsers();
    } catch (error) {
      console.error("Error searching users", error);
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
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await getUsers();
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  //Parameters
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setLogoURL(url);
    }
  };

  useEffect(() => {
    const fetchParameters = async () => {
      setIsLoading(true);
      try {
        const params = await getParameter(1);
        if (!("error" in params)) {
          setEmail(params.PRM_Email || "");
          setInstitution(params.PRM_Institution || "");
          if (params.PRM_ActivationDate) {
            setActivationDate(new Date(params.PRM_ActivationDate));
          }
          if (params.PRM_DeactivationDate) {
            setDeactivationDate(new Date(params.PRM_DeactivationDate));
          }
          if (params.PRM_Logo) {
            const url = URL.createObjectURL(params.PRM_Logo);
            setLogoURL(url);
          }
        }
      } catch (error) {
        console.error("Failed to fetch parameters:", error);
      }
      setIsLoading(false);
    };

    fetchParameters();
  }, []);

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handleInstitutionChange = (newInstitution: string) => {
    setInstitution(newInstitution);
  };

  const handleSave = async () => {
    console.log("Save button clicked");
    const parameterToUpdate: Parameter = {
      PRM_Email: email,
      PRM_Institution: institution,
      PRM_ActivationDate: activationDate?.toISOString() ?? null,
      PRM_DeactivationDate: deactivationDate?.toISOString() ?? null,
      PRM_Logo: logoFile ? await convertFileToBlob(logoFile) : null,
    };
    console.log("Parameter to update:", parameterToUpdate);
    try {
      const result = await updateParameter(parameterToUpdate);
      toast.success("Parameters updated successfully");
      if ("error" in result) {
        console.error("Failed to update parameters:", result.error);
        toast.error("Failed saving parameters, please try again");
      } else {
        console.log("Parameters updated successfully:", result);
        toast.success("Parameters updated successfully");
      }
    } catch (error) {
      console.error("Error updating parameters:", error);
    }
  };
  return (
    <div className="items-center justify-center my-4 font-poppins drop-shadow-xl">
      <CardsSection />
      <div className="flex flex-col lg:flex-row items-start justify-center space-y-4 lg:space-y-0 lg:space-x-4 mx-4">
        <div className="flex-1 bg-gray-700 p-3 text-center border-2 border-white rounded-xl overflow-hidden min-h-[500px]">
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
          <div>
            <h2 className="text-xl text-white mb-3 font-semibold">LOGO</h2>
            <input type="file" onChange={handleLogoChange} />
            {logoFile && (
              <div className="my-4 flex justify-center">
                <div className="w-48 h-48 flex items-center justify-center">
                  <Image
                    src={URL.createObjectURL(logoFile)}
                    alt="Logo"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            )}
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
        <div className="flex-1 bg-gray-700 p-8 rounded-xl border-2 border-white text-white overflow-x-auto min-h-[500px]">
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
                    <th className="px-4 py-2">Role</th>
                    <th className="px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((userMap, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{userMap.USR_Email}</td>
                      <td className="px-4 py-2">{userMap.USR_FullName}</td>
                      <td className="px-4 py-2">{userMap.USR_Role}</td>
                      <td className="px-4 py-2">{userMap.USR_Status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className=" flex justify-between mt-2">
            <Button
              className="rounded-xl w-44 "
              onClick={handlePreviousPage}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              className="rounded-xl w-44"
              onClick={handleNextPage}
              disabled={(currentPage + 1) * itemsPerPage >= users.length}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BackOffice;
