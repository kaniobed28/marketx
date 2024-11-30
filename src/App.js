import React, { useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./reuseables/components/navbar/NavBar";
import HorizontalScrollCategory from "./reuseables/components/navbar/HorizontalScrollCategory";

// Define the Homepage component
const Homepage = () => {
  return <> 
  <HorizontalScrollCategory></HorizontalScrollCategory>
  <HorizontalScrollCategory></HorizontalScrollCategory>
  </>
};

// Define the Sell Item component
const ProductForm = () => {
  return <h1>Sell Your Item</h1>;
};

// Define the Login component
const Login = () => {
  return <h1>Login Page</h1>;
};

function App() {
  // Dark mode state for the whole app
  const [darkMode, setDarkMode] = useState(false);

  // Theme setup based on darkMode state
  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <NavBar setDarkMode={setDarkMode} darkMode={darkMode} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/sell" element={<ProductForm />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
