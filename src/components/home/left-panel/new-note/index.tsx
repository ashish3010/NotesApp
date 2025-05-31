"use client";
import { Typography, useMediaQuery } from "@mui/material";
import React from "react";
import {
  CreateNoteState,
  useCreateNote,
  useNavigationFlag,
} from "../../../../store/store";
import { useRouter } from "next/navigation";

const NewNote = () => {
  const setCreateModeOn = useCreateNote(
    (state: CreateNoteState) => state.setCreateModeOn
  );
  const setNavigationFlag = useNavigationFlag(
    (state) => state.setNavigationFlag
  );
  const matches = useMediaQuery("(min-width:601px)");
  const router = useRouter();

  const onNewNoteClick = () => {
    setCreateModeOn(true);
    if (!matches) {
      setNavigationFlag(true);
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
