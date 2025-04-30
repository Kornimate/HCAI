import { Typography, Container, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { config } from '../configs/configBranding';

const LandingPage = () => {

    const navigate = useNavigate();
    const { headingPlaceholder, imagePlaceholder, button, descriptionPlaceholder } = config.branding;
  
    const handleGetStarted = () => {
      navigate('/app');
    };

    return (
        <>
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
                {imagePlaceholder.src ? (
                    <img
                    src={imagePlaceholder.src}
                    alt="Front Page Preview"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                ) : (
                    <Typography variant="body1">No Image Available</Typography>
                )}
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
        </>
    )
}

export default LandingPage;