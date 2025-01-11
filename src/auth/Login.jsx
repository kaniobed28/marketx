import React, { useState } from "react";
import { Box, TextField, Button, Typography, Paper, Divider } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between Sign In and Sign Up
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Handle login action
  const handleLogin = () => {
    console.log("Login clicked", { email, password });
  };

  // Handle sign-up action
  const handleSignup = () => {
    console.log("Signup clicked", { email, password, confirmPassword });
  };

  // Handle Google sign-in/sign-up action
  const handleGoogleAuth = () => {
    console.log(`${isSignUp ? "Sign Up" : "Sign In"} with Google clicked`);
    // Add Google OAuth logic here
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "background.default",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          maxWidth: 400,
          width: "100%",
          borderRadius: 2,
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 2, textAlign: "center" }}>
          {isSignUp ? "Create an Account" : "Welcome Back!"}
        </Typography>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isSignUp && (
          <TextField
            fullWidth
            label="Confirm Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
          onClick={isSignUp ? handleSignup : handleLogin}
        >
          {isSignUp ? "Sign Up" : "Login"}
        </Button>
        <Divider sx={{ marginY: 2 }} />
        <Button
          fullWidth
          variant="outlined"
          color="primary"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
          onClick={handleGoogleAuth}
        >
          <GoogleIcon />
          {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
        </Button>
        <Typography
          variant="body2"
          sx={{
            marginTop: 2,
            textAlign: "center",
            cursor: "pointer",
            color: "primary.main",
          }}
          onClick={() => setIsSignUp((prev) => !prev)}
        >
          {isSignUp
            ? "Already have an account? Sign In"
            : "Don't have an account? Sign Up"}
        </Typography>
      </Paper>
    </Box>
  );
};

export default AuthPage;
