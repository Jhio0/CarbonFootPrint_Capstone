"use client"
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { addAccount } from "../account/_services/account-service.js";
import { useNavigate } from "react-router-dom";

export const AuthSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const account = {
        email: email,
        username: username,
        firstName: firstName,
        lastName: lastName,
      };

      await addAccount(user.uid, account)
    }
    catch (error) {
      console.log(error);
    }
  };

  const buttonStyle = {
    padding: '10px 15px', 
    cursor: 'pointer',
    backgroundColor: '#212d33',
    borderRadius: '8px',
  };
  
  const inputStyle = {
    color: 'black',
    marginBottom: '10px',
    padding: '8px',
  };
    


  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <form>
        <div>
          <input
            style={inputStyle}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <input
            style={inputStyle}
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <button onClick={signUp} style={buttonStyle}>Sign Up</button>
        </div>
      </form>
    </div>
  );
  
};
