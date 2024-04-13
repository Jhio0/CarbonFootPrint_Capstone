import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import firebase from 'firebase/app'; 
import { auth } from '../_utils/firebase';

export const ProfileDiv1 = ({ handleTogglePrivatePosts, handleToggleAllReports, handleTogglePublicPosts }) => {
    const [displayName, setDisplayName] = useState(null); 
    const [photoURL, setPhotoURL] = useState(null);
    const [buttonClicked, setButtonClicked] = useState({
        privatePosts: false,
        publicPosts: false,
        allReports: false
    });

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setDisplayName(user.displayName);
                setPhotoURL(user.photoURL); 
            } else {
                setDisplayName(null);
                setPhotoURL(null);
            }
        });
        return () => unsubscribe();
    }, []); 

    const profileDivContainerStyle = {
        backgroundColor: '#1E1E1C',
        borderRadius: '6px',
        width: '100%',
        display: 'inline-Block',
        height: '100vh'
    };

    const nameStyle = {
        containerSpacing: '2',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center',
        paddingTop: '50px', 
        color: 'white'

    };

    const profileImageStyle = {
        marginTop: '17px',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: '50%',

    }

    const profileDescStyle = {
        paddingTop: '30px', 
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column',
    }

    const buttonStyle = {
        padding: '10px 15px',
        cursor: 'pointer',
        borderRadius: '8px',
        marginBottom: '10px',
        backgroundColor: '#2E3B46',  
        color: '#FFFFFF',  
        width: '200px',
    };

    const handleClick = (button) => {
        setButtonClicked(prevState => ({
            privatePosts: button === 'privatePosts' ? !prevState.privatePosts : false,
            publicPosts: button === 'publicPosts' ? !prevState.publicPosts : false,
            allReports: button === 'allReports' ? !prevState.allReports : false
        }));
    };

    return (
        <div style={profileDivContainerStyle}>
            <div style={nameStyle}>
                <Typography variant="h5">{displayName ? displayName : 'User'}</Typography>
            </div>

            <figure style={profileImageStyle}>
                {photoURL ? (
                    <img src={photoURL} alt="Profile" style={profileImageStyle} />
                ) : (
                    <img src="userprofile.jpg" alt="Profile" style={profileImageStyle} />
                )}
            </figure>

            <div style={profileDescStyle}>
                <Button 
                    variant="contained" 
                    style={{ ...buttonStyle, backgroundColor: buttonClicked.privatePosts ? '#4CAF50' : '#2E3B46' }} 
                    onClick={() => {
                        handleClick('privatePosts');
                        handleTogglePrivatePosts();
                    }}
                >
                    Show Private Posts
                </Button>
                <br />
                <Button 
                    variant="contained" 
                    style={{ ...buttonStyle, backgroundColor: buttonClicked.publicPosts ? '#4CAF50' : '#2E3B46' }} 
                    onClick={() => {
                        handleClick('publicPosts');
                        handleTogglePublicPosts();
                    }}
                >
                    Show Public Posts
                </Button>
                <br />
                <Button 
                    variant="contained" 
                    style={{ ...buttonStyle, backgroundColor: buttonClicked.allReports ? '#4CAF50' : '#2E3B46' }} 
                    onClick={() => {
                        handleClick('allReports');
                        handleToggleAllReports();
                    }}
                >
                    Show All Reports
                </Button>
            </div>
        </div>
    );
}
