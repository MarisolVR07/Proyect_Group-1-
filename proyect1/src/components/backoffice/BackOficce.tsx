"use client";
import React, { useEffect, useState } from "react";
import CardsSection from "./CardsSectionBackoficce";
import DateTimePicker from "../general/DateTimePicker";
import SearchBar from "../maintenance/users/SearchBar";
import Image from "next/image";
import InputField from "../general/InputField";
import PrimaryButton from "../general/PrimaryButton";
import { useAuthStore } from "@/store/authStore";
import { useUserStore } from "@/store/userStore";
import Spinner from "@/components/skeletons/Spinner";

const BackOffice = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoURL, setLogoURL] = useState<string | null>(null);
  const { currentUser } = useAuthStore();
  const { users, getUsers, getUsersByName, updateUser } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const filteredUsers = users.filter(user => user.USR_Role === "none");
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

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setLogoFile(file);
      const url = URL.createObjectURL(file);
      setLogoURL(url);
    }
  };

  return (
    <div className="items-center justify-center my-4 font-poppins drop-shadow-xl">
      <CardsSection />
      <div className="flex flex-col md:flex-row space-x-0 md:space-x-3 mx-9 text-center justify-center">
        <div className="bg-gray-700 p-3 text-center items-center justify-center border-2 border-white rounded-xl">
          <h2 className="text-xl text-center text-white mb-3 font-semibold">
            APP ACTIVATION/DEACTIVATION DATE-TIME
          </h2>
          <div className="flex flex-col md:flex-row space-x-0 md:space-x-32 items-center justify-center">
            <DateTimePicker text="Select activation date and time:" />
            <DateTimePicker text="Select deactivation date and time:" />
          </div>
          <div className="mt-3">
            <h2 className="text-xl text-center text-white font-semibold">
              INSTITUTION
            </h2>
            <InputField type="text" label="" placeholder="Institution" />
          </div>
          <div className="mt-3">
            <h2 className="text-xl text-center text-white font-semibold">
              EMAIL
            </h2>
            <InputField type="email" label="" placeholder="Email" />
          </div>
          <div className="">
            <h2 className="text-xl text-center text-white mb-3 font-semibold">
              LOGO
            </h2>
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
          <PrimaryButton className="w-44 rounded-md mt-4 mx-auto">
            Save
          </PrimaryButton>
        </div>
        <div className="form-control flex-1 p-8 rounded-xl bg-gray-700 border-2 border-white text-white">
          <div className=" w-full h-10 py-1 items-center justify-center text-center">
            <h2 className="text-xl text-white font-semibold">NEW USERS</h2>
          </div>

          <div className=" w-full px-3 pb-3 pt-4 mb-1 bg-gray-600 rounded-md items-center justify-center">
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
                      <th className="px-4 py-2 text-color">Rol</th>
                      <th className="px-4 py-2 text-color">State</th>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackOffice;
