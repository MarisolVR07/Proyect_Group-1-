import React from "react";
import CardButton from "../general/CardButton";
import Icon from "../general/CardIcon";
import MantUsersIcon from "../svg/GearUsersIcon";
import ListIcon from "../svg/ListIcon";
import DocExelIcon from "../svg/DocExelIcon";
import InstitutionIcon from "../svg/InstitutionIcon";

const CardsSection = () => (
  <section className="text-white body-font font-poppins drop-shadow-xl">
    <div className="container px-5 py-10 mx-auto rounded-t-xl ">
      <div className="flex flex-col text-center w-full mb-4">
        <h1 className="text-3xl text-white font-semibold">BACKOFFICE</h1>
      </div>
      <CardButton
        href="/views/backoffice/Institution"
        icon={
          <Icon>
            <InstitutionIcon />
          </Icon>
        }
        title="Institution"
        description=""
        className="w-full text-center bg-gray-700 text-2xl"
      />
      <div className="flex flex-wrap w-full m-4 space-x-4 items-center justify-center text-center">
        <CardButton
          href="/views/backoffice/users"
          icon={
            <Icon>
              <MantUsersIcon />
            </Icon>
          }
          title="Users"
          description=""
          className="w-60 bg-gray-700  text-center"
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
          className="w-full bg-gray-700 text-center"
        />
        <CardButton
          href="/views/reports"
          icon={
            <Icon>
              <DocExelIcon />
            </Icon>
          }
          title="Reports"
          description=""
          className="w-60 bg-gray-700 text-center"
        />
      </div>
    </div>
  </section>
);

export default CardsSection;
