"use client";
import { Typography, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import ChipsRow from "./chips-row";
import {
  CreateNoteState,
  NoteState,
  PreviewNoteState,
  SavedNoteState,
  useCreateNote,
  usePreviewNote,
  useSavedNote,
} from "../../../../store/store";
import { parseHTML } from "../../../../utils/functions";
import { useRouter } from "next/navigation";

const NotesList = () => {
  const matches = useMediaQuery("(min-width:601px)");
  const router = useRouter();

  const { noteDetails, filteredNotes, getNotesFromLocalStorage } = useSavedNote(
    (state: SavedNoteState) => state
  );
  const { setPreviewModeOn, setNoteData } = usePreviewNote(
    (state: PreviewNoteState) => state
  );
  const setCreateModeOn = useCreateNote(
    (state: CreateNoteState) => state.setCreateModeOn
  );

  useEffect(() => {
    getNotesFromLocalStorage();
  }, [getNotesFromLocalStorage]);

  const onNoteClick = (item: NoteState) => {
    setCreateModeOn(false);
    setPreviewModeOn(true);
    setNoteData(item);
    if (!matches) {
      router.push("/Preview_Note");
    }
  };

  const noteDetailsToDisplay = filteredNotes?.length
    ? filteredNotes
    : noteDetails;

  return (
    <div className="notes-list-container">
      <div className="notes-list">
        {!!noteDetailsToDisplay?.length &&
          noteDetailsToDisplay?.map((item) => (
            <div
              key={item?.title}
              className="list-item"
              onClick={() => onNoteClick(item)}
            >
              <Typography className="title" variant="h6">
                {item?.title}
              </Typography>
              <div className="space-xs" />
              <Typography className="description" variant="subtitle2">
                {parseHTML(item?.content)}
              </Typography>
              <div className="space-s" />
              <ChipsRow chips={item?.tags} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NotesList;
