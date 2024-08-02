import React, { useState } from "react";
import { Button } from '@mui/material';
import { deleteUser } from "firebase/auth";
import { auth } from "../_utils/firebase"; // Make sure this path is correct for your project structure

const DeleteAccountComponent = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleDeleteAccount = async () => {
    try {
      await deleteUser(auth.currentUser);
      setShowPopup(true);
      setTimeout(() => {
        // Using window.location for navigation as a fallback
        window.location.href = "/";
      }, 2000);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const buttonStyle = {
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: 'red',  
    color: '#FFFFFF',  
    width: '200px',
};

  return (
    <div className="p-4">
      {showPopup && (
        <div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
          role="alert"
        >
          <strong className="font-bold">Account Deleted!</strong>
          <span className="block sm:inline">
            {" "}
            You will be redirected shortly.
          </span>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-4 text-white">Delete Account</h2>
      <p className="mb-4 text-white">
        Are you sure you want to delete your account? This action cannot be
        undone.
      </p>
      <div style={{ paddingTop: '20px',}}>
      <Button
          onClick={handleDeleteAccount}
          style={buttonStyle}
        >
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default DeleteAccountComponent;
