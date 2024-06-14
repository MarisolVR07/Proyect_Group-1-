"use client"
import PageUD from "@/components/maintenance/departments_unit/PageUD";
import Header from "@/components/header/NewHeader";
import DebugModeToggle from "@/components/debug_mode/DebugModeToggle";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import Cookies from "js-cookie";
import { verifyToken, DecodedToken } from "@/app/utils/verifyToken";
import { useRouter } from "next/navigation";
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from "react";
import { DebugMessage } from "@/app/types/debugData";

export default function Page() {
 
  return (
    <>
      <DebugModeToggle>
        <Header currentPage="/views/backoffice/unit" />
        <Toaster position="top-right" />
        <PageUD />
      </DebugModeToggle>
    </>
  );
}
