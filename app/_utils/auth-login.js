
import { useState } from 'react';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';  

export const AuthLogin = () => {
  const { onLogin, googleSignIn } = UserAuth();  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onLogin(email, password);
      router.push('/');
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

  const inputStyle = {
    color: 'black',
    padding: '8px',
    marginBottom: '10px',
    width: '200px', 
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20vh' }}>
      <form onSubmit={handleSubmit}>
        <input
          style={inputStyle}
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          style={inputStyle}
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div style={{margin:'20px'}}>
          <button
            type="submit"
            style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#212d33',  borderRadius: '8px', marginBottom: '10px',}}
          >
            Login
          </button>
        </div>
      </form>
      <button
            type="submit"
            style={{ padding: '10px 15px', cursor: 'pointer', backgroundColor: '#212d33',  borderRadius: '8px',}}
            onClick={handleGoogleSubmit}
      >
        Login With Google
      </button>
    </div>
  );
};
