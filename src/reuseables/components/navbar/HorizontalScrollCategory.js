import React from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ProductCard from "./ProductCard"; // Import the ProductCard component

const ScrollContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  overflowX: "auto",
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  "&::-webkit-scrollbar": {
    display: "none",  // Hide scrollbar
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[700] : theme.palette.grey[500], // Dark mode scroll thumb
    borderRadius: theme.shape.borderRadius,
  },
  "&::-webkit-scrollbar-track": {
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[800] : theme.palette.grey[200], // Dark mode scrollbar track
  },
}));

const HorizontalScrollCategory = () => {
  // Sample data
  const products = [
    { title: "Ethnic steps", price: "Gh₵100", image: "/path-to-image1.jpg", likes: 3 },
    { title: "Dresses", price: "Gh₵80", image: "/path-to-image2.jpg", likes: 2 },
    { title: "Fashionable anti-blue", price: "Gh₵75", image: "/path-to-image3.jpg", likes: 2 },
    { title: "Som t-shirt", price: "Gh₵40", image: "/path-to-image4.jpg", likes: 2 },
    { title: "Birk", price: "Gh₵150", image: "/path-to-image5.jpg", likes: 1 },
    { title: "Backpack", price: "Gh₵80", image: "/path-to-image6.jpg", likes: 2 },
    { title: "Mirror shoe", price: "Gh₵270", image: "/path-to-image7.jpg", likes: 0 },
    { title: "Fashionable anti-blue 2", price: "Gh₵65", image: "/path-to-image8.jpg", likes: 0 },
  ];

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", px: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: "bold", color: "text.primary" }}>
          Fashion
        </Typography>
        <Typography variant="body2" sx={{ color: "#007BFF", cursor: "pointer" }}>
          See All
        </Typography>
      </Box>
      <ScrollContainer>
        {products.map((product, index) => (
          <ProductCard key={index} product={product} /> // Use the ProductCard component
        ))}
      </ScrollContainer>
    </Box>
  );
};

export default HorizontalScrollCategory;
