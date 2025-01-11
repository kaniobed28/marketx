import React, { useState,useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme, Box, CircularProgress, Typography } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./reuseables/components/navbar/NavBar";
import HorizontalScrollCategory from "./reuseables/components/navbar/HorizontalScrollCategory"; 
import UserPreferences from "./user/user-preference/components/UserPreference"; 
import SellItemForm from "./others/SellItemForm";
import AuthPage from "./auth/Login";
import { observer } from "mobx-react-lite";
import itemStore from "./others/SellingingStore";

// Define the Homepage component
const Homepage = observer(() => {
  const { categories, fetchItemsByCategory } = itemStore;

  useEffect(() => {
    fetchItemsByCategory(); // Initial fetch for all categories
  }, [fetchItemsByCategory]);

  return (
    <Box>
      {Object.keys(categories).map((category) => (
        <HorizontalScrollCategory
          key={category}
          title={category}
          products={categories[category]}
          onFetch={fetchItemsByCategory}
        />
      ))}
    </Box>
  );
});




function App() {
  // Dark mode state for the whole app
  const [darkMode, setDarkMode] = useState(false);

  // Track if preferences are completed (using localStorage check)
  const [preferencesCompleted, setPreferencesCompleted] = useState(
    localStorage.getItem("language") || localStorage.getItem("currency") || localStorage.getItem("country") || localStorage.getItem("age")
  );

  // State to manage whether to show the UserPreferences form
  const [showPreferences, setShowPreferences] = useState(false);

  // Theme setup based on darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  // Function to handle the click event on the notification
  const handleNotificationClick = () => {
    setShowPreferences(true); // Show the preferences form when clicked
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        {/* Show the loading animation at the bottom right if preferences are not completed */}
        {!preferencesCompleted && !showPreferences && (
          <Box
            sx={{
              position: "fixed",
              bottom: 20,
              right: 20,
              zIndex: 9999,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: 2,
              borderRadius: 2,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              gap: 1,
              cursor: "pointer", // Make it clickable
            }}
            onClick={handleNotificationClick} // Add click handler
          >
            <Typography variant="body2" sx={{ fontSize: "14px" }}>
              Complete your preferences!
            </Typography>
            <CircularProgress size={24} sx={{ color: "#fff", animation: "bounce 1s infinite" }} />
          </Box>
        )}

        {/* Show the UserPreferences component when clicked */}
        {showPreferences && <UserPreferences onPreferencesChange={() => setPreferencesCompleted(true)} />}

        <NavBar setDarkMode={setDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/sell" element={<SellItemForm />} /> 
          {/* I will take this component out later */}
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
