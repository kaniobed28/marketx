import React from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";

// Styled components for the card
const ProductCardWrapper = styled(Card)(({ theme }) => ({
  minWidth: 180,
  borderRadius: theme.spacing(1),
  boxShadow: theme.shadows[2],
  backgroundColor: theme.palette.mode === "dark" ? theme.palette.grey[900] : theme.palette.common.white, // Dark mode card background
}));

const PriceAndHeart = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const ProductCard = ({ product }) => {
  return (
    <ProductCardWrapper>
      <CardMedia
        component="img"
        height="140"
        image={product.image}
        alt={product.title}
        sx={{ borderRadius: "4px" }}
      />
      <CardContent>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          {product.title}
        </Typography>
        <PriceAndHeart>
          <Typography variant="body2" sx={{ fontWeight: "bold", color: "green" }}>
            {product.price}
          </Typography>
          <IconButton size="small">
            <FavoriteBorderIcon />
          </IconButton>
        </PriceAndHeart>
      </CardContent>
    </ProductCardWrapper>
  );
};

export default ProductCard;
