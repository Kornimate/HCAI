import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';
import { config } from '../configs/configBranding';

const initialPlaceholderImageUrl = 'https://via.placeholder.com/500x500';

const FirstGeneration = ({handleGenerate}) => {

    const {
        mainPage: {
          initialImage,
          generatedImage,
          promptArea,
          generateButton
        }
    } = config.branding;

    const initialImageSize = {
        width: generatedImage.width.sm * 0.8, 
        height: generatedImage.height.sm * 0.8, 
    };

    const [prompt, setPrompt] = useState('');

    const handlePromptChange = (event) => {
        setPrompt(event.target.value);
    };

    return (
        <>
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
    )
}

export default FirstGeneration;