import React from "react";
import CardButton from "../general/CardButton";
import Icon from "../general/CardIcon";
import MantUsersIcon from "../svg/GearUsersIcon";
import ListIcon from "../svg/ListIcon";
import FileExportIcon from "../svg/FileExportIcon";
import InstitutionIcon from "../svg/InstitutionIcon";

const CardsSection = () => (
  <section className="text-white body-font font-poppins ">
    <div className="container lg:py-10 mx-auto">
      <div className="flex flex-col text-center w-full mb-2 lg:mb-20">
        <h1 className="text-3xl text-white font-semibold">BACKOFFICE</h1>
      </div>
      <div className="container w-full px-3 lg:px-0 lg:mb-10">
        <CardButton
          href="/views/backoffice/unit"
          icon={
            <Icon>
              <InstitutionIcon />
            </Icon>
          }
          title="Departments Unit"
          description=""
          className="flex-1 text-center w-full bg-gray-700 rounded-lg shadow-lg mb-2 lg:mb-0"
        />
      </div>

      <div
        className={`flex-none lg:flex lg:flex-wrap lg:space-y-0 lg:justify-between items-center justify-center text-center w-full p-3 lg:p-0 `}
      >
        <CardButton
          href="/views/backoffice/users"
          icon={
            <Icon>
              <MantUsersIcon />
            </Icon>
          }
          title="Users"
          description=""
          className="flex-1 lg:w-[400px] text-center bg-gray-700 rounded-lg shadow-lg mb-2 lg:mb-0"
        />
        <CardButton
          href="/views/backoffice/create_self_assessment"
          icon={
            <Icon>
              <ListIcon />
            </Icon>
          }
          title="Self-Assessment"
          description=""
          className="flex-1 lg:w-[400px]  text-center bg-gray-700 rounded-lg shadow-lg mb-2 lg:mb-0"
        />
        <CardButton
          href="/views/self_assessment_review"
          icon={
            <Icon>
              <FileExportIcon />
            </Icon>
          }
          title="Reviews"
          description=""
          className="flex-1 lg:w-[400px] text-center bg-gray-700 rounded-lg shadow-lg mb-2 lg:mb-0"
        />
      </div>
    </div>
  </section>
);

export default CardsSection;
