# 🎨 Gemini Image Editor - Vanilla JavaScript

A powerful, client-side image editing application that uses Google's Gemini 2.5 Flash API to transform images with AI-powered modifications. Built entirely with Vanilla JavaScript, HTML, and CSS.

## ✨ Features

- **Drag & Drop Interface**: Intuitive file upload with visual feedback
- **AI-Powered Editing**: Transform images using natural language prompts
- **Multiple Generations**: Create up to 4 variations of your edited image
- **YouTube Integration**: Add YouTube titles to your images
- **Style Options**: Choose from different text styles (3D Metallic, Balloon, Matrix)
- **Secure API Key Storage**: API keys stored locally in your browser
- **Download Functionality**: Download individual images or all at once
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **No Backend Required**: Runs entirely in your browser

## 🚀 Quick Start

### 1. Get Your Gemini API Key

1. Visit [Google AI Studio](https://ai.google.dev/)
2. Sign in with your Google account
3. Navigate to the "API Keys" section
4. Create a new API key or use an existing one
5. Copy the API key (it should start with `AIza`)

### 2. Set Up the Application

1. Clone or download this repository
2. Open `index.html` in any modern web browser
3. Enter your Gemini API key when prompted
4. Start editing images!

### 3. Using the Application

1. **Configure API Key**: Enter your Gemini API key in the configuration section
2. **Upload Image**: Drag and drop an image or click to browse
3. **Enter Prompt**: Describe how you want to modify the image
4. **Optional Settings**:
   - Add a YouTube title to incorporate into the image
   - Choose a text style (3D Metallic, Balloon, Matrix)
   - Select number of images to generate (1-4)
5. **Generate**: Click "Edit Image" and wait for processing
6. **Download**: Save your edited images individually or all at once

## 📋 Requirements

- Modern web browser with JavaScript enabled
- Valid Gemini API key
- Internet connection for API calls

## 🔧 Configuration

### API Key Management

The application stores your API key securely in your browser's localStorage. The key is:
- Never sent to any server except Google's Gemini API
- Stored locally on your device only
- Can be updated or removed at any time

### Supported Image Formats

- JPEG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)
- GIF (.gif)
- BMP (.bmp)

### File Size Limits

- Maximum file size: Depends on your browser's capabilities
- Recommended: Keep images under 10MB for optimal performance

## 🛠️ Technical Implementation

### Architecture

```
┌─────────────────┐
│   Frontend      │
│  (Vanilla JS)   │
├─────────────────┤
│   Gemini API    │
│  (REST Calls)   │
├─────────────────┤
│ Local Storage   │
│ (API Key Only)  │
└─────────────────┘
```

### Key Components

1. **GeminiImageEditor Class**: Main application controller
2. **Drag & Drop Handler**: File upload management
3. **API Integration**: Direct REST calls to Gemini API
4. **UI Management**: Dynamic interface updates
5. **Error Handling**: Comprehensive error management

### API Integration Details

The application uses the Gemini 2.5 Flash model via direct REST API calls:

```javascript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  }
);
```

## 🔒 Security & Privacy

### Data Security
- **API Keys**: Stored locally, never transmitted except to Google
- **Images**: Processed locally, only sent to Gemini API for editing
- **No Server**: All processing happens in your browser

### Privacy Features
- No user tracking or analytics
- No data collection beyond what's necessary for functionality
- Images are not stored permanently anywhere

### Best Practices
- Keep your API key secure and don't share it
- Monitor your API usage in Google Cloud Console
- Regularly rotate your API keys for security

## 🎯 Example Use Cases

### Creative Editing
```
Prompt: "Add a magical fairy tale forest background with glowing fireflies"
Style: "3D Metallic"
```

### Content Creation
```
Prompt: "Add the YouTube title as elegant text overlay"
YouTube Title: "Amazing Nature Photography Tips"
Style: "Balloon"
```

### Object Modification
```
Prompt: "Change the car color to bright red and add racing stripes"
Style: "Matrix"
```

## 🐛 Troubleshooting

### Common Issues

**API Key Invalid**
- Ensure your API key starts with "AIza"
- Check that the key is correctly copied (no extra spaces)
- Verify the key is active in Google AI Studio

**Image Upload Issues**
- Check that the file is a valid image format
- Try reducing image file size if it's very large
- Ensure your browser supports file drag & drop

**Generation Fails**
- Check your internet connection
- Verify you haven't exceeded API rate limits
- Try with a simpler prompt

### Error Messages

| Error | Solution |
|-------|----------|
| "Invalid API key format" | Ensure key starts with "AIza" |
| "Failed to edit image" | Check internet connection and API quotas |
| "Please drop an image file" | Only image files are supported |

## 📚 API Reference

### Gemini API Endpoints Used

- **Model**: `gemini-2.0-flash-exp`
- **Endpoint**: `generateContent`
- **Method**: POST

### Request Format

```json
{
  "contents": [{
    "parts": [
      { "text": "Your editing prompt" },
      {
        "inline_data": {
          "mime_type": "image/jpeg",
          "data": "base64_encoded_image"
        }
      }
    ]
  }],
  "generationConfig": {
    "temperature": 0.8,
    "topK": 40,
    "topP": 0.95,
    "maxOutputTokens": 1024
  }
}
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for:

- Bug fixes
- Feature enhancements
- Documentation improvements
- Performance optimizations

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Google AI for the powerful Gemini API
- The open-source community for inspiration and tools
- All contributors and users of this application

## 🔮 Future Enhancements

- [ ] Support for more image editing operations
- [ ] Batch processing capabilities
- [ ] Advanced style customization options
- [ ] Integration with cloud storage services
- [ ] Undo/redo functionality
- [ ] Real-time preview capabilities

---

**Note**: This is a demonstration application. For production use, consider implementing additional security measures, error handling, and rate limiting.

For questions or support, please open an issue in the repository.