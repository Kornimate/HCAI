import React, { useState } from 'react';
import { Typography, Container, Box } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';
import { config } from '../configs/configBranding';
import LoopGeneration from '../components/LoopGeneration';
import FirstGeneration from '../components/FirstGeneration';
import { useSearchParams } from 'react-router-dom';

function MainPage() {
  
  const [isModified, setIsModified] = useState(false);
  const [firstPrompt, setFirstPrompt] = useState("");

  const [searchParams] = useSearchParams();

  const sParamResult = searchParams.get("lastImgLoad") === "1";
  
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
        {
          isModified || sParamResult
          ? <Box sx={{ mb: 4, mx: 'auto', position: 'relative', display: 'inline-block' }}>
              <LoopGeneration firstPrompt={firstPrompt} lastLoad={sParamResult} />
            </Box> 
          : <Box sx={{ mb: 4, mx: 'auto', position: 'relative', display: 'block' }}>
              <FirstGeneration handleGenerate={handleGenerate} setFirstPrompt={setFirstPrompt} />
            </Box>
        }
        
      </Container>
    </div>
  );
}

export default MainPage;