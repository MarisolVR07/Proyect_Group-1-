import React, { useEffect, useState } from "react";
import CardButton from "../general/CardButton";
import Icon from "../general/CardIcon";
import ListIcon from "../svg/ListIcon";
import FileExportIcon from "../svg/FileExportIcon";
import GearIcon from "../svg/GearIcon";
import { useUserContextStore } from "@/store/authStore";

const CardsSection = () => {
  const { currentUser } = useUserContextStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    if (currentUser?.USR_Role === "admin") {
      setIsAdmin(true);
    }
  }, [currentUser]);

  return (
    <section className="text-white font-poppins">
      <div className="py-10 mx-auto rounded-t-xl px-4">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="text-3xl text-white font-semibold">
            Internal System Control
          </h1>
        </div>
        <div
          className={` ${
            isAdmin
              ? "space-y-5 lg:space-y-0 lg:justify-between flex-none lg:flex lg:flex-wrap"
              : "justify-center"
          } items-center justify-center text-center w-full`}
        >
          {isAdmin ? (
            <CardButton
              href="/views/backoffice"
              icon={
                <Icon>
                  <GearIcon />
                </Icon>
              }
              title="Backoffice"
              description=""
              className="flex-1 lg:w-[400px] text-center bg-gray-700 rounded-lg shadow-lg mb-2 lg:mb-0"
            />
          ) : (
            <></>
          )}
          <CardButton
            href="/views/dashboard/self_assessment"
            icon={
              <Icon>
                <ListIcon />
              </Icon>
            }
            title="Self-Assessment"
            description=""
            className={`flex-1  ${
              isAdmin ? "lg:w-[400px] 2xl:w-[700px]" : "w-full"
            } bg-gray-700 text-center rounded-lg shadow-lg mb-2 lg:mb-0`}
          />
          {isAdmin ? (
            <CardButton
              href="/views/self_assessment_review"
              icon={
                <Icon>
                  <FileExportIcon />
                </Icon>
              }
              title={`Reviews`}
              description=""
              className="flex-1 lg:w-[400px] text-center bg-gray-700 rounded-lg shadow-lg"
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default CardsSection;
