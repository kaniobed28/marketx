import React from "react";
import { Card, CardMedia, CardContent, Typography, IconButton, Box } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/material/styles";
import { useInView } from "react-intersection-observer"; 
import { useSpring, animated } from '@react-spring/web'; 

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
  const { ref, inView } = useInView({
    triggerOnce: false, // Animation happens only once when the card enters view
    threshold: 0.5, // 50% of the card needs to be in view before the animation is triggered
  });

  // Using react-spring to animate the card's opacity and position
  const animationProps = useSpring({
    opacity: inView ? 1 : 0, // Fade in when in view
    transform: inView ? 'translateY(0px)' : 'translateY(20px)', // Slide up effect
    config: { tension: 300, friction: 30 }, // Adjusting the speed and smoothness of the animation
  });

  return (
    <animated.div ref={ref} style={animationProps}> {/* Wrapping with animated.div to apply the animation */}
      <ProductCardWrapper>
        <CardMedia
          component="img"
          height="140"
          image={product.media[0]}
          alt={product.itemName}
          sx={{ borderRadius: "4px" }}
        />
        <CardContent>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {product.itemName}
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
    </animated.div>
  );
};

export default ProductCard;
