import React from "react";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import ThemeToggle from "../toggle";

const Header = () => {
  return (
    <AppBar
      component="nav"
      sx={{
        backgroundColor: "var(--surface)",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          maxWidth: 1660,
          margin: "0 auto",
          justifyContent: "space-between",
          flexDirection: "row",
          alignItems: "center",
          position: "relative",
          padding: "8px 16px",
        }}
      >
        <div>
          <Typography variant="h5" sx={{ color: "var(--text-primary)" }}>
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
