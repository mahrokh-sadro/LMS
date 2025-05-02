"use client";

import React from "react";
import Image from "next/image";
import { Card, CardMedia, Typography, Box, Grid } from "@mui/material";
import { useRouter } from "next/navigation";

const CourseList = ({ courses }) => {
  const router = useRouter();
  return (
    <Box
      sx={{
        flexGrow: 1,
        padding: 4,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Grid container spacing={4} justifyContent="flex-start">
        {courses.map((course, index) => (
          <Grid item key={index}>
            <Box sx={{ textAlign: "left" }}>
              <Card
                sx={{
                  width: 300,
                  height: 200,
                  borderRadius: 3,
                  boxShadow: 3,
                  overflow: "hidden",
                }}
              >
                {course.banner?.url && (
                  <CardMedia
                    onClick={() => router.push(`/course-preview/${course.id}`)}
                    className="cursor-pointer"
                    sx={{
                      position: "relative",
                      height: "100%",
                      width: "100%",
                      overflow: "hidden",
                      border: "2px solid transparent",
                      transition: "all 0.3s ease",
                      "& img": {
                        transition: "transform 0.5s ease",
                      },
                      "&:hover": {
                        border: "2px solid #1976d2",
                      },
                      "&:hover img": {
                        transform: "scale(1.1)",
                      },
                    }}
                  >
                    <Image
                      src={course.banner.url}
                      alt={course.name}
                      fill
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                    />
                  </CardMedia>
                )}
              </Card>
              {/* Text UNDER the card */}
              <Typography
                variant="subtitle1"
                component="div"
                fontWeight="bold"
                sx={{ marginTop: 2 }}
                noWrap
              >
                {course.name}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ maxWidth: 300 }}
                noWrap
              >
                {course.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CourseList;
