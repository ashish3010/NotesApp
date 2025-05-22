"use client";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { RichUtils, EditorState } from "draft-js";
import {
  BOLD,
  ITALIC,
  SAVE,
  UNDERLINE,
  UNORDERED_LIST,
} from "../../../../../utils/constants";

interface ToolsPanelProps {
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  editorState: EditorState;
  onSaveNote: () => void;
}

const ToolsPanel = ({
  setEditorState,
  editorState,
  onSaveNote,
}: ToolsPanelProps) => {
  const isEditorEmpty = () => {
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText().trim();
    return plainText === "";
  };

  const onIconClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    key: string
  ): void => {
    e.preventDefault();
    if (isEditorEmpty()) {
      return;
    }
    let newState;
    switch (key) {
      case UNDERLINE:
      case BOLD:
      case ITALIC:
        newState = RichUtils.toggleInlineStyle(editorState, key);
        setEditorState(newState);
        break;
      case SAVE:
        onSaveNote();
        break;
      case UNORDERED_LIST:
        newState = RichUtils.toggleBlockType(editorState, key);
        setEditorState(newState);
        break;
      default:
        return;
    }
  };

  return (
    <div className="tools-panel">
      <div className="tools-container expanded">
        <div className="tools-icons">
          <div className="tools">
            <SaveIcon
              sx={{ color: "var(--text-primary)" }}
              onMouseDown={(e) => onIconClick(e, SAVE)}
            />
          </div>
          <div className="tools">
            <FormatBoldIcon
              sx={{ color: "var(--text-primary)" }}
              onMouseDown={(e) => onIconClick(e, BOLD)}
            />
          </div>
          <div className="tools">
            <FormatItalicIcon
              sx={{ color: "var(--text-primary)" }}
              onMouseDown={(e) => onIconClick(e, ITALIC)}
            />
          </div>
          <div className="tools">
            <FormatUnderlinedIcon
              sx={{ color: "var(--text-primary)" }}
              onMouseDown={(e) => onIconClick(e, UNDERLINE)}
            />
          </div>
          <div className="tools">
            <FormatListBulletedIcon
              sx={{ color: "var(--text-primary)" }}
              onMouseDown={(e) => onIconClick(e, UNORDERED_LIST)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPanel;
