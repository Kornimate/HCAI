import ReactCrop from 'react-image-crop';
import { Typography, Box, TextField, IconButton, Button, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState, useCallback, useEffect } from 'react';
import { config } from '../configs/configBranding';
import GeneratePromptFromArrayOfInstructions from '../services/PromptService';
import axios from "axios";
import { URLS } from '../configs/configURLs';

const LoopGeneration = ({firstPrompt}) => {

    const [crop, setCrop] = useState({ unit: 'px', x: 0, y: 0, width: 50, height: 50 });
    const [currentImageUrl, setCurrentImageUrl] = useState(null);
    const [selectedRegions, setSelectedRegions] = useState([]);
    const [modifications, setModifications] = useState({});
    const [isInProgress, setIsInProgress] = useState(true);
    const [imageBlob, setImageBlob] = useState(null);
    const [prompt, setPrompt] = useState({ value: "" })

      const {
        mainPage: {
          generatedImage,
          regionInputs,
          submitButton,
        },
      } = config.branding;

    const onCropComplete = useCallback((crop) => {
        if (crop.width && crop.height) {
          const regionId = selectedRegions.length + 1;
          setSelectedRegions([...selectedRegions, { id: regionId, ...crop }]);
          setModifications({ ...modifications, [regionId]: '' });
          setCrop({ unit: 'px', x: 0, y: 0, width: 0, height: 0 });
        }
    }, [selectedRegions, modifications]);

    useEffect(() => {
      if(firstPrompt === "" || firstPrompt === null || firstPrompt === undefined)
        return;

      setPrompt({ value: firstPrompt })
      setIsInProgress(false)
    }, [firstPrompt]);

    useEffect(() => {
      if(prompt.value === "" || prompt.value === undefined || prompt.value === null)
        return;

      setIsInProgress(true);
      
      let endpoint = null;
      let payload = null;
      let headers = null;

      if(prompt.value === firstPrompt){
        endpoint =  "txt-to-img";
        payload = new FormData();
        payload.append("prompt", prompt.value);
        headers = {
          responseType: "blob"
        }
      } else {
        endpoint = "img-to-img";
        payload = new FormData();
        payload.append("image", imageBlob, "generated.jpg");
        payload.append("prompt", prompt.value);
        headers = {
          responseType: "blob",
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      }
      
      axios.post(`${URLS.API_ENDPOINT_BASE}/${endpoint}`, payload, headers).then(result => {
        HandleImageUrl(result.data);
        setIsInProgress(false);
      });

      function HandleImageUrl(imgBlob){
        const imageUrl = URL.createObjectURL(imgBlob);
        setImageBlob(imgBlob)
        setCurrentImageUrl(imageUrl)
      }
    }, [prompt]);
    
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

    const handleGenerate = () => {
          console.log(selectedRegions)
          console.log(modifications)
          setPrompt({ value: GeneratePromptFromArrayOfInstructions(modifications, selectedRegions) })
          setSelectedRegions([]); // Clear regions for new selections
          setModifications({}); // Clear modifications for new inputs
          setCrop({ unit: 'px', x: 0, y: 0, width: 0, height: 0 }); // Reset crop
    };

    return (
        isInProgress
        ? 
         (<Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center', width: '100%' }}>
            <CircularProgress />
        </Box>)
        :(<>
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
          
          <Box sx={{ display: 'flex', gap: 2, mb: 4, justifyContent: 'center', width: '100%' }}>
            <Button
            variant="contained"
            onClick={handleDownload}
            sx={{
              backgroundColor: '#4CAF50', 
              color: '#fff',
              my: 2,
              padding: submitButton.padding,
              '&:hover': { backgroundColor: '#45a049' },
            }}
            >
            Download
            </Button>
          </Box>
          
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
              </Box>
            )}
        </>)
    )
}
        
export default LoopGeneration;