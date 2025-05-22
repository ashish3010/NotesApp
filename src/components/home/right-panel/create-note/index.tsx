"use client";

import React, { useEffect, useRef, useState } from "react";
import { Button, TextareaAutosize } from "@mui/material";
import Tools from "./tools";
import {
  Editor,
  EditorState,
  RichUtils,
  convertFromHTML,
  ContentState,
} from "draft-js";
import { convertToHTML } from "draft-convert";
import "draft-js/dist/Draft.css";
import {
  CreateNoteState,
  useCreateNote,
  useSavedNote,
} from "../../../../store/store";
import HashtagChips from "./chips";
import { invokeGemini } from "../../../../utils/gemini";

const CreateNote = () => {
  const titleRef = useRef<HTMLTextAreaElement | null>(null);
  const tagRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<Editor | null>(null);
  const setNoteDetails = useSavedNote(
    (state: {
      setNoteDetails: (note: {
        title: string;
        tags: string[];
        content: string;
      }) => void;
    }) => state.setNoteDetails
  );
  const inputData = useCreateNote((state: CreateNoteState) => state.inputData);
  const [currentNote, setCurrentNote] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const [titleHeight, setTitleHeight] = useState<number>(0);
  const [tagsHeight, setTagsHeight] = useState<number>(0);

  const [noteTitle, setNoteTitle] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>(() =>
    EditorState.createEmpty()
  );

  const [tags, setTags] = useState<string[]>([]);

  const handleKeyCommand = (command: string): "handled" | "not-handled" => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  useEffect(() => {
    if (inputData?.content) {
      try {
        const blocksFromHTML = convertFromHTML(inputData.content);
        const contentState = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error("Failed to parse content", error);
      }
    }
    if (inputData?.title) {
      setNoteTitle(inputData.title);
    }
    if (inputData?.tags) {
      setTags(inputData.tags);
    }
  }, [inputData]);

  useEffect(() => {
    if (!titleRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === titleRef.current) {
          setTitleHeight((entry.target as HTMLElement).offsetHeight);
        }
      }
    });
    observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!tagRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === tagRef.current) {
          setTagsHeight((entry.target as HTMLElement).offsetHeight);
        }
      }
    });
    observer.observe(tagRef.current);
    return () => observer.disconnect();
  }, []);

  const customConvertToHTML = convertToHTML({
    styleToHTML: (style: string) => {
      if (style === "BOLD") return <strong />;
      if (style === "ITALIC") return <em />;
      if (style === "UNDERLINE") return <u />;

      return null;
    },
  });

  const onSaveNote = () => {
    const contentState = editorState.getCurrentContent();
    const html = customConvertToHTML(contentState);

    const noteDetails = {
      title: noteTitle,
      tags,
      content: html,
    };
    setNoteDetails(noteDetails);
  };

  const onSummarise = async () => {
    const contentState = editorState.getCurrentContent();
    const html = customConvertToHTML(contentState);
    setCurrentNote(html);
    setLoading(true);
    try {
      const res = await invokeGemini(
        `summarise this note and return a html string: ${html}`
      );
      const blocksFromHTML = convertFromHTML(
        res?.replace("```html", "")?.replace("```", "")
      );
      const contentState = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );
      setEditorState(EditorState.createWithContent(contentState));
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const showOriginal = () => {
    console.log(currentNote, "currentNote");
    const blocksFromHTML = convertFromHTML(currentNote);
    const contentState = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );
    setEditorState(EditorState.createWithContent(contentState));
  };

  return (
    <div className="card wh100 create-note">
      <TextareaAutosize
        ref={titleRef}
        placeholder="Your Idea Title..."
        minRows={1}
        value={noteTitle}
        onChange={(e) => setNoteTitle(e.target.value)}
        maxRows={6}
        style={{
          width: "100%",
          fontSize: "var(--m)",
          color: "var(--text-primary)",
          backgroundColor: "var(--background)",
          border: "none",
          outline: "none",
          resize: "none",
        }}
      />
      <div className="space-base" />
      <Tools
        setEditorState={setEditorState}
        editorState={editorState}
        onSaveNote={onSaveNote}
      />
      <div className="space-base" />
      <div ref={tagRef} className="chip-wrapper">
        <HashtagChips tags={tags} setTags={setTags} />
      </div>

      <div className="space-base" />
      <div
        style={{
          height: `calc(100% - ${titleHeight + tagsHeight + 88}px)`,
          overflowY: "scroll",
        }}
      >
        <div
          style={{
            minHeight: `calc(100% - ${titleHeight + tagsHeight + 88}px)`,
          }}
          onClick={() =>
            contentRef.current &&
            contentRef.current.focus &&
            contentRef.current.focus()
          }
        >
          <Editor
            ref={contentRef}
            editorState={editorState}
            onChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
            placeholder="Start writing here..."
          />
        </div>
        <div className="space-base" />
        <div style={{ display: "flex", gap: "var(--s)" }}>
          {editorState.getCurrentContent()?.getPlainText() && (
            <Button
              style={{
                backgroundColor: "var(--btn-links)",
                color: "var(--background)",
                opacity: loading ? 0.8 : 1,
                width: 120,
              }}
              disabled={loading}
              loading={loading}
              onClick={onSummarise}
            >
              {loading ? "" : "Summarise"}
            </Button>
          )}
          {currentNote && (
            <Button
              style={{
                backgroundColor: "var(--btn-links)",
                color: "var(--background)",
              }}
              onClick={showOriginal}
            >
              Show original
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateNote;
