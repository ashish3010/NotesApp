"use client";
import { Typography, useMediaQuery } from "@mui/material";
import React from "react";
import { CreateNoteState, useCreateNote } from "../../../../store/store";
import { useRouter } from "next/navigation";

const NewNote = () => {
  const setCreateModeOn = useCreateNote(
    (state: CreateNoteState) => state.setCreateModeOn
  );
  const matches = useMediaQuery("(min-width:601px)");
  const router = useRouter();

  const onNewNoteClick = () => {
    setCreateModeOn(true);
    if (!matches) {
      router.push("/Create_Note");
    }
  };

  return (
    <div className="new-note" onClick={onNewNoteClick}>
      <Typography>New Note</Typography>
    </div>
  );
};

export default NewNote;
