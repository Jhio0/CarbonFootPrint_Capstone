import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import firebase from 'firebase/app'; 
import { auth } from '../_utils/firebase';

export const ProfileDiv1 = ({ handleTogglePrivatePosts, handleToggleAllReports, handleTogglePublicPosts }) => {
    const [displayName, setDisplayName] = useState(null); 
    const [photoURL, setPhotoURL] = useState(null); 

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
        backgroundColor: '#212d33',
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
    }

    const profileImageStyle = {
        marginTop: '17px',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        borderRadius: '50%' 
    }

    const profileDescStyle = {
        padding: '20px',
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center', 
        flexDirection: 'column',

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
                <Button variant="contained" color="primary" onClick={handleTogglePrivatePosts}>Show Private Posts</Button>
                <br />
                <Button variant="contained" color="primary" onClick={handleTogglePublicPosts}>Show Public Posts</Button>
                <br />
                <Button variant="contained" color="primary" onClick={handleToggleAllReports}>Show All Reports</Button>
            </div>
        </div>
    );
}
