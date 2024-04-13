import React, { useState } from "react";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { Button } from '@mui/material';
import { auth } from "../_utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChangePasswordComponent = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      // Check if the user's email is null (Google user)
      if (!user.email) {
        setError("Changing password is not applicable for Google users.");
        return;
      }
      
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      toast.success("Successfully changed password.", { position: "top-center" });
      setError(""); // Clear any previous errors
    } catch (error) {
      setError(error.message);
    }
  };

  const buttonStyle = {
    padding: '10px 15px',
    cursor: 'pointer',
    borderRadius: '8px',
    marginBottom: '10px',
    backgroundColor: '#2E3B46',  
    color: '#FFFFFF',  
    width: '200px',
  };

  const inputContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginTop: '10px',
    marginBottom: '10px',

  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4  text-white">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div style={inputContainerStyle}>
        <input
          className="input input-bordered w-full max-w-xs my-2"
          type="password"
          placeholder="Current Password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <input
          className="input input-bordered w-full max-w-xs my-2"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <Button
        style={buttonStyle}
        onClick={handleChangePassword}>
        Change Password
      </Button>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default ChangePasswordComponent;
