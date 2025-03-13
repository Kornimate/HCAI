import React from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import { config } from './configBranding';
import './App.css';

function App() {
  const navigate = useNavigate();
  const { logoPlaceholder, headingPlaceholder, imagePlaceholder, button, descriptionPlaceholder, header } = config.branding;

  const handleGetStarted = () => {
    navigate('/main');
  };

  return (
    <div className="App">
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
            <Typography variant="h6" sx={{ color: logoPlaceholder.textColor }}>
              {logoPlaceholder.text}
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 8, textAlign: 'center', padding: { xs: 2, md: 4 } }}>
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

        <Typography variant={headingPlaceholder.variant} sx={{ mb: 2, color: headingPlaceholder.color, fontWeight: headingPlaceholder.fontWeight }}>
          {headingPlaceholder.text}
        </Typography>

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

        <Typography variant="body1" sx={{ color: descriptionPlaceholder.color, maxWidth: descriptionPlaceholder.maxWidth, mx: 'auto' }} dangerouslySetInnerHTML={{ __html: descriptionPlaceholder.text }} />
      </Container>
    </div>
  );
}

export default App;