"use client"
import React from 'react';
import './style.css';
import { useTheme } from 'next-themes';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const isDark = theme === 'dark'

  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="toggle"
        checked={isDark}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      />
      <label htmlFor="toggle" className="switch">
        <span className="icon">{isDark ? <DarkModeOutlinedIcon sx={{ color: 'var(--text-primary)' }} /> : <WbSunnyOutlinedIcon sx={{ color: 'var(--text-primary)' }} />}</span>
        <span className="slider" />
      </label>
    </div>
  );
};

export default ThemeToggle;
