"use client"
import { auth } from "../_utils/firebase.js";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const AuthSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const signUp = async (e) => {
    try {
      e.preventDefault();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const userId = userCredential.user.uid;
      router.push(`signUp/${userId}`);
    }
    catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(router); // Log the router object to inspect its properties
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <form>
        <div>
          <TextField
          style={{ marginBottom: '10px' }}
          label="Email"
          variant="outlined"
          type="email"
          value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
          style={{ marginBottom: '10px' }}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div>
          <Button variant="contained"
          onClick={signUp}
          style={{ backgroundColor: '#212d33', color: 'white', width: '200px', marginTop: '10px' }}
          >
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
  
};
