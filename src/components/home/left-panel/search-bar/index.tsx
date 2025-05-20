"use client"
import React from 'react';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {

  const handleChange = () => {
    console.log('hi')
  }

  return (
    <TextField
      variant="outlined"
      placeholder='Search...'
      onChange={handleChange}
      sx={{
        width: '100%',
        backgroundColor: 'var(--background)',
        borderRadius: '12px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '12px',
          paddingRight: '8px',
          '& input': {
            padding: '10px 12px',
            fontSize: '16px',
            color: 'var(--text-primary)',
          },
          '& fieldset': {
            borderColor: 'var(--border-divider)',
          },
          '&:hover fieldset': {
            borderColor: 'var(--border-divider)',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'var(--border-divider)',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: 'var(--text-primary)' }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
