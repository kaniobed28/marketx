import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, MenuItem, Select, FormControl, InputLabel, Modal, Backdrop, Fade } from "@mui/material";

const UserPreferences = () => {
  // Initialize state with values from localStorage if they exist, or default values
  const [language, setLanguage] = useState(localStorage.getItem("language") || "");
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "");
  const [country, setCountry] = useState(localStorage.getItem("country") || "");
  const [age, setAge] = useState(localStorage.getItem("age") || "");

  const [openModal, setOpenModal] = useState(false); // Modal state to prompt user
  const [error, setError] = useState(""); // Error state to track any issues

  // Check if any preference is missing when the component mounts
  useEffect(() => {
    if (!language && !currency && !country && !age) {
      setOpenModal(true); // Open the modal to prompt the user if no preferences exist
    }
  }, [language, currency, country, age]);

  // Handle saving preferences and closing the modal
  const handleSavePreferences = () => {
    // Save preferences to localStorage if they are filled
    if (language) localStorage.setItem("language", language);
    if (currency) localStorage.setItem("currency", currency);
    if (country) localStorage.setItem("country", country);
    if (age) localStorage.setItem("age", age);

    setOpenModal(false); // Close the modal after saving
    setError(""); // Reset error
    
  };

  return (
    <Box sx={{ width: "100%", padding: 2 , }}>
      {/* <Typography variant="h5" sx={{ marginBottom: 2 }}>
        User Preferences
      </Typography> */}

      {/* Modal to prompt the user to fill preferences */}
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: "white",
              padding: 4,
              borderRadius: 2,
              boxShadow: 3,
              width: "400px",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Complete Your Preferences (Optional)
            </Typography>
            
            {/* Language Selector */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Language</InputLabel>
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                label="Language"
              >
                <MenuItem value="English">English</MenuItem>
                <MenuItem value="French">French</MenuItem>
                <MenuItem value="Spanish">Spanish</MenuItem>
              </Select>
            </FormControl>

            {/* Currency Selector */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Currency</InputLabel>
              <Select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                label="Currency"
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GHS">GHS</MenuItem>
              </Select>
            </FormControl>

            {/* Country Selector */}
            <FormControl fullWidth sx={{ marginBottom: 2 }}>
              <InputLabel>Country</InputLabel>
              <Select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                label="Country"
              >
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="Ghana">Ghana</MenuItem>
              </Select>
            </FormControl>

            {/* Age Input */}
            <TextField
              label="Age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              fullWidth
              sx={{ marginBottom: 2 }}
            />

            {/* Save Button */}
            <Button variant="contained" fullWidth onClick={handleSavePreferences}>
              Save Preferences
            </Button>

            {/* Error Message */}
            {error && <Typography sx={{ color: "red", marginTop: 2 }}>{error}</Typography>}
          </Box>
        </Fade>
      </Modal>

      {/* The rest of your app components */}
    </Box>
  );
};

export default UserPreferences;
