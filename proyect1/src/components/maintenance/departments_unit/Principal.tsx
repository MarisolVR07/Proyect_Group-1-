"use client";

import React, { useState } from "react";
import Units from "./Units";
import Departments from "./Departments";

function Principal(){
  return (
    <div className="relative w-full flex flex-col items-center justify-center my-4 text-white font-poppins font-semibold drop-shadow-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-7 max-w-7xl space-y-4 md:space-y-0">
        <Units/>
        <Departments/>
      </div>
    </div>
  );
};

export default Principal;