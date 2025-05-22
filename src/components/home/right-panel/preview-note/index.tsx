import { Chip, Typography } from "@mui/material";
import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import {
  CreateNoteState,
  PreviewNoteState,
  useCreateNote,
  usePreviewNote,
} from "../../../../store/store";
import { parseHTML } from "../../../../utils/functions";

const PreviewNote = () => {
  const noteData = usePreviewNote((state: PreviewNoteState) => state.noteData);
  const { title, content, tags } = noteData || {};
  const { setCreateModeOn, setInputData } = useCreateNote(
    (state: CreateNoteState) => state
  );

  const onEditClick = () => {
    setCreateModeOn(true);
    setInputData(noteData);
  };

  return (
    <div className="preview">
      <div className="title-wrapper">
        <Typography variant="h4">{title}</Typography>
        <div className="edit-icon" onClick={onEditClick}>
          <EditIcon sx={{ color: "var(--btn-links)" }} />
        </div>
      </div>
      <div className="space-base" />
      <div className="chip-wrapper">
        {!!tags?.length &&
          tags?.map((item) => (
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
      <Typography>{parseHTML(content)}</Typography>
    </div>
  );
};

export default PreviewNote;
