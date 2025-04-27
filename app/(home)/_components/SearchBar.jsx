"use client";
import React from "react";
import { AppBar, Toolbar, Typography, TextField } from "@mui/material";

const SearchBar = () => {
  return (
    <div>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search..."
        sx={{
          backgroundColor: "white",
          borderRadius: 1,
          width: "200px",
        }}
      />{" "}
    </div>
  );
};

export default SearchBar;
