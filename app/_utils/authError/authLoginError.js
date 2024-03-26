import { Typography } from "@mui/material"

export const LogInError = () => {
    const backgroundStyle = {
        background: `url('loginbi.gif')`,  
        backgroundSize: 'cover',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    }

    return (
        <div style={backgroundStyle}>
            <Typography variant="h6">
                Error: Please Log In 
            </Typography>
        </div>
    )
}