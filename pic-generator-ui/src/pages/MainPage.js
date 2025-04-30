import React, { useState } from 'react';
import { Typography, Container, Box } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';
import { config } from '../configs/configBranding';
import LoopGeneration from '../components/LoopGeneration';
import FirstGeneration from '../components/FirstGeneration';

function MainPage() {
  
  const [isModified, setIsModified] = useState(false);
  
  const {
    mainPage: {
      initialHeading,
      modifiedHeading
    }
  } = config.branding;

  const handleGenerate = () => {
    setIsModified(true)
  };

  return (
    <div>
      <Container sx={{ mt: 8, textAlign: 'center', padding: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 4, color: '#455A64', fontWeight: 'bold' }}>
          {isModified ? modifiedHeading : initialHeading}
        </Typography>
        <Box sx={{ mb: 4, mx: 'auto', position: 'relative', display: 'inline-block' }}>
          {isModified ? <LoopGeneration />: <FirstGeneration handleGenerate={handleGenerate} /> }
        </Box>
      </Container>
    </div>
  );
}

export default MainPage;