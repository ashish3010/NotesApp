"use client"
import React from 'react'
import './style.css'
// import CreateNote from './create-note'
import NewNote from './new-note'
import PreviewNote from './preview-note'
import { useCreateNote, usePreviewNote } from '@/store/store'
import dynamic from 'next/dynamic'

const CreateNote = dynamic(() => import('./create-note'), { ssr: false }); // ✅ server side rendering OFF

const RightPanel = () => {
  const isCreateModeOn = useCreateNote((state: any) => state.isCreateModeOn);
  const isPreviewModeOn = usePreviewNote((state: any) => state.isPreviewModeOn);

  const renderContent = () => {
    if (isCreateModeOn) {
      return <CreateNote />
    }
    if (isPreviewModeOn) {
      return <PreviewNote />
    }
    return <NewNote />
  }

  return (
    <div className='wh100'>
      {renderContent()}
    </div>
  )
}

export default RightPanel