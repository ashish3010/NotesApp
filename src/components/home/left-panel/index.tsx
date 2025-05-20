import React from 'react'
import './style.css'
import SearchBar from './search-bar'
import NewNote from './new-note'
import NotesList from './notes-list'

const LeftPanel = () => {
  return (
    <div style={{ overflow: 'hidden' }}>
      <SearchBar />
      <div className='space-base' />
      <NewNote />
      <div className='space-base' />
      <NotesList />
    </div>
  )
}

export default LeftPanel