"use client";
import Header from "@/components/common/header";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import CentralLoader from "@/components/common/central-loader";
import { NavigationFlagState, useNavigationFlag } from "@/store/store";
import CreateNote from "@/components/home/right-panel/create-note";

const CreateNoteMobile = () => {
  const matches = useMediaQuery("(min-width:601px)");
  const isNavigationFlag = useNavigationFlag(
    (state: NavigationFlagState) => state.isNavigationFlag
  );
  const router = useRouter();

  useEffect(() => {
    if (matches || !isNavigationFlag) {
      router.replace("/");
    }
  }, [matches, router, isNavigationFlag]);

  if (matches || !isNavigationFlag) return <CentralLoader />;

  return (
    <div>
      <Header />
      <div
        style={{
          marginTop: "56px",
          width: "100%",
          height: "calc(100vh - 56px)",
          overflow: "hidden",
        }}
      >
        <CreateNote />
      </div>
    </div>
  );
};

export default CreateNoteMobile;
