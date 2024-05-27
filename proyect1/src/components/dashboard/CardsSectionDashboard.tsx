import React, { useEffect, useState } from "react";
import CardButton from "../general/CardButton";
import Icon from "../general/CardIcon";
import ListIcon from "../svg/ListIcon";
import FileExportIcon from "../svg/FileExportIcon";
import GearIcon from "../svg/GearIcon";
import { useUserContextStore } from "@/store/authStore";
import { getAppliedSelfAssessmentByDepartmentAndStatus } from "@/app/controllers/rc_appliedselfassessment/controller";

const CardsSection = () => {
  const { currentUser } = useUserContextStore();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  useEffect(() => {
    if (currentUser?.USR_Role === "admin") {
      setIsAdmin(true);
    }
  }, [currentUser]);
  const handleSelfAssessmentClick = async () => {
    if (currentUser) {
      const department = currentUser.USR_Department || 0;
      const status = "A";
      const selfAssessment =
        await getAppliedSelfAssessmentByDepartmentAndStatus(department, status);
      if ("error" in selfAssessment) {
        window.location.href = "/views/dashboard/self_assessment";
      } else {
        alert(
          "The self-assessment has already been carried out by your department."
        );
      }
    }
  };

  return (
    <section className="text-white font-poppins">
      <div className="container px-5 py-10 mx-auto rounded-t-xl">
        <div className="flex flex-col text-center w-full mb-10">
          <h1 className="text-3xl text-white font-semibold">
            Internal System Control
          </h1>
        </div>
        <div className="flex flex-wrap justify-between items-center text-center w-full px-20">
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
              className="flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mx-2"
            />
          ) : (
            <></>
          )}

          <CardButton
            onClick={handleSelfAssessmentClick}
            icon={
              <Icon>
                <ListIcon />
              </Icon>
            }
            title="Self-Assessment"
            description=""
            className="flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mx-2"
          />
          <CardButton
            href="/views/reports"
            icon={
              <Icon>
                <FileExportIcon />
              </Icon>
            }
            title="Reports"
            description=""
            className="flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mx-2"
          />
        </div>
      </div>
    </section>
  );
};

export default CardsSection;
