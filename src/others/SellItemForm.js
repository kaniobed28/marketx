// src/components/SellItemForm.js
import React from "react";
import { observer } from "mobx-react";
import { Box, TextField, Button, Typography, Grid, IconButton, MenuItem, Select, InputLabel, FormControl, FormHelperText } from "@mui/material";
import { PhotoCamera, VideoCameraBack } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import itemStore from "./SellingingStore";

// Styled components for the form
const FormWrapper = styled(Box)({
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
});

const FileInput = styled("input")({
  display: "none",
});

const MediaPreviewContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  marginTop: "16px",
  overflowX: "auto",
});

const MediaPreviewBox = styled(Box)({
  maxWidth: "150px",
  maxHeight: "150px",
});

const SellItemForm = observer(() => {
  const { itemDetails, errorMessage, setItemDetails, setErrorMessage, addMedia, submitItem } = itemStore;

  // Dummy category and subcategory data
  const categories = [
    { name: "Electronics", subcategories: ["Smartphones", "Laptops", "Headphones"] },
    { name: "Clothing", subcategories: ["Men", "Women", "Kids"] },
    { name: "Furniture", subcategories: ["Living Room", "Bedroom", "Office"] },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemDetails({ [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = [];

    files.forEach((file) => {
      if (file.size > 10485760) {
        setErrorMessage("File size exceeds 10MB");
        return;
      }
      if (!["image/jpeg", "image/png", "image/gif", "video/mp4", "video/avi"].includes(file.type)) {
        setErrorMessage("Invalid file type. Only images and videos are allowed.");
        return;
      }
      setErrorMessage(""); // Clear previous error messages
      newMedia.push(URL.createObjectURL(file));
    });

    newMedia.forEach((media) => addMedia(media));
  };

  const handleCategoryChange = (e) => {
    const { value } = e.target;
    setItemDetails({
      category: value,
      subcategory: "", // Reset subcategory when category changes
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitItem();
  };

  // Get subcategories based on selected category
  const selectedCategory = categories.find(
    (category) => category.name === itemDetails.category
  );
  const subcategories = selectedCategory ? selectedCategory.subcategories : [];

  return (
    <FormWrapper>
      <Typography variant="h5" gutterBottom>
        Sell Your Item
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Item Name"
              variant="outlined"
              fullWidth
              name="itemName"
              value={itemDetails.itemName}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              name="description"
              multiline
              rows={4}
              value={itemDetails.description}
              onChange={handleInputChange}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              name="price"
              type="number"
              value={itemDetails.price}
              onChange={handleInputChange}
              required
            />
          </Grid>

          {/* Category Dropdown */}
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={itemDetails.category}
                onChange={handleCategoryChange}
                label="Category"
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category.name} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Subcategory Dropdown */}
          {itemDetails.category && (
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  name="subcategory"
                  value={itemDetails.subcategory}
                  onChange={handleInputChange}
                  label="Subcategory"
                >
                  {subcategories.map((subcategory) => (
                    <MenuItem key={subcategory} value={subcategory}>
                      {subcategory}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>Optional</FormHelperText>
              </FormControl>
            </Grid>
          )}

          <Grid item xs={12}>
            <Typography variant="body2" sx={{ marginBottom: "8px" }}>
              Upload Images or Videos (Max 10MB)
            </Typography>
            <label htmlFor="media-upload">
              <FileInput
                id="media-upload"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
              />
              <IconButton
                component="span"
                color="primary"
                sx={{ border: "1px dashed", padding: "8px" }}
              >
                <PhotoCamera />
              </IconButton>
              <IconButton
                component="span"
                color="primary"
                sx={{ border: "1px dashed", padding: "8px", marginLeft: "8px" }}
              >
                <VideoCameraBack />
              </IconButton>
            </label>
          </Grid>

          {/* Display error message */}
          {errorMessage && (
            <Grid item xs={12}>
              <Typography variant="body2" sx={{ color: "red" }}>
                {errorMessage}
              </Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <MediaPreviewContainer>
              {itemDetails.media.map((media, index) => (
                <MediaPreviewBox key={index}>
                  {media.includes("video") ? (
                    <video width="100%" height="100%" controls>
                      <source src={media} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img src={media} alt="Media Preview" width="100%" height="100%" />
                  )}
                </MediaPreviewBox>
              ))}
            </MediaPreviewContainer>
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit Item
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormWrapper>
  );
});

export default SellItemForm;
