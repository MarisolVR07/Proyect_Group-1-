import React from "react";
import CardButton from "../general/CardButton";
import Icon from "../general/CardIcon";
import MantUsersIcon from "../svg/GearUsersIcon";
import ListIcon from "../svg/ListIcon";
import FileExportIcon from "../svg/FileExportIcon";
import InstitutionIcon from "../svg/InstitutionIcon";

const CardsSection = () => (
  <section className="text-white body-font font-poppins drop-shadow-xl">
    <div className="container mx-auto rounded-t-xl ">
      <div className="flex flex-col text-center w-full mb-4">
        <h1 className="text-3xl text-white font-semibold">BACKOFFICE</h1>
      </div>
      <CardButton
        href="/views/backoffice/unit"
        icon={
          <Icon>
            <InstitutionIcon />
          </Icon>
        }
        title="Departments Unit"
        description=""
        className="w-full text-center bg-gray-700 text-2xl"
      />
      <div className="flex flex-wrap w-full my-4 items-center justify-between text-center">
        <CardButton
          href="/views/backoffice/users"
          icon={
            <Icon>
              <MantUsersIcon />
            </Icon>
          }
          title="Users"
          description=""
          className="w-96 bg-gray-700  text-center"
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
          className="w-96 bg-gray-700 text-center"
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
          className="w-96 bg-gray-700 text-center"
        />
      </div>
    </div>
  </section>
);

export default CardsSection;
