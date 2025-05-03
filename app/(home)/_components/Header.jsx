"use client";

import React from "react";
import SearchBar from "./SearchBar";
import { AppBar, Toolbar, Typography, TextField } from "@mui/material";
import { useUser } from "@clerk/nextjs";

const Header = () => {
  const { isLoaded, user } = useUser();
  return (
    <AppBar position="static">
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">My Application</Typography>

        {/* Simple Search Bar */}
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search..."
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            width: "200px",
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
