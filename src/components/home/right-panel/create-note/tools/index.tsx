"use client"
import React, { useEffect, useRef, useState } from 'react'
import SaveIcon from '@mui/icons-material/Save';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatColorTextIcon from '@mui/icons-material/FormatColorText';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';
import { RichUtils, Modifier, EditorState } from 'draft-js';
import { BOLD, COLORS, HIGHLIGHGT, ITALIC, SAVE, TEXT_COLOR, NO_COLOR, UNDERLINE, UNORDERED_LIST, colorStyleMap, PRIMARY_COLOR_TEXT } from '@/utils/constants';
import { Typography } from '@mui/material';

const ToolsPanel = ({ setEditorState, editorState, onSaveNote }) => {
  const [colorBlockFor, setColorBlockFor] = useState('');
  const colorRef = useRef(null);

  const isEditorEmpty = () => {
    const contentState = editorState.getCurrentContent();
    const plainText = contentState.getPlainText().trim();
    return plainText === '';
  };

  const isHighlightSelected = colorBlockFor === HIGHLIGHGT;
  const isTextColorSelected = colorBlockFor === TEXT_COLOR;

  useEffect(() => {
    function handleClickOutside(event) {
      if (colorRef.current && !colorRef.current.contains(event.target)) {
        setColorBlockFor('');
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onIconClick = (e, key: string) => {
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
        break
      case SAVE:
        onSaveNote();
        break
      case UNORDERED_LIST:
        newState = RichUtils.toggleBlockType(editorState, key);
        setEditorState(newState);
        break
      case TEXT_COLOR:
      case HIGHLIGHGT:
        setColorBlockFor(key)
      default:
        return null
    }
  };

  const applyColor = (color: string, isHighlight: boolean) => {
    const selection = editorState.getSelection();
    const contentState = editorState.getCurrentContent();
    const colorStyles = Object.keys(colorStyleMap);
    let newContentState = colorStyles.reduce((state, style) => {
      return Modifier.removeInlineStyle(state, selection, style);
    }, contentState);
    let styleKey;
    let colorPrefix = color?.replaceAll('--highlight-', '')?.replaceAll('-', '_')?.replace('var', '')?.replace('(', '')?.replace(')', '')?.toUpperCase();
    color?.replaceAll('--highlight-', '')?.replaceAll('-', '_')?.replace('var', '')?.replace('(', '')?.replace(')', '')?.toUpperCase()
    if (isHighlight) {
      styleKey = `HIGHLIGHT_${colorPrefix}`
    } else {
      styleKey = `TEXT_${colorPrefix}`
    }
    newContentState = Modifier.applyInlineStyle(newContentState, selection, styleKey);
    const newEditorState = EditorState.push(editorState, newContentState, 'change-inline-style');
    setEditorState(newEditorState);
  };

  return (
    <div className='tools-panel'>
      {colorBlockFor && (
        <div className='color-wrapper' style={{ left: isHighlightSelected ? 24 * 5 : 25 * 6 }}>
          <div className='no-color' onMouseDown={() => applyColor(isHighlightSelected ? NO_COLOR : PRIMARY_COLOR_TEXT, isHighlightSelected)}>
            <Typography variant='body2'>{isHighlightSelected ? 'No highlight' : 'Automatic'}</Typography>
          </div>
          <div className='color-block'>
            {COLORS.map((item: string) => (
              <div onMouseDown={() => applyColor(item, isHighlightSelected)} className='color-item' style={{ backgroundColor: item }} />
            ))}
          </div>
        </div>
      )}
      <div className='tools-container expanded'>
        <div className="tools-icons">
          <div className='tools'>
            <SaveIcon sx={{ color: 'var(--text-primary)' }} onMouseDown={(e) => onIconClick(e, SAVE)} />
          </div>
          <div className='tools'>
            <FormatBoldIcon sx={{ color: 'var(--text-primary)' }} onMouseDown={(e) => onIconClick(e, BOLD)} />
          </div>
          <div className='tools'>
            <FormatItalicIcon sx={{ color: 'var(--text-primary)' }} onMouseDown={(e) => onIconClick(e, ITALIC)} />
          </div>
          <div className='tools'>
            <FormatUnderlinedIcon sx={{ color: 'var(--text-primary)' }} onMouseDown={(e) => onIconClick(e, UNDERLINE)} />
          </div>
          <div ref={colorRef} style={{ display: 'flex', gap: 12 }}>
            <div className={`tools ${isHighlightSelected ? 'bgColor' : ''}`}>
              <FormatColorFillIcon sx={{ color: 'var(--text-primary)' }} onMouseDown={(e) => onIconClick(e, HIGHLIGHGT)} />
            </div>
            <div className={`tools ${isTextColorSelected ? 'bgColor' : ''}`}>
              <FormatColorTextIcon sx={{ color: 'var(--text-primary)' }} onMouseDown={(e) => onIconClick(e, TEXT_COLOR)} />
            </div>
          </div>
          <div className='tools'>
            <FormatListBulletedIcon sx={{ color: 'var(--text-primary)' }} onMouseDown={(e) => onIconClick(e, UNORDERED_LIST)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolsPanel;


