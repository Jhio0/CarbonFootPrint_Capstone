import React, { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import firebase from 'firebase/app'; // Import firebase
import { auth } from '../_utils/firebase';

export const ProfileDiv1 = () => {
    const [displayName, setDisplayName] = useState(null); // State to store user's display name
    //const { user } = UserAuth();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            // This function will be called whenever the authentication state changes
            if (user) {
                // If a user is logged in, set their display name
                setDisplayName(user.displayName);
            } else {
                // If no user is logged in, set displayName to null
                setDisplayName(null);
            }
        });
    
        // Cleanup function: Unsubscribe from the auth state listener when the component unmounts
        return () => unsubscribe();
    }, []); // Empty dependency array means this effect runs only once, after the component mounts

    const profileDivContainerStyle = {
        backgroundColor: 'blue',
        borderRadius: '6px',
        width: '100%',
        display: 'inline-Block',
        height: '100%'
    };

    const nameStyle = {
        containerSpacing: '2',
        padding: '20px',
    }

    const profileImageStyle = {
        marginTop: '17px',
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
                {/* Your profile image */}
            </figure>

            <div style={profileDescStyle}>
                <Typography variant="body1">Profile Desc</Typography>
                <br/>
                <Typography variant="body1">Insert Emission graph here</Typography>
                <br/>
                <button>Edit</button>
            </div>
        </div>
    );
}
