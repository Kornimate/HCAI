// src/config.js
export const config = {
    branding: {
      // Existing front page config (unchanged)
      logoPlaceholder: {
        text: 'P',
        size: 40,
        backgroundColor: '#fff',
        textColor: '#000',
      },
      headingPlaceholder: {
        text: 'Lorem ipsum dolor',
        variant: 'h4',
        color: '#455A64',
        fontWeight: 'bold',
      },
      imagePlaceholder: {
        width: { xs: 200, sm: 300 },
        height: { xs: 200, sm: 300 },
        backgroundColor: '#E0E0E0',
        borderColor: '#B0BEC5',
        iconSize: { xs: 60, sm: 100 },
        iconColor: '#B0BEC5',
      },
      button: {
        text: 'Get Started',
        backgroundColor: '#455A64',
        hoverColor: '#37474F',
        textColor: '#fff',
        padding: '10px 20px',
      },
      descriptionPlaceholder: {
        text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        <br /><br />
        Ready to create stunning images? Get started today!`,
        color: '#78909C',
        maxWidth: 700,
      },
      header: {
        backgroundColor: '#2E3B55',
      },
  
      // Main page config
      mainPage: {
        initialHeading: 'AI Model Introduction',
        generatedImage: {
          width: { xs: 300, sm: 500 },
          height: { xs: 300, sm: 500 },
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
            { label: 'New Pic Generation', placeholder: 'New Pic Placeholder' },
            { label: 'Last Generation', placeholder: 'Last Gen Placeholder' },
          ],
          backgroundColor: '#424242',
          textColor: '#fff',
        },
      },
    },
  };