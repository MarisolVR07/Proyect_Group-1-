import React from "react";
import CardButton from "../general/CardButton";
import Icon from "../general/CardIcon";
import MantUsersIcon from "../svg/GearUsersIcon";
import ListIcon from "../svg/ListIcon";
import FileExportIcon from "../svg/FileExportIcon";
import InstitutionIcon from "../svg/InstitutionIcon";

const CardsSection = () => (
  <section className="text-white body-font font-poppins ">
    <div className="container px-5 py-10 mx-auto rounded-t-xl">
    <div className="flex flex-col text-center w-full mb-20">
        <h1 className="text-3xl text-white font-semibold">BACKOFFICE</h1>
      </div>
      <div className="container mx-auto max-w-4xl rounded-t-xl mb-10">
        
  <CardButton
    href="/views/backoffice/unit"
    icon={
      <Icon>
        <InstitutionIcon />
      </Icon>
    }
    title="Departments Unit"
    description=""
    className="flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mb-2 lg:mb-0"
  />
</div>

      <div
          className="flex flex-wrap justify-center items-center text-center w-full lg:px-20"
          >
      <div  className={`flex-none lg:flex lg:flex-wrap${ "space-y-5 lg:space-y-0 lg:justify-between justify-center"} items-center justify-center text-center w-full lg:px-20`}>
        <CardButton
          href="/views/backoffice/users"
          icon={
            <Icon>
              <MantUsersIcon />
            </Icon>
          }
          title="Users"
          description=""
          className="flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mb-2 lg:mb-0"
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
          className="flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mb-2 lg:mb-0"
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
          className="flex-1 min-w-[300px] max-w-[1/3] text-center bg-gray-700 rounded-lg shadow-lg mb-2 lg:mb-0"
        />
      </div>
    </div>
    </div>
  </section>
);

export default CardsSection;
