"use client"
import { useContext, createContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useRouter } from 'next/navigation';  
import { auth } from '../_utils/firebase';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  
  const [user, setUser] = useState(null);
  const router = useRouter();


   const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };
  
  const logOut = () => {
    signOut(auth);
    router.push('/');

  };

  const onLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const loggedInUser = userCredential.user;
      console.log(loggedInUser);
      setUser(loggedInUser);
      router.push('/');
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
  };

  const signUp = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      window.alert('User signed up successfully!'); 
      console.log(user);
    } catch (error) {
      window.alert(`Sign up failed: ${error.message}`); 
      console.error("Sign up failed:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []); // Removed 'user' from the dependency array
  
  return (
    <AuthContext.Provider value={{ user, logOut, onLogin, googleSignIn, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
