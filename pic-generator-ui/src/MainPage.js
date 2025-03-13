import React, { useState, useCallback } from 'react';
import { AppBar, Toolbar, Typography, Container, Box, Button, TextField, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { config } from './configBranding';

// Placeholder image (replace with your generated image URL or import)
const placeholderImageUrl = 'https://via.placeholder.com/500x500'; // Example placeholder

function MainPage() {
  const [isModified, setIsModified] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [modifications, setModifications] = useState({});
  const [prompt, setPrompt] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [crop, setCrop] = useState({ unit: 'px', x: 0, y: 0, width: 50, height: 50 });
  const [completedCrop, setCompletedCrop] = useState(null);

  const {
    logoPlaceholder,
    header,
    mainPage: {
      initialHeading,
      generatedImage,
      promptArea,
      generateButton,
      modifiedHeading,
      regionInputs,
      rewritePrompt,
      submitButton,
      dropdown,
    },
  } = config.branding;

  // Handle crop completion (when user finalizes a region)
  const onCropComplete = useCallback((crop) => {
    if (crop.width && crop.height) {
      const regionId = selectedRegions.length + 1;
      setSelectedRegions([...selectedRegions, { id: regionId, ...crop }]);
      setModifications({ ...modifications, [regionId]: '' });
      setCompletedCrop(crop);
      setCrop({ unit: 'px', x: 0, y: 0, width: 50, height: 50 }); // Reset crop for next selection
    }
  }, [selectedRegions, modifications]);

  // Handle modification input change
  const handleModificationChange = (regionId, value) => {
    setModifications({ ...modifications, [regionId]: value });
  };

  // Handle region removal with reindexing
  const handleRemoveRegion = (regionIdToRemove) => {
    // Filter out the region to remove
    const updatedRegions = selectedRegions.filter((region) => region.id !== regionIdToRemove);
    
    // Reindex the remaining regions
    const reindexedRegions = updatedRegions.map((region, index) => ({
      ...region,
      id: index + 1,
    }));

    // Update modifications to match new region IDs
    const updatedModifications = {};
    reindexedRegions.forEach((region) => {
      if (modifications[region.id] || modifications[regionIdToRemove]) {
        updatedModifications[region.id] = modifications[region.id] || modifications[regionIdToRemove];
      }
    });

    setSelectedRegions(reindexedRegions);
    setModifications(updatedModifications);
  };

  // Handle prompt change
  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  // Handle generate/regenerate
  const handleGenerate = () => {
    if (!isModified) {
      setIsModified(true); // Simulate image generation
    } else {
      console.log('Regenerating with modifications:', modifications, 'and prompt:', prompt);
      // Reset state to start fresh
      setIsModified(false);
      setSelectedRegions([]);
      setModifications({});
      setPrompt('');
      setCrop({ unit: 'px', x: 0, y: 0, width: 50, height: 50 });
      setCompletedCrop(null);
    }
  };

  // Dropdown menu handlers
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMenuOption = (option) => {
    console.log('Selected:', option.placeholder);
    handleMenuClose();
  };

  return (
    <div>
      {/* Header with Dropdown */}
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
                {option.label} (Placeholder: {option.placeholder})
              </MenuItem>
            ))}
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 8, textAlign: 'center', padding: { xs: 2, md: 4 } }}>
        <Typography variant="h4" sx={{ mb: 4, color: '#455A64', fontWeight: 'bold' }}>
          {isModified ? modifiedHeading : initialHeading}
        </Typography>

        {/* Image with Region Selection */}
        <Box sx={{ mb: 4, mx: 'auto', position: 'relative', display: 'inline-block' }}>
          {isModified ? (
            <>
              <ReactCrop
                crop={crop}
                onChange={(newCrop) => setCrop(newCrop)}
                onComplete={onCropComplete}
              >
                <img
                  src={placeholderImageUrl}
                  alt="Generated"
                  style={{ width: generatedImage.width.sm, height: generatedImage.height.sm }}
                />
              </ReactCrop>
              {/* Display already selected regions */}
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
                width: generatedImage.width.sm,
                height: generatedImage.height.sm,
                backgroundColor: generatedImage.backgroundColor,
                border: `1px solid ${generatedImage.borderColor}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
              }}
            >
              <img
                src={placeholderImageUrl}
                alt="Placeholder"
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
            {/* Region Modification Inputs */}
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

            {/* Rewrite Prompt */}
            <Box sx={{ mb: 2, p: 2, backgroundColor: rewritePrompt.backgroundColor, borderRadius: 4, maxWidth: 600, mx: 'auto' }}>
              <Typography variant="h6" sx={{ color: rewritePrompt.textColor, mb: 1 }}>
                {rewritePrompt.label}
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={rewritePrompt.rows}
                variant="outlined"
                placeholder={rewritePrompt.placeholder}
                value={prompt}
                onChange={handlePromptChange}
                sx={{ backgroundColor: '#fff' }}
              />
            </Box>

            {/* Submit Button */}
            <Button
              variant="contained"
              onClick={handleGenerate}
              sx={{
                backgroundColor: submitButton.backgroundColor,
                color: submitButton.textColor,
                mb: 4,
                padding: submitButton.padding,
                '&:hover': { backgroundColor: submitButton.hoverColor },
              }}
            >
              {submitButton.text}
            </Button>
          </>
        )}
      </Container>
    </div>
  );
}

export default MainPage;