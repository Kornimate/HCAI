// src/config.js
export const config = {
  branding: {
    // Logo Placeholder
    logoPlaceholder: {
      text: 'P', // Text to display in the circular placeholder
      size: 40, // Size of the placeholder (in pixels)
      backgroundColor: '#fff', // Background color of the placeholder
      textColor: '#000', // Color of the placeholder text
    },
    // Heading Placeholder
    headingPlaceholder: {
      text: 'Pixcasso: AI Art, Human Control.', // Placeholder text for the heading
      variant: 'h4', // Material-UI typography variant
      color: '#455A64', // Color of the heading
      fontWeight: 'bold', // Font weight
    },
    // Main Image Placeholder
    imagePlaceholder: {
      width: { xs: 200, sm: 300 }, // Responsive width
      height: { xs: 200, sm: 300 }, // Responsive height
      backgroundColor: '#E0E0E0', // Background color
      borderColor: '#B0BEC5', // Border color
      iconSize: { xs: 60, sm: 100 }, // Size of the icon
      iconColor: '#B0BEC5', // Color of the icon
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
  },
};