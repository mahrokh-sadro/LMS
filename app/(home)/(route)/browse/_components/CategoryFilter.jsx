"use client";
import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

const CategoryFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: "all", name: "All", value: "" },
    { id: "1", name: "Business", value: "Business" },
    { id: "2", name: "AI", value: "AI" },
    { id: "3", name: "Tech", value: "Tech" },
    { id: "4", name: "Health", value: "Health" },
  ];

  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue);
    onFilterChange(categoryValue);
  };

  return (
    <div>
      {/* <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Filter by Category
      </Typography> */}
      <Stack direction="row" spacing={2} flexWrap="wrap">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategory === category.value ? "contained" : "outlined"
            }
            sx={{
              backgroundColor:
                selectedCategory === category.value
                  ? "primary.main"
                  : "transparent",
              color:
                selectedCategory === category.value ? "#fff" : "text.primary",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category.value
                    ? "primary.dark"
                    : "primary.light",
              },
              padding: "8px 16px",
              borderRadius: "20px",
              textTransform: "capitalize",
            }}
            onClick={() => handleCategoryChange(category.value)}
          >
            {category.name}
          </Button>
        ))}
      </Stack>
    </div>
  );
};

export default CategoryFilter;
