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
      <div className="container px-5 py-10 mx-auto rounded-t-xl">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="text-3xl text-white font-semibold">
            Internal System Control
          </h1>
        </div>
        <div
          className={`flex-none lg:flex lg:flex-wrap${
            isAdmin
              ? "space-y-5 lg:space-y-0 lg:justify-between"
              : "justify-center"
          } items-center justify-center text-center w-full lg:px-20`}
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
              className="flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-800 rounded-lg shadow-lg mb-2 lg:mb-0"
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
            className="flex-1 min-w-[300px] max-w-[1/3] bg-violet-700 text-center bg- rounded-lg shadow-lg mb-2 lg:mb-0"
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
              className="flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-800 rounded-lg shadow-lg"
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
