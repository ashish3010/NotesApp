import { Typography } from "@mui/material";
import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { CreateNoteState, useCreateNote } from "../../../../store/store";

const NewNote = () => {
  const setCreateModeOn = useCreateNote(
    (state: CreateNoteState) => state.setCreateModeOn
  );

  return (
    <div className="new-note-right wh100" onClick={() => setCreateModeOn(true)}>
      <AddIcon />
      <Typography>Create new note</Typography>
    </div>
  );
};

export default NewNote;
