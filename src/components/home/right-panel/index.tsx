"use client";
import React from "react";
import "./style.css";
import CreateNote from "./create-note";
import NewNote from "./new-note";
import PreviewNote from "./preview-note";
import {
  CreateNoteState,
  PreviewNoteState,
  useCreateNote,
  usePreviewNote,
} from "../../../store/store";

const RightPanel = () => {
  const isCreateModeOn = useCreateNote(
    (state: CreateNoteState) => state.isCreateModeOn
  );
  const isPreviewModeOn = usePreviewNote(
    (state: PreviewNoteState) => state.isPreviewModeOn
  );

  const renderContent = () => {
    if (isCreateModeOn) {
      return <CreateNote />;
    }
    if (isPreviewModeOn) {
      return <PreviewNote />;
    }
    return <NewNote />;
  };

  return <div className="wh100">{renderContent()}</div>;
};

export default RightPanel;
