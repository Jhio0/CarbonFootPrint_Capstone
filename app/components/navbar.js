"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Link from 'next/link'; // Import Link from Next.js
import { ThemeProvider, createTheme } from '@mui/material/styles';


import { useRouter } from 'next/navigation';
import { UserAuth } from '../context/AuthContext';

const pages = ['logIn','signUp', 'feed', 'news'];
const pagesauth = ['CFCalc', 'reports', 'forum', 'feed', 'news']

const settings = ['Profile', 'Settings', 'Logout',];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  
  const { user, logOut } = UserAuth(); // Assuming UserAuth is imported
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);


  const handleSignOut = async () => {
    try {
      await logOut();
      router.push("/");
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  //color

  const customTheme = createTheme({
    palette: {
      primary: {
        main: '#1E1E1C', // Replace with the primary color you want for the AppBar
      },
      secondary: {
        main: '#E6CF58', // Replace with the color you want for the hover
      },
      // Add other custom colors as needed
    },
    components: {
      MuiButton: {
        styleOverrides: {
          // Style override for hover state on buttons
          root: {
            '&:hover': {
              backgroundColor: '#E6CF58', // Replace with the hex color for hover
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Link href="/" passHref>
              <Image
                src="../../carbonlogo.svg" // Update with the path to your logo
                alt="logo"
                width={35} // Set the size of your logo
                height={35}
                style={{ cursor: 'pointer' }} // Optional for a pointer cursor on hover\
                className="mr-4"
              />
            </Link>

            {loading ? null : !user ? (
              <>
                {/* Code for non-authenticated user */}
                <Box
                  sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                >
                  <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                  >
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                      display: { xs: 'block', md: 'none' },
                    }}
                  >
                    {pages.map((page) => (
                      <MenuItem key={page} onClick={handleCloseNavMenu}>
                        <Link href={`/${page}`}>
                          <Typography textAlign="center">{page}</Typography>
                        </Link>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                  {pages.map((page) => (
                    <Button
                      key={page}
                      onClick={handleCloseNavMenu}
                      sx={{ my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: 'secondary.main' } }}
                    >
                      <Link href={`/${page}`}>{page}</Link>
                    </Button>
                  ))}
                </Box>
              </>
            ) : (
              <>
                {/* Code for authenticated user */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {pagesauth.map((page) => {
                    switch (page) {
                      case 'CFCalc':
                        return (
                          <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Link href="/CFCalc">CFCalc</Link>
                          </Button>
                        );
                      case 'reports':
                        return (
                          <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                            <Link href="/reports">Reports</Link>
                          </Button>
                        );
                        case 'forum':
                          return (
                            <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                              <Link href="/forum">Forum</Link>
                            </Button>
                          );
                        case 'feed':
                          return (
                            <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                              <Link href="/feed">Feed</Link>
                            </Button>
                          );
                        case 'news':
                          return (
                            <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                              <Link href="/news">News</Link>
                            </Button>
                          );
                      default:
                        return (
                          <Button key={page} onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                            {page}
                          </Button>
                        );
                    }
                    })}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                    </IconButton>
                  </Tooltip>
                  <Menu
                    sx={{ mt: '45px' }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => {
                      switch (setting) {
                        case 'Profile':
                          return (
                            <MenuItem key={setting}>
                              <Link href="/profile">
                                <Typography textAlign="center">Profile</Typography>
                              </Link>
                            </MenuItem>
                          );
                          case 'Settings':
                            return (
                              <MenuItem key={setting}>
                                <Link href="/settings">
                                  <Typography textAlign="center">Settings</Typography>
                                </Link>
                              </MenuItem>
                            );
                        case 'Logout':
                          return (
                            <MenuItem key={setting} onClick={handleSignOut}>
                              <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                          );
                        default:
                          return (
                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                              <Typography textAlign="center">{setting}</Typography>
                            </MenuItem>
                          );
                      }
                    })}
                  </Menu>
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}

export default ResponsiveAppBar;