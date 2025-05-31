"use client";
import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useSavedNote } from "@/store/store";

const SearchBar = () => {
  const { noteDetails, setFilteredNotes } = useSavedNote((state) => state);

  interface ChangeEvent {
    target: {
      value: string;
    };
  }

  const handleChange = (e: ChangeEvent) => {
    if (!noteDetails) return;

    const searchTerm = e.target.value?.toLowerCase();
    const filteredNotes = noteDetails?.filter(
      (note) =>
        note?.title?.toLowerCase().includes(searchTerm) ||
        note?.content?.toLowerCase().includes(searchTerm) ||
        note?.tags?.some((tag: string) =>
          tag.toLowerCase().includes(searchTerm)
        )
    );
    setFilteredNotes(filteredNotes);
    if (searchTerm === "") {
      setFilteredNotes(noteDetails);
    }
  };

  return (
    <TextField
      variant="outlined"
      placeholder="Search..."
      onChange={handleChange}
      sx={{
        width: "100%",
        backgroundColor: "var(--background)",
        borderRadius: "12px",
        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          paddingRight: "8px",
          "& input": {
            padding: "10px 12px",
            fontSize: "16px",
            color: "var(--text-primary)",
          },
          "& fieldset": {
            borderColor: "var(--border-divider)",
          },
          "&:hover fieldset": {
            borderColor: "var(--border-divider)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--border-divider)",
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon style={{ color: "var(--text-primary)" }} />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default SearchBar;
