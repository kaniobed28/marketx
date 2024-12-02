import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Box, Typography, TextField, Link } from "@mui/material";
import { styled } from "@mui/material/styles";
import ProductCard from "./ProductCard";

const ScrollContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  overflowX: "auto",
  padding: "16px 0",
  "&::-webkit-scrollbar": {
    display: "none",
  },
});

const HorizontalScrollCategory = observer(({ title, products, onFetch }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  useEffect(() => {
    onFetch(); // Fetch products when the component mounts
  }, [onFetch]);

  const filteredProducts = products.filter((product) =>
    product.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ padding: "16px 0" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
          {title}
        </Typography>
        <Link href="#" sx={{ fontSize: "14px" }}>
          See All
        </Link>
      </Box>

      <TextField
        placeholder="Search Products"
        variant="outlined"
        size="small"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: "16px" }}
      />

      <ScrollContainer>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            No products found.
          </Typography>
        )}
      </ScrollContainer>
    </Box>
  );
});

export default HorizontalScrollCategory;
