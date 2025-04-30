"use client";
import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";

const CategoryFilter = ({ onFilterChange }) => {
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [
    { id: "all", name: "All", value: "" },
    { id: "1", name: "Electronics", value: "electronics" },
    { id: "2", name: "Books", value: "books" },
    { id: "3", name: "Clothing", value: "clothing" },
    { id: "4", name: "Home & Kitchen", value: "home_kitchen" },
  ];

  const handleCategoryChange = (categoryValue) => {
    setSelectedCategory(categoryValue);
    onFilterChange(categoryValue);
  };

  return (
    <div>
      <Typography variant="h6" sx={{ marginBottom: 2 }}>
        Filter by Category
      </Typography>
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
