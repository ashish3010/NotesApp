"use client"
import { Typography } from '@mui/material'
import React from 'react'
import ChipsRow from './chips-row'
import { useCreateNote, usePreviewNote, useSavedNote } from '@/store/store'
import { parseHTML } from '@/utils/functions'

const NotesList = () => {
  const noteDetails = useSavedNote((state: any) => state.noteDetails);
  const { setPreviewModeOn, setNoteData } = usePreviewNote((state: any) => state)
  const setCreateModeOn = useCreateNote((state: any) => state.setCreateModeOn)

  const onNoteClick = (item) => {
    setCreateModeOn(false)
    setPreviewModeOn(true)
    setNoteData(item)
  }

  return (
    <div className='notes-list-container'>
      <div className='notes-list'>
        {!!noteDetails?.length && (
          noteDetails?.map((item) => (
            <div className='list-item' onClick={() => onNoteClick(item)}>
              <Typography className='title' variant='h6'>{item?.title}</Typography>
              <div className='space-xs' />
              <Typography className='description' variant='subtitle2'>{parseHTML(item?.content)}</Typography>
              <div className='space-s' />
              <ChipsRow chips={item?.tags} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default NotesList