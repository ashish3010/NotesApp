import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import ThemeToggle from "../toggle";
import "./style.css"; // Assuming you have a CSS file for styles

const Header = () => {
  return (
    <AppBar
      component="nav"
      sx={{
        backgroundColor: "var(--surface)",
        width: "100%",
      }}
    >
      <div className="header-wrapper">
        <div>
          <Typography variant="h5" className="notes-title">
            Notes
          </Typography>
        </div>
        <div>
          <ThemeToggle />
        </div>
      </div>
    </AppBar>
  );
};

export default Header;
