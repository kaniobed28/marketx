import React from "react";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Switch } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { styled, alpha } from "@mui/material/styles";

// Define the Search components with MUI styling
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.1),
  },
  marginLeft: theme.spacing(1),
  marginRight: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "30ch",
      },
    },
  },
}));

const NavBar = ({ darkMode, setDarkMode }) => {
  // Toggle dark mode
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  

  return (
    <AppBar position="static" sx={{ backgroundColor: darkMode ? "#333" : "#fff", boxShadow: "none" }}>
      <Toolbar>
        {/* Menu Icon */}
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon sx={{ color: darkMode ? "white" : "black" }} />
        </IconButton>

        {/* Logo/Brand Name */}
        <Typography variant="h6" sx={{ flexGrow: 1, color: darkMode ? "white" : "black" }}>
          <img src="/assets/images/company-logo.png" alt="logo" style={{ width: 40 }} />
        </Typography>

        {/* Search Box */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: darkMode ? "white" : "black" }} />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search items..."
            inputProps={{ "aria-label": "search" }}
            sx={{ color: darkMode ? "white" : "black" }}
          />
        </Search>

        {/* Dark Mode Toggle */}
        <IconButton color="inherit" onClick={handleDarkModeToggle}>
          <Brightness4Icon sx={{ color: darkMode ? "white" : "black" }} />
        </IconButton>

        {/* Dark Mode Switch */}
        <Switch checked={darkMode} onChange={handleDarkModeToggle} />
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
