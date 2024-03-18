"use client"
import { auth } from "../_utils/firebase.js";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

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

  useEffect(() => {
    console.log(router); // Log the router object to inspect its properties
  }, [router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <form>
        <div>
          <input
            style={inputStyle}
            placeholder="Email"
            value={email}
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
