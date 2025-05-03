import { Outlet } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Menu, MenuItem, Button } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { config } from '../configs/configBranding';
import { useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";


const AppLayout = () => {

    const [anchorEl, setAnchorEl] = useState(null);

    const location = useLocation();

    const isOnMainPage = location.pathname.startsWith("/app")

    const [searchParams] = useSearchParams();

    const { logoPlaceholder, header, mainPage: {dropdown} } = config.branding;

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };
    
      const handleMenuOption = (option) => {
        if(option.id === 1)
            NewPicGeneration();
        else if (option.id === 2)
            LastPicGeneration();
        handleMenuClose();
      };

      function NewPicGeneration(){
        if(Array.from(searchParams).length > 0)
            window.location = "/app"
        else
            window.location.reload();
      }

      function LastPicGeneration(){
         window.location = "/app?lastImgLoad=1";
      }

      function NavigateToLandingPage(){
        window.location = "/";
      }

    return (
        <>
            <AppBar position="static" sx={{ backgroundColor: header.backgroundColor }}>
                <Toolbar>
                <Box
                    sx={{
                    width: logoPlaceholder.size,
                    height: logoPlaceholder.size,
                    borderRadius: '50%',
                    backgroundColor: logoPlaceholder.backgroundColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mr: 2,
                    }}
                >
                    {logoPlaceholder.logoSrc ? (
                    <Button onClick={NavigateToLandingPage}>
                        <img
                            src={logoPlaceholder.logoSrc}
                            alt="Pixcasso Logo"
                            style={{ width: '100%', height: '100%', borderRadius: '50%' }}
                            />
                    </Button>
                    ) : (
                    <Typography variant="h6" sx={{ color: logoPlaceholder.textColor }}>
                        {logoPlaceholder.text}
                    </Typography>
                    )}
                </Box>
                { 
                    isOnMainPage && <>
                        <MenuIcon
                            sx={{ color: dropdown.menuIconColor, cursor: 'pointer' }}
                            onClick={handleMenuOpen}
                            />
                        <Menu
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                            sx={{ '& .MuiPaper-root': { backgroundColor: dropdown.backgroundColor } }}
                            >
                            {dropdown.options.map((option) => (
                                <MenuItem
                                key={option.label}
                                onClick={() => handleMenuOption(option)}
                                sx={{ color: dropdown.textColor }}
                                >
                                {option.label}
                            </MenuItem>
                            ))}
                        </Menu>
                    </> 
                }
                </Toolbar>
            </AppBar>
            <Outlet />
        </>
    )
}

export default AppLayout;