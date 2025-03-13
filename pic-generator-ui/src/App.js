import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image'; 
import './App.css';
import { config } from './configBranding'; //config file

function App() {
  const handleGetStarted = () => {
    console.log('Navigate to main page');
  };

  const {
    logoPlaceholder,
    headingPlaceholder,
    imagePlaceholder,
    button,
    descriptionPlaceholder,
    header,
  } = config.branding;

  return (
    <div className="App">
      {/* Header Section */}
      <AppBar position="static" sx={{ backgroundColor: header.backgroundColor }}>
        <Toolbar>
          {/* Placeholder Logo from config */}
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
            <Typography variant="h6" sx={{ color: logoPlaceholder.textColor }}>
              {logoPlaceholder.text}
            </Typography>
          </Box>
          {/* navigation links here if needed */}
        </Toolbar>
      </AppBar>

      {/* Main Section */}
      <Container sx={{ mt: 8, textAlign: 'center', padding: { xs: 2, md: 4 } }}>
        {/* Image Placeholder from config */}
        <Box
          sx={{
            width: imagePlaceholder.width,
            height: imagePlaceholder.height,
            backgroundColor: imagePlaceholder.backgroundColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 4,
            border: `1px solid ${imagePlaceholder.borderColor}`,
          }}
        >
          <ImageIcon sx={{ fontSize: imagePlaceholder.iconSize, color: imagePlaceholder.iconColor }} />
        </Box>

        {/* Heading Placeholder from config */}
        <Typography variant={headingPlaceholder.variant} sx={{ mb: 2, color: headingPlaceholder.color, fontWeight: headingPlaceholder.fontWeight }}>
          {headingPlaceholder.text}
        </Typography>

        {/* Get Started Button */}
        <Button
          variant="contained"
          onClick={handleGetStarted}
          sx={{
            backgroundColor: button.backgroundColor,
            color: button.textColor,
            mb: 4,
            padding: button.padding,
            '&:hover': { backgroundColor: button.hoverColor },
          }}
        >
          {button.text}
        </Button>

        {/* Description Placeholder from config */}
        <Typography variant="body1" sx={{ color: descriptionPlaceholder.color, maxWidth: descriptionPlaceholder.maxWidth, mx: 'auto' }} dangerouslySetInnerHTML={{ __html: descriptionPlaceholder.text }} />
      </Container>
    </div>
  );
}

export default App;