'use client'; // ✅ very important

import React, { useEffect, useRef, useState } from 'react'
import { Chip, TextareaAutosize } from '@mui/material'
import Tools from './tools';
import { Editor, EditorState, RichUtils, convertFromHTML, ContentState } from 'draft-js';
import { convertToHTML } from 'draft-convert';
import 'draft-js/dist/Draft.css';
import CloseIcon from '@mui/icons-material/Close';
import { colorStyleMap } from '@/utils/constants';
import { useCreateNote, useSavedNote } from '@/store/store';

const CreateNote = () => {
  const titleRef = useRef(null);
  const tagRef = useRef(null);
  const contentRef = useRef(null);
  const setNoteDetails = useSavedNote((state: any) => state.setNoteDetails);
  const inputData = useCreateNote((state: any) => state.inputData);

  const [titleHeight, setTitleHeight] = useState(0);
  const [tagsHeight, setTagsHeight] = useState(0);

  const [noteTitle, setNoteTitle] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [tags, setTags] = useState([])

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return 'handled';
    }
    return 'not-handled';
  };



  useEffect(() => {
    if (inputData?.content) {
      try {
        const contentState = convertFromHTML(inputData.content); // call it
        setEditorState(EditorState.createWithContent(contentState));
      } catch (error) {
        console.error('Failed to parse content', error);
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
      for (let entry of entries) {
        if (entry.target === titleRef.current) {
          setTitleHeight(entry.target.offsetHeight);
        }
      }
    });
    observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!tagRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === tagRef.current) {
          setTagsHeight(entry.target.offsetHeight);
        }
      }
    });
    observer.observe(tagRef.current);
    return () => observer.disconnect();
  }, []);

  const customConvertToHTML = convertToHTML({
    styleToHTML: (style: any) => {
      if (style.startsWith('TEXT_')) {
        const color = style.replace('TEXT_', '--highlight-').toLowerCase();
        return <span style={{ color: `var(${color})` }} />;
      }
      if (style.startsWith('HIGHLIGHT_')) {
        const color = style.replace('HIGHLIGHT_', '--highlight-').toLowerCase();
        return <span style={{ backgroundColor: `var(${color})` }} />;
      }
      if (style === 'BOLD') return <strong />;
      if (style === 'ITALIC') return <em />;
      if (style === 'UNDERLINE') return <u />;

      return null;
    }
  });

  const onSaveNote = () => {
    const contentState = editorState.getCurrentContent();
    const html = customConvertToHTML(contentState);

    const noteDetails = {
      title: noteTitle,
      tags,
      content: html
    }
    setNoteDetails(noteDetails)
  }

  return (
    <div className="card wh100 create-note">
      <TextareaAutosize
        ref={titleRef}
        placeholder="Your Idea Title..."
        minRows={1}
        value={noteTitle}
        onChange={(e) =>
          setNoteTitle(e.target.value)
        }
        maxRows={6}
        style={{
          width: '100%',
          fontSize: 'var(--m)',
          color: 'var(--text-primary)',
          backgroundColor: 'var(--background)',
          border: 'none',
          outline: 'none',
          resize: 'none',
        }}
      />
      <div className="space-base" />
      <Tools setEditorState={setEditorState} editorState={editorState} onSaveNote={onSaveNote} />
      <div className="space-base" />
      <div ref={tagRef} className='chip-wrapper'>
        {!!tags?.length && (
          <>
            {tags?.map((item) => (
              <Chip
                label={item}
                onDelete={() => console.log('first')}
                deleteIcon={<CloseIcon />}
                sx={{
                  backgroundColor: 'var(--tags-highlights)',
                  borderRadius: 'var(--s)',
                  '& .MuiChip-deleteIcon': {
                    color: 'var(--black)',
                  },
                }}
              />
            ))
            }
            <div className="space-base" />
          </>
        )}
      </div>
      <div
        style={{
          height: `calc(100% - ${titleHeight + tagsHeight + 88}px)`,
          overflow: 'scroll',
        }}
        onClick={() => contentRef.current.focus()}
      >
        <Editor
          ref={contentRef}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={colorStyleMap}
          placeholder="Start writing here..."
        />
      </div>
    </div >
  );
};

export default CreateNote;
