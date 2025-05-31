"use client";
import Header from "@/components/common/header";
import React from "react";
import PreviewNote from "@/components/home/right-panel/preview-note";

const CreateNoteMobile = () => {
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
        <div style={{ padding: "24px" }}>
          <PreviewNote />
        </div>
      </div>
    </div>
  );
};

export default CreateNoteMobile;
