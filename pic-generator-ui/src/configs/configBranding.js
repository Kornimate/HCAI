import pixcassoLogo from '../images/pixcasso_logo.png'; 
import pixcassoWhole from '../images/pixcasso_whole.png'; 
import aiDrawing from '../images/aiDrawing.gif'; 

export const config = {
  branding: {
    // Logo Placeholder
    logoPlaceholder: {
      text: 'P', // Fallback text if the image fails to load
      size: 40,
      backgroundColor: '#fff',
      textColor: '#000',
      logoSrc: pixcassoLogo, // Use the imported image
    },
    // Heading Placeholder
    headingPlaceholder: {
      text: 'Pixcasso: AI Art, Human Control.',
      variant: 'h4',
      color: '#455A64',
      fontWeight: 'bold',
    },
    // Main Image Placeholder (for front page)
    imagePlaceholder: {
      width: { xs: 200, sm: 300 },
      height: { xs: 200, sm: 300 },
      backgroundColor: '#E0E0E0',
      borderColor: '#B0BEC5',
      iconSize: { xs: 60, sm: 100 },
      iconColor: '#B0BEC5',
      src: pixcassoWhole, // Use the imported image
    },
    // Button Styling
    button: {
      text: 'Get Started',
      backgroundColor: '#455A64',
      hoverColor: '#37474F',
      textColor: '#fff',
      padding: '10px 20px',
    },
    // Description Text
    descriptionPlaceholder: {
      text: `Pixcasso transforms AI image generation by putting creative control in your hands. Unlike standard AI tools, Pixcasso enables you to select and refine specific regions of your generated image through additional prompts.
      <br><br>
      Start with your initial vision, then iteratively perfect it by selecting areas to modify until you achieve exactly what you imagined. With Pixcasso, image creation becomes a collaborative dialogue between you and AI, bridging the gap between imagination and realization. Experience the future of AI-assisted creativity today.
      <br /><br />`,
      color: '#78909C',
      maxWidth: 700,
    },
    // Header Styling
    header: {
      backgroundColor: '#2E3B55',
    },
    // Main Page Config
    mainPage: {
      initialHeading: 'Hi, I am Pixcasso! How can I help?',
      initialImage: {
        src: aiDrawing, 
      },
      generatedImage: {
        width: { xs: 250, sm: 400 },
        height: { xs: 250, sm: 400 },
        backgroundColor: '#E0E0E0',
        borderColor: '#B0BEC5',
      },
      promptArea: {
        label: 'Prompt space',
        placeholder: 'Enter your prompt here...',
        backgroundColor: '#F5F5F5',
        textColor: '#333',
        rows: 4,
      },
      generateButton: {
        text: 'Generate',
        backgroundColor: '#607D8B',
        hoverColor: '#455A64',
        textColor: '#fff',
        padding: '10px 20px',
      },
      modifiedHeading: 'Modify Generated Image',
      regionInputs: {
        labelPrefix: 'Modification',
        inputLabel: 'Describe modification for region',
        backgroundColor: '#F5F5F5',
        textColor: '#333',
      },
      rewritePrompt: {
        label: 'Prompt space',
        placeholder: 'Enter new prompt here...',
        backgroundColor: '#F5F5F5',
        textColor: '#333',
        rows: 4,
      },
      submitButton: {
        text: 'Generate',
        backgroundColor: '#607D8B',
        hoverColor: '#455A64',
        textColor: '#fff',
        padding: '10px 20px',
      },
      dropdown: {
        menuIconColor: '#fff',
        options: [
          { label: 'New Picture Generation', id: 1 },
          { label: 'Last Picture Generation', id: 2 },
        ],
        backgroundColor: '#424242',
        textColor: '#fff',
      },
    },
  },
};