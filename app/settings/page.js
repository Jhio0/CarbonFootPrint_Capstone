"use client";
import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { auth } from "../_utils/firebase";
//import { LogInError } from "../_utils/authError/authLoginError";

import { UserAuth } from "../context/AuthContext"; // Assuming you have an AuthContext
import ChangePasswordComponent from "./changePassword";
import DeleteAccountComponent from "./deleteAccount";

export default function Settings() {
  const { user } = UserAuth();
  const [displayName, setDisplayName] = useState(null); // State to store user's display name
  const [photoURL, setPhotoURL] = useState(null); // State to store user's photo URL
  const [selectedOption, setSelectedOption] = useState(null); // State to store selected option

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      // This function will be called whenever the authentication state changes
      if (user) {
        // If a user is logged in, set their display name and photo URL
        setDisplayName(user.displayName);
        setPhotoURL(user.photoURL); // Set the photo URL
      } else {
        // If no user is logged in, set displayName and photoURL to null
        setDisplayName(null);
        setPhotoURL(null);
      }
    });

    // Cleanup function: Unsubscribe from the auth state listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const renderOptionComponent = () => {
    switch (selectedOption) {
      case "changePassword":
        return <ChangePasswordComponent />;
      case "deleteAccount":
        return <DeleteAccountComponent />;
      default:
        return null;
    }
  };

  const profileDivContainerStyle = {
    backgroundColor: "blue",
    borderRadius: "6px",
    width: "100%",
    display: "inline-Block",
    height: "100%",
  };

  const nameStyle = {
    containerSpacing: "2",
    padding: "20px",
  };

  const profileDescStyle = {
    padding: "20px",
  };

  return (
    <Container>
      {user ? (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ paddingTop: 4, paddingBottom: 4, height: "100vh" }}
        >
          <Grid item xs={12} sm={11} md={4} lg={3}>
            <div style={profileDivContainerStyle}>
              <div style={nameStyle}>
                <Typography variant="h6">Settings</Typography>
              </div>

              <div style={profileDescStyle}>
                <Typography
                  variant="body1"
                  onClick={() => handleOptionSelect("changePassword")}
                >
                  Change Password
                </Typography>
                <br />
                <Typography
                  variant="body1"
                  onClick={() => handleOptionSelect("deleteAccount")}
                >
                  Delete Account
                </Typography>
                <br />
              </div>
            </div>
          </Grid>
          <Grid item xs>
            {renderOptionComponent()}
          </Grid>
        </Grid>
      ) : (
        <div>
          Log in please
        </div>
      )}
    </Container>
  );
}