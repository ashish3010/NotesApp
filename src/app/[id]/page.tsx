"use client";
import Header from "@/components/common/header";
import React, { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMediaQuery } from "@mui/material";
import CentralLoader from "@/components/common/central-loader";
import { NavigationFlagState, useNavigationFlag } from "@/store/store";

const CreateNote = React.lazy(
  () => import("@/components/home/right-panel/create-note")
);

const PreviewNote = React.lazy(
  () => import("@/components/home/right-panel/preview-note")
);

const CREATE_NOTE = "Create_Note";
const PREVIEW_NOTE = "Preview_Note";

const CreateNoteMobile = () => {
  const params = useParams();
  const matches = useMediaQuery("(min-width:601px)");
  const isNavigationFlag = useNavigationFlag(
    (state: NavigationFlagState) => state.isNavigationFlag
  );
  const id = params?.id;
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
        {id === CREATE_NOTE && <CreateNote />}
        {id === PREVIEW_NOTE && (
          <div style={{ padding: "24px" }}>
            <PreviewNote />
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateNoteMobile;
