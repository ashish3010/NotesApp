import React, { useState, KeyboardEvent, ChangeEvent } from "react";
import { TextField, Chip, Box } from "@mui/material";

const MAX_HASHTAGS = 4;

interface HashtagChipsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
}

const HashtagChips: React.FC<HashtagChipsProps> = ({
  tags: hashtags,
  setTags: setHashtags,
}: HashtagChipsProps) => {
  const [input, setInput] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      (e.key === " " || e.key === "Spacebar" || e.code === "Space") &&
      hashtags.length < MAX_HASHTAGS
    ) {
      const tag = input.trim().toUpperCase();
      if (
        tag.length > 0 && // ensure it's not empty
        !hashtags.includes(tag)
      ) {
        setHashtags([...hashtags, tag]);
        setInput("");
      }
      e.preventDefault();
    }
    if (
      (e.key === " " || e.key === "Spacebar" || e.code === "Space") &&
      hashtags.length < MAX_HASHTAGS
    ) {
      const tag = input.trim().toUpperCase();
      if (
        tag.startsWith("#") &&
        tag.length > 1 && // ensure it's not just '#'
        !hashtags.includes(tag)
      ) {
        setHashtags([...hashtags, tag]);
        setInput("");
      }
      e.preventDefault();
    }
  };

  const handleDelete = (tagToDelete: string) => {
    setHashtags(hashtags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
      {hashtags.map((tag) => (
        <Chip
          key={tag}
          label={tag}
          style={{
            backgroundColor: "var(--tags-highlights)",
            borderRadius: "var(--s)",
          }}
          sx={{
            "& .MuiChip-deleteIcon": {
              color: "var(--black)",
              "&:hover": {
                color: "var(--black)",
              },
            },
          }}
          onDelete={() => handleDelete(tag)}
        />
      ))}
      {hashtags.length < MAX_HASHTAGS && (
        <TextField
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder="#hashtag"
          variant="standard"
          inputProps={{ maxLength: 30 }}
          sx={{ minWidth: 100 }}
          InputProps={{
            style: { color: "var(--text-primary)" },
          }}
        />
      )}
    </Box>
  );
};

export default HashtagChips;
