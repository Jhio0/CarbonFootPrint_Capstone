import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import firebase from 'firebase/app'; // Import firebase
import { auth } from '../_utils/firebase';

export const ProfileDiv1 = ({ handleTogglePrivatePosts, handleToggleAllReports,handleTogglePublicPosts  }) => {
    const [displayName, setDisplayName] = useState(null); // State to store user's display name
    const [photoURL, setPhotoURL] = useState(null); // State to store user's photo URL

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            // This function will be called whenever the authentication state changes
            if (user) {
                // If a user is logged in, set their display name and photo URL
                setDisplayName(user.displayName);
                setPhotoURL(user.photoURL); // Set the photo URL
            } else {
                // If no user is logged in, set displayName and photoURL to null
                setDisplayName(null);
                setPhotoURL(null);
            }
        });
    
        // Cleanup function: Unsubscribe from the auth state listener when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs only once, after the component mounts

    const profileDivContainerStyle = {
        backgroundColor: '#212d33',        
        borderRadius: '6px',
        width: '100%',
        display: 'inline-Block',
        height: '100vh'
    };

    const nameStyle = {
        containerSpacing: '2',
        padding: '20px',
    }

    const profileImageStyle = {
        marginTop: '17px',
        display: 'flex',
        justifyContent: 'center', // Center horizontally
        alignItems: 'center', // Center vertically
        borderRadius: '50%' // Apply border radius to make it circular
    }
    
    const profileDescStyle = {
        padding:'20px',
    }
    
    return (
        <div style={profileDivContainerStyle}>
            <div style={nameStyle}>
                <Typography variant="h6">{displayName ? displayName : 'User'}</Typography>
            </div>

            <figure style={profileImageStyle}>
                {photoURL ? (
                    <img src={photoURL} alt="Profile" style={profileImageStyle} />
                ) : (
                    <img src="userprofile.jpg" alt="Profile" style={profileImageStyle} />
                )}
            </figure>

            <div style={profileDescStyle}>
                <button onClick={handleTogglePrivatePosts}>Show Private Posts</button>
                <br/>
                <button onClick={handleTogglePublicPosts}>Show Public Posts</button>
                <br/>
                <button onClick={handleToggleAllReports}>Show All Reports</button>
            </div>
        </div>
    );
}
