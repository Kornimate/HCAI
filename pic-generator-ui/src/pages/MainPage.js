import React, { useState, useCallback } from 'react';
import { Typography, Container, Box, Button, TextField, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { config } from '../configs/configBranding';

// Placeholder images (simulating new generation)
const initialPlaceholderImageUrl = 'https://via.placeholder.com/500x500';
const generatedPlaceholderImageUrl = 'https://via.placeholder.com/500x500/FF5733/FFFFFF';

function MainPage() {
  const [isModified, setIsModified] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [modifications, setModifications] = useState({});
  const [prompt, setPrompt] = useState('');
  const [crop, setCrop] = useState({ unit: 'px', x: 0, y: 0, width: 50, height: 50 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [currentImageUrl, setCurrentImageUrl] = useState(null); 

  const {
    mainPage: {
      initialHeading,
      initialImage,
      generatedImage,
      promptArea,
      generateButton,
      modifiedHeading,
      regionInputs,
      submitButton,
    },
  } = config.branding;

  const initialImageSize = {
    width: generatedImage.width.sm * 0.8, 
    height: generatedImage.height.sm * 0.8, 
  };

  const onCropComplete = useCallback((crop) => {
    if (crop.width && crop.height) {
      const regionId = selectedRegions.length + 1;
      setSelectedRegions([...selectedRegions, { id: regionId, ...crop }]);
      setModifications({ ...modifications, [regionId]: '' });
      setCompletedCrop(crop);
      setCrop({ unit: 'px', x: 0, y: 0, width: 50, height: 50 });
    }
  }, [selectedRegions, modifications]);

  const handleModificationChange = (regionId, value) => {
    setModifications({ ...modifications, [regionId]: value });
  };

  const handleRemoveRegion = (regionIdToRemove) => {
    const updatedRegions = selectedRegions.filter((region) => region.id !== regionIdToRemove);
    const reindexedRegions = updatedRegions.map((region, index) => ({
      ...region,
      id: index + 1,
    }));
    const updatedModifications = {};
    reindexedRegions.forEach((region) => {
      if (modifications[region.id] || modifications[regionIdToRemove]) {
        updatedModifications[region.id] = modifications[region.id] || modifications[regionIdToRemove];
      }
    });
    setSelectedRegions(reindexedRegions);
    setModifications(updatedModifications);
  };

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleGenerate = () => {
    if (!isModified) {
      setIsModified(true); // Switch to modified view with initial image
      setCurrentImageUrl(initialPlaceholderImageUrl); // Use initial placeholder for first generation
    } else {
      // Simulate generating a new image based on modifications
      console.log('Generating new image with modifications:', modifications);
      setCurrentImageUrl(generatedPlaceholderImageUrl); // Switch to a new placeholder image
      setSelectedRegions([]); // Clear regions for new selections
      setModifications({}); // Clear modifications for new inputs
      setCrop({ unit: 'px', x: 0, y: 0, width: 50, height: 50 }); // Reset crop
      setCompletedCrop(null); // Reset completed crop
      // API call and update currentImageUrl with the result
    }
  };

  const handleDownload = () => {
    if (currentImageUrl) {
      const link = document.createElement('a');
      link.href = currentImageUrl;
      link.download = `generated_image_${Date.now()}.png`; 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div>
      

      <Container sx={{ mt: 8, textAlign: 'center', padding: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 4, color: '#455A64', fontWeight: 'bold' }}>
          {isModified ? modifiedHeading : initialHeading}
        </Typography>

        <Box sx={{ mb: 4, mx: 'auto', position: 'relative', display: 'inline-block' }}>
          {isModified ? (
            <>
              <ReactCrop
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={onCropComplete}
              >
                <img
                  src={currentImageUrl}
                  alt="Generated"
                  style={{ width: generatedImage.width.sm, height: generatedImage.height.sm }}
                />
              </ReactCrop>
              {selectedRegions.map((region) => (
                <Box
                  key={region.id}
                  sx={{
                    position: 'absolute',
                    top: region.y,
                    left: region.x,
                    width: region.width,
                    height: region.height,
                    border: '2px solid red',
                    backgroundColor: 'rgba(255, 0, 0, 0.3)',
                    pointerEvents: 'none',
                  }}
                >
                  <Typography sx={{ color: 'white', fontSize: 12, textAlign: 'center' }}>
                    {region.id}
                  </Typography>
                </Box>
              ))}
            </>
          ) : (
            <Box
              sx={{
                width: initialImageSize.width,
                height: initialImageSize.height,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
              }}
            >
              <img
                src={initialImage.src || initialPlaceholderImageUrl}
                alt="Robot Drawing"
                style={{ width: '60%', height: '60%', borderRadius: '50%' }}
              />
            </Box>
          )}
        </Box>

        {!isModified ? (
          <>
            <Box sx={{ mb: 4, maxWidth: 600, mx: 'auto', textAlign: 'left' }}>
              <TextField
                fullWidth
                label={promptArea.label}
                multiline
                rows={promptArea.rows}
                variant="outlined"
                placeholder={promptArea.placeholder}
                value={prompt}
                onChange={handlePromptChange}
                sx={{ backgroundColor: promptArea.backgroundColor, color: promptArea.textColor }}
              />
            </Box>
            <Button
              variant="contained"
              onClick={handleGenerate}
              sx={{
                backgroundColor: generateButton.backgroundColor,
                color: generateButton.textColor,
                mb: 4,
                padding: generateButton.padding,
                '&:hover': { backgroundColor: generateButton.hoverColor },
              }}
            >
              {generateButton.text}
            </Button>
          </>
        ) : (
          <>
            {selectedRegions.map((region) => (
              <Box
                key={region.id}
                sx={{
                  mb: 2,
                  p: 2,
                  backgroundColor: regionInputs.backgroundColor,
                  borderRadius: 4,
                  textAlign: 'left',
                  maxWidth: 600,
                  mx: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ color: regionInputs.textColor, mb: 1 }}>
                    {`${regionInputs.labelPrefix} ${region.id}`}
                  </Typography>
                  <TextField
                    fullWidth
                    label={regionInputs.inputLabel}
                    variant="outlined"
                    value={modifications[region.id] || ''}
                    onChange={(e) => handleModificationChange(region.id, e.target.value)}
                    sx={{ backgroundColor: '#fff' }}
                  />
                </Box>
                <IconButton
                  color="error"
                  onClick={() => handleRemoveRegion(region.id)}
                  sx={{ alignSelf: 'center' }}
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}

            {selectedRegions.length > 0 && (
              <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center', width: '100%' }}>
                <Button
                  variant="contained"
                  onClick={handleGenerate}
                  sx={{
                    backgroundColor: submitButton.backgroundColor,
                    color: submitButton.textColor,
                    padding: submitButton.padding,
                    '&:hover': { backgroundColor: submitButton.hoverColor },
                  }}
                >
                  {submitButton.text}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleDownload}
                  sx={{
                    backgroundColor: '#4CAF50', 
                    color: '#fff',
                    padding: submitButton.padding,
                    '&:hover': { backgroundColor: '#45a049' },
                  }}
                >
                  Download
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default MainPage;