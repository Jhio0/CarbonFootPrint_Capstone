import React, { useState } from "react";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
} from "firebase/auth";
import { auth } from "../_utils/firebase";

const ChangePasswordComponent = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChangePassword = async () => {
    try {
      const user = auth.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);
      setSuccess("Password updated successfully.");
      setError(""); // Clear any previous errors
    } catch (error) {
      setError(error.message);
      setSuccess(""); // Clear any previous success message
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Change Password</h2>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
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
      <button className="btn btn-primary mt-4" onClick={handleChangePassword}>
        Change Password
      </button>
    </div>
  );
};

export default ChangePasswordComponent;