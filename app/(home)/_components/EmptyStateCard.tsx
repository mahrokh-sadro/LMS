"use client";

import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

const EmptyStateCard = ({ message = "No data found." }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        borderStyle: "dashed",
        backgroundColor: "#f9f9f9",
        textAlign: "center",
        p: 4,
      }}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
          <HourglassEmptyIcon fontSize="large" color="disabled" />

          <Typography variant="body2" color="textSecondary">
            {message}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default EmptyStateCard;
