import { Chip, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import { useCreateNote, usePreviewNote } from '@/store/store';
import { parseHTML } from '@/utils/functions';

const tags = ["Notes", "AI", "Notes App"]

const PreviewNote = () => {
  const noteData = usePreviewNote((state: any) => state.noteData)
  const { title, content } = noteData || {}
  const { setCreateModeOn, setInputData } = useCreateNote((state: any) => state);

  const onEditClick = () => {
    setCreateModeOn(true);
    setInputData(noteData)
  }

  return (
    <div className='preview'>
      <div className='title-wrapper'>
        <Typography variant='h4'>{title}</Typography>
        <div className='edit-icon' onClick={onEditClick}><EditIcon sx={{ color: 'var(--btn-links)' }} /></div>
      </div>
      <div className='space-base' />
      <div className='chip-wrapper'>
        {!!tags?.length && (
          tags?.map((item) => (
            <Chip
              label={item}
              style={{
                backgroundColor: 'var(--tags-highlights)',
                borderRadius: 'var(--s)'
              }} />
          ))
        )}
      </div>
      <div className='space-m' />
      <Typography>{parseHTML(content)}</Typography>
    </div>
  )
}

export default PreviewNote