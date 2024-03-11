import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { UserAuth } from '../context/AuthContext';

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  listStyle: 'none',
  padding: '20px',
  backgroundColor: '#212d33',
};

const navLinkStyle = {
  textDecoration: 'none',
  color: 'white', // Set text color to white
};

const navbarUlClassName = 'flex';
const navbarLiClassName = 'p-2 cursor-pointer';
const navbarLiFontSize = { fontSize: '20px' };

const Navbar = () => {

    const { user, logOut } = UserAuth();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const checkAuthentication = async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        setLoading(false);
        };
        checkAuthentication();
    }, [user]);
    
    console.log('User:', user);
    
    const handleSignOut = async () => {
        try {
        await logOut(); 
        router.push("/");
        } catch (error) {
        console.error('Logout failed', error);
        }
    };

      


  return (
    <div className="navbar" style={navbarStyle}>
      <h1 style={navbarLiFontSize}>CarboonFootPrint</h1>
      {
        loading ? null : !user ? (
          <ul className={navbarUlClassName}>
            <li className={`${navbarLiClassName}`} style={navbarLiFontSize}>
              <Link href="/" style={navLinkStyle}>
                Home 
              </Link>
            </li>
            <li className={`${navbarLiClassName}`} style={navbarLiFontSize}>
              <Link href="/logIn" style={navLinkStyle}>
                Login 
              </Link>
            </li>
            <li className={`${navbarLiClassName}`} style={navbarLiFontSize}>
              <Link href="/signUp" style={navLinkStyle}>
                Sign Up 
              </Link>
            </li>
          </ul>
        ) : (
          <ul className={navbarUlClassName}>
            <li className={`${navbarLiClassName}`} style={navbarLiFontSize}>
              <Link href="/" style={navLinkStyle}>
                Calculator 
              </Link>
            </li>
            <li className={`${navbarLiClassName}`} style={navbarLiFontSize}>
              <Link href="/" style={navLinkStyle}>
                Favorite 
              </Link>
            </li>
            <li className={`${navbarLiClassName}`} style={navbarLiFontSize} onClick={handleSignOut}>
              Sign out
            </li>
          </ul>
        )
      }
    </div>
  );
};

export default Navbar;