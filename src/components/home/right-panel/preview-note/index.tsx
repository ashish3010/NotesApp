"use client";
import { Chip, Tooltip, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  CreateNoteState,
  PreviewNoteState,
  useCreateNote,
  usePreviewNote,
  useSavedNote,
} from "../../../../store/store";
import { parseHTML } from "../../../../utils/functions";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const PreviewNote = () => {
  const noteData = usePreviewNote((state: PreviewNoteState) => state.noteData);
  const { title, content, tags, lastUpdated, id = "" } = noteData || {};
  const { setCreateModeOn, setInputData } = useCreateNote(
    (state: CreateNoteState) => state
  );
  const { onRemoveNote, noteDetails, clearNotes } = useSavedNote(
    (state) => state
  );
  const matches = useMediaQuery("(min-width:601px)");
  const router = useRouter();

  const onEditClick = () => {
    setCreateModeOn(true);
    setInputData(noteData);
    if (!matches) {
      router.push(`/Create_Note`);
    }
  };

  const onDeleteNote = () => {
    onRemoveNote(id);
    setCreateModeOn(true);
    setInputData(null);
    if (noteDetails.length === 1) {
      clearNotes();
    }
    if (!matches) {
      router.back();
    }
  };

  return (
    <div className="preview">
      <div className="title-wrapper">
        <div>
          <Typography variant="h4">{title}</Typography>
          <div className="space-base" />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Tooltip title="Delete Note">
            <div className="delete-icon" onClick={onDeleteNote}>
              <DeleteIcon sx={{ color: "var(--error)" }} />
            </div>
          </Tooltip>
          <Tooltip title="Edit Note">
            <div className="edit-icon" onClick={onEditClick}>
              <EditIcon sx={{ color: "var(--btn-links)" }} />
            </div>
          </Tooltip>
        </div>
      </div>
      {!!tags?.length && (
        <>
          <div className="chip-wrapper">
            {tags?.map((item) => (
              <Chip
                key={item}
                label={item}
                style={{
                  backgroundColor: "var(--tags-highlights)",
                  borderRadius: "var(--s)",
                }}
              />
            ))}
          </div>
          <div className="space-m" />
        </>
      )}

      <Typography style={{ color: "var(--hover)" }}>
        {`Last updated on: ${lastUpdated}`}
      </Typography>
      <div className="space-xxs" />
      <Typography>{parseHTML(content)}</Typography>
    </div>
  );
};

export default PreviewNote;
