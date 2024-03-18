"use client"
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState } from "react";
import { useRouter } from 'next/navigation';  
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const AuthSignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const signUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      window.alert('User signed up successfully!'); 
      console.log(user);
      router.push('/');
    } catch (error) {
      window.alert(`Sign up failed: ${error.message}`); 
      console.error("Sign up failed:", error.message);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <form>
        <TextField
          style={{ marginBottom: '10px' }}
          label="Email"
          variant="outlined"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <TextField 
          style={{ marginBottom: '10px' }}
          label="Password"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div>
          <Button
            variant="contained"
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
