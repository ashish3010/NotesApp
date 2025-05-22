"use client";
import { Typography } from "@mui/material";
import React from "react";
import { CreateNoteState, useCreateNote } from "../../../../store/store";

const NewNote = () => {
  const setCreateModeOn = useCreateNote(
    (state: CreateNoteState) => state.setCreateModeOn
  );

  return (
    <div className="new-note" onClick={() => setCreateModeOn(true)}>
      <Typography>New Note</Typography>
    </div>
  );
};

export default NewNote;
