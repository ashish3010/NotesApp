import React from 'react';
import './style.css'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Switch } from '@mui/material';
import ThemeToggle from '../toggle';

const Header = () => {
  return (
    <AppBar component="nav"
      sx={{
        backgroundColor: 'var(--surface)',
        display: 'flex',
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        padding: '8px 16px'
      }}>
      <div>
        <Typography variant='h5' sx={{ color: 'var(--text-primary)' }}>Notes</Typography>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </AppBar>
  )
}

export default Header