"use client";
import React, { useState } from "react";
import { Button, Stack } from "@mui/material";

const CategoryFilter = () => {
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
    // Add any logic here to filter content based on the selected category
  };

  return (
    <div>
      <h3>Filter by Category</h3>
      <Stack direction="row" spacing={2}>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={
              selectedCategory === category.value ? "contained" : "outlined"
            }
            sx={{
              backgroundColor:
                selectedCategory === category.value ? "gray" : "white",
              color: selectedCategory === category.value ? "#fff" : "#000",
              "&:hover": {
                backgroundColor:
                  selectedCategory === category.value ? "#D3D3D3" : "#D3D3D3",
              },
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
