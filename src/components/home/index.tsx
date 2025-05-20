import React from 'react'
import './style.css'
import LeftPanel from './left-panel'
import RightPanel from './right-panel'
import { Divider } from '@mui/material'

const HomeComp = () => {
  return (
    <div className='wrapper'>
      <div className='card card-shadow card-wrapper'>
        <div className='left-panel'>
          <LeftPanel />
        </div>
        <div className='divider'>
          <Divider orientation="vertical" sx={{ borderColor: "var(--border-divider)" }} />
        </div>
        <div className='right-panel'>
          <RightPanel />
        </div>
      </div>
    </div>
  )
}

export default HomeComp