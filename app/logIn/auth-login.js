"use client"
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';  
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export const AuthLogin = () => {
  const { onLogin, googleSignIn } = UserAuth();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(email, password);
    } catch (error) {
      console.error('Login failed', error);
      window.alert(`Login failed: ${error.message}`);
    }
  };

  const handleGoogleSubmit = async () => {
    try{
      await googleSignIn();
      router.push('/');
    }catch (error) {
      window.alert(`Login failed: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <form onSubmit={handleSubmit}>
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
            type="submit"
            style={{ backgroundColor: '#212d33', color: 'white', width: '200px', marginTop: '10px'}}
          >
            Login
          </Button>
        </div>
      </form>
      <Button
        variant="contained"
        onClick={handleGoogleSubmit}
        style={{ backgroundColor: '#212d33', color: 'white', width: '200px', marginTop: '10px' }}
      >
        Login With Google
      </Button>
    </div>
  );
};

