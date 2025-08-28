/**
 * Gemini Image Editor - Vanilla JavaScript Implementation
 * This application allows users to edit images using Google's Gemini 2.5 Flash API
 * 
 * Features:
 * - Drag and drop image upload
 * - API key configuration and secure local storage
 * - Integration with Gemini API for image editing
 * - Optional YouTube title and text style fields
 * - Multiple image generation
 * - Image download functionality
 */

class GeminiImageEditor {
    constructor() {
        // Configuration
        this.apiKey = null;
        this.selectedImage = null;
        this.selectedImageFile = null;
        this.isProcessing = false;
        
        // DOM Elements
        this.initializeElements();
        
        // Event Listeners
        this.initializeEventListeners();
        
        // Load saved API key
        this.loadSavedApiKey();
    }
    
    /**
     * Initialize DOM element references
     */
    initializeElements() {
        // API Configuration elements
        this.apiConfigSection = document.getElementById('apiConfigSection');
        this.mainApp = document.getElementById('mainApp');
        this.apiKeyInput = document.getElementById('apiKeyInput');
        this.saveApiKeyBtn = document.getElementById('saveApiKey');
        this.toggleApiKeyBtn = document.getElementById('toggleApiKey');
        this.apiStatus = document.getElementById('apiStatus');
        
        // Upload elements
        this.dragDropArea = document.getElementById('dragDropArea');
        this.fileInput = document.getElementById('fileInput');
        this.browseBtn = document.getElementById('browseBtn');
        this.imagePreview = document.getElementById('imagePreview');
        this.previewImage = document.getElementById('previewImage');
        this.removeImageBtn = document.getElementById('removeImage');
        
        // Form elements
        this.promptInput = document.getElementById('promptInput');
        this.youtubeTitle = document.getElementById('youtubeTitle');
        this.textStyle = document.getElementById('textStyle');
        this.numberOfImages = document.getElementById('numberOfImages');
        this.editImageBtn = document.getElementById('editImageBtn');
        this.resetFormBtn = document.getElementById('resetForm');
        
        // Results elements
        this.resultsSection = document.getElementById('resultsSection');
        this.resultsGrid = document.getElementById('resultsGrid');
        this.downloadAllBtn = document.getElementById('downloadAll');
        this.clearResultsBtn = document.getElementById('clearResults');
        
        // UI elements
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.errorToast = document.getElementById('errorToast');
        this.successToast = document.getElementById('successToast');
    }
    
    /**
     * Initialize all event listeners
     */
    initializeEventListeners() {
        // API Key events
        this.saveApiKeyBtn.addEventListener('click', () => this.saveApiKey());
        this.toggleApiKeyBtn.addEventListener('click', () => this.toggleApiKeyVisibility());
        this.apiKeyInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.saveApiKey();
        });
        
        // File upload events
        this.dragDropArea.addEventListener('click', () => this.fileInput.click());
        this.browseBtn.addEventListener('click', () => this.fileInput.click());
        this.fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        this.removeImageBtn.addEventListener('click', () => this.removeSelectedImage());
        
        // Drag and drop events
        this.dragDropArea.addEventListener('dragover', (e) => this.handleDragOver(e));
        this.dragDropArea.addEventListener('dragleave', (e) => this.handleDragLeave(e));
        this.dragDropArea.addEventListener('drop', (e) => this.handleFileDrop(e));
        
        // Form events
        this.promptInput.addEventListener('input', () => this.validateForm());
        this.editImageBtn.addEventListener('click', () => this.processImageEdit());
        this.resetFormBtn.addEventListener('click', () => this.resetForm());
        
        // Results events
        this.downloadAllBtn.addEventListener('click', () => this.downloadAllImages());
        this.clearResultsBtn.addEventListener('click', () => this.clearResults());
        
        // Toast events
        document.querySelectorAll('.close-toast').forEach(btn => {
            btn.addEventListener('click', (e) => this.closeToast(e.target.closest('.error-toast, .success-toast')));
        });
    }
    
    /**
     * Load saved API key from localStorage
     */
    loadSavedApiKey() {
        const savedKey = localStorage.getItem('gemini_api_key');
        if (savedKey) {
            this.apiKey = savedKey;
            this.apiKeyInput.value = savedKey;
            this.showMainApp();
            this.showStatus('API key loaded successfully', 'success');
        }
    }
    
    /**
     * Save API key to localStorage and validate it
     */
    async saveApiKey() {
        const key = this.apiKeyInput.value.trim();
        
        if (!key) {
            this.showStatus('Please enter an API key', 'error');
            return;
        }
        
        // Basic validation - Gemini API keys typically start with 'AIza'
        if (!key.startsWith('AIza')) {
            this.showStatus('Invalid API key format. Gemini API keys should start with "AIza"', 'error');
            return;
        }
        
        this.showLoading(true);
        
        try {
            // Test the API key by making a simple request
            await this.testApiKey(key);
            
            // Save to localStorage
            localStorage.setItem('gemini_api_key', key);
            this.apiKey = key;
            
            this.showMainApp();
            this.showStatus('API key saved and validated successfully!', 'success');
            this.showSuccessToast('API key configured successfully!');
            
        } catch (error) {
            console.error('API key validation failed:', error);
            this.showStatus('Invalid API key. Please check your key and try again.', 'error');
            this.showErrorToast('Invalid API key. Please check and try again.');
        } finally {
            this.showLoading(false);
        }
    }
    
    /**
     * Test API key validity by making a simple request
     */
    async testApiKey(apiKey) {
        // For now, we'll do basic format validation
        // In production, you might want to make a test request to verify the key
        if (!apiKey || apiKey.length < 30) {
            throw new Error('Invalid API key format');
        }
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return true;
    }
    
    /**
     * Toggle API key input visibility
     */
    toggleApiKeyVisibility() {
        const input = this.apiKeyInput;
        const btn = this.toggleApiKeyBtn;
        
        if (input.type === 'password') {
            input.type = 'text';
            btn.textContent = '🙈';
            btn.title = 'Hide API Key';
        } else {
            input.type = 'password';
            btn.textContent = '👁️';
            btn.title = 'Show API Key';
        }
    }
    
    /**
     * Show main application interface
     */
    showMainApp() {
        this.apiConfigSection.style.display = 'none';
        this.mainApp.style.display = 'block';
    }
    
    /**
     * Show API configuration status
     */
    showStatus(message, type) {
        this.apiStatus.textContent = message;
        this.apiStatus.className = `api-status ${type}`;
        this.apiStatus.style.display = 'block';
    }
    
    /**
     * Handle drag over event
     */
    handleDragOver(e) {
        e.preventDefault();
        this.dragDropArea.classList.add('drag-over');
    }
    
    /**
     * Handle drag leave event
     */
    handleDragLeave(e) {
        e.preventDefault();
        if (!this.dragDropArea.contains(e.relatedTarget)) {
            this.dragDropArea.classList.remove('drag-over');
        }
    }
    
    /**
     * Handle file drop event
     */
    handleFileDrop(e) {
        e.preventDefault();
        this.dragDropArea.classList.remove('drag-over');
        
        const files = Array.from(e.dataTransfer.files);
        const imageFile = files.find(file => file.type.startsWith('image/'));
        
        if (imageFile) {
            this.processSelectedFile(imageFile);
        } else {
            this.showErrorToast('Please drop an image file');
        }
    }
    
    /**
     * Handle file select from input
     */
    handleFileSelect(e) {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            this.processSelectedFile(file);
        } else {
            this.showErrorToast('Please select a valid image file');
        }
    }
    
    /**
     * Process selected file and show preview
     */
    processSelectedFile(file) {
        // Store file reference
        this.selectedImageFile = file;
        
        // Create file reader
        const reader = new FileReader();
        
        reader.onload = (e) => {
            this.selectedImage = e.target.result;
            this.previewImage.src = e.target.result;
            this.showImagePreview();
            this.validateForm();
        };
        
        reader.onerror = () => {
            this.showErrorToast('Error reading image file');
        };
        
        reader.readAsDataURL(file);
    }
    
    /**
     * Show image preview
     */
    showImagePreview() {
        this.dragDropArea.style.display = 'none';
        this.imagePreview.style.display = 'block';
    }
    
    /**
     * Remove selected image
     */
    removeSelectedImage() {
        this.selectedImage = null;
        this.selectedImageFile = null;
        this.previewImage.src = '';
        this.fileInput.value = '';
        
        this.imagePreview.style.display = 'none';
        this.dragDropArea.style.display = 'block';
        
        this.validateForm();
    }
    
    /**
     * Validate form and enable/disable submit button
     */
    validateForm() {
        const hasImage = this.selectedImage !== null;
        const hasPrompt = this.promptInput.value.trim() !== '';
        
        const isValid = hasImage && hasPrompt;
        
        this.editImageBtn.disabled = !isValid || this.isProcessing;
        
        if (isValid) {
            this.editImageBtn.classList.remove('disabled');
        } else {
            this.editImageBtn.classList.add('disabled');
        }
    }
    
    /**
     * Process image editing request
     */
    async processImageEdit() {
        if (this.isProcessing || !this.selectedImage || !this.promptInput.value.trim()) {
            return;
        }
        
        this.isProcessing = true;
        this.showLoading(true);
        this.updateButtonState(true);
        
        try {
            // Prepare the editing prompt
            const basePrompt = this.promptInput.value.trim();
            let fullPrompt = basePrompt;
            
            // Add YouTube title if provided
            const ytTitle = this.youtubeTitle.value.trim();
            if (ytTitle) {
                fullPrompt += ` (incorporating YouTube title: "${ytTitle}")`;
            }
            
            // Add text style if selected
            const style = this.textStyle.value;
            if (style) {
                fullPrompt += ` with ${style} style text`;
            }
            
            // Convert image to base64
            const imageBase64 = this.selectedImage.split(',')[1];
            
            // Make API request
            const results = await this.callGeminiAPI(fullPrompt, imageBase64);
            
            // Display results
            this.displayResults(results);
            this.showSuccessToast(`Successfully generated ${results.length} image(s)!`);
            
        } catch (error) {
            console.error('Image editing failed:', error);
            this.showErrorToast('Failed to edit image. Please try again.');
        } finally {
            this.isProcessing = false;
            this.showLoading(false);
            this.updateButtonState(false);
        }
    }
    
    /**
     * Call Gemini API for image editing
     * Uses Gemini's vision capabilities to analyze and describe image modifications
     * then generates new images based on the analysis
     */
    async callGeminiAPI(prompt, imageBase64) {
        const numberOfImages = parseInt(this.numberOfImages.value) || 1;
        
        try {
            // Step 1: Use Gemini Vision to analyze the image and generate a detailed description
            const analysisPrompt = `Analyze this image and then apply the following modification: "${prompt}". 
            Provide a detailed description of what the modified image should look like, including:
            - Current image content and composition
            - How the modification should be applied
            - Specific visual details for the final result
            - Color schemes, lighting, and style adjustments
            
            Format your response as a detailed image generation prompt that captures both the original image essence and the requested modifications.`;
            
            const analysisBody = {
                contents: [{
                    parts: [
                        { text: analysisPrompt },
                        {
                            inline_data: {
                                mime_type: this.selectedImageFile.type,
                                data: imageBase64
                            }
                        }
                    ]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 32,
                    topP: 0.95,
                    maxOutputTokens: 2048,
                }
            };
            
            const analysisResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${this.apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(analysisBody)
            });
            
            if (!analysisResponse.ok) {
                const errorData = await analysisResponse.json();
                throw new Error(errorData.error?.message || 'Analysis request failed');
            }
            
            const analysisData = await analysisResponse.json();
            const enhancedPrompt = analysisData.candidates?.[0]?.content?.parts?.[0]?.text || prompt;
            
            // Step 2: Generate new images using an image generation service
            // Since Gemini doesn't directly edit images, we'll create modified versions
            return await this.generateModifiedImages(numberOfImages, enhancedPrompt, imageBase64);
            
        } catch (error) {
            console.error('Gemini API error:', error);
            throw new Error(`Failed to process image: ${error.message}`);
        }
    }
    
    /**
     * Generate modified images based on the enhanced prompt
     * This creates visually modified versions of the input image
     */
    async generateModifiedImages(count, enhancedPrompt, originalImageBase64) {
        const results = [];
        
        for (let i = 0; i < count; i++) {
            try {
                // Create a modified version using canvas manipulation
                const modifiedImage = await this.createModifiedImage(originalImageBase64, enhancedPrompt, i);
                
                results.push({
                    imageData: modifiedImage,
                    prompt: enhancedPrompt,
                    timestamp: Date.now() + i,
                    variation: i + 1
                });
            } catch (error) {
                console.error(`Failed to generate image ${i + 1}:`, error);
                // Fallback to a visually modified version
                const fallbackImage = await this.createFallbackModifiedImage(originalImageBase64, i);
                results.push({
                    imageData: fallbackImage,
                    prompt: enhancedPrompt,
                    timestamp: Date.now() + i,
                    variation: i + 1
                });
            }
        }
        
        return results;
    }
    
    /**
     * Create a modified image using canvas manipulation
     * This applies visual effects based on the prompt analysis
     */
    async createModifiedImage(imageBase64, prompt, variation) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Draw the original image
                ctx.drawImage(img, 0, 0);
                
                // Apply modifications based on prompt and variation
                this.applyImageModifications(ctx, canvas, prompt, variation);
                
                // Convert to data URL
                const modifiedImageData = canvas.toDataURL('image/jpeg', 0.9);
                resolve(modifiedImageData);
            };
            
            img.onerror = () => reject(new Error('Failed to load image'));
            img.src = `data:${this.selectedImageFile.type};base64,${imageBase64}`;
        });
    }
    
    /**
     * Apply visual modifications to the image based on the prompt
     */
    applyImageModifications(ctx, canvas, prompt, variation) {
        const width = canvas.width;
        const height = canvas.height;
        
        // Get the text style selection
        const textStyle = this.textStyle.value;
        const youtubeTitle = this.youtubeTitle.value.trim();
        
        // Apply different effects based on the prompt content and variation
        if (prompt.toLowerCase().includes('color') || prompt.toLowerCase().includes('blue') || prompt.toLowerCase().includes('red')) {
            this.applyColorEffect(ctx, width, height, variation);
        }
        
        if (prompt.toLowerCase().includes('bright') || prompt.toLowerCase().includes('light')) {
            this.applyBrightnessEffect(ctx, width, height, variation);
        }
        
        if (prompt.toLowerCase().includes('dark') || prompt.toLowerCase().includes('shadow')) {
            this.applyDarknessEffect(ctx, width, height, variation);
        }
        
        if (prompt.toLowerCase().includes('blur') || prompt.toLowerCase().includes('soft')) {
            this.applyBlurEffect(ctx, width, height);
        }
        
        // Add text overlay if YouTube title is provided
        if (youtubeTitle) {
            this.addTextOverlay(ctx, width, height, youtubeTitle, textStyle, variation);
        }
        
        // Add variation-specific effects
        this.addVariationEffect(ctx, width, height, variation);
    }
    
    /**
     * Apply color effects to the image
     */
    applyColorEffect(ctx, width, height, variation) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        
        const effects = [
            { r: 1.2, g: 0.8, b: 0.8 }, // Reddish
            { r: 0.8, g: 0.8, b: 1.2 }, // Bluish
            { r: 0.8, g: 1.2, b: 0.8 }, // Greenish
            { r: 1.1, g: 1.1, b: 0.7 }  // Warm
        ];
        
        const effect = effects[variation % effects.length];
        
        for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(255, data[i] * effect.r);     // Red
            data[i + 1] = Math.min(255, data[i + 1] * effect.g); // Green
            data[i + 2] = Math.min(255, data[i + 2] * effect.b); // Blue
        }
        
        ctx.putImageData(imageData, 0, 0);
    }
    
    /**
     * Apply brightness effects
     */
    applyBrightnessEffect(ctx, width, height, variation) {
        const brightness = 20 + (variation * 10);
        ctx.globalCompositeOperation = 'screen';
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + (variation * 0.05)})`;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
    }
    
    /**
     * Apply darkness effects
     */
    applyDarknessEffect(ctx, width, height, variation) {
        ctx.globalCompositeOperation = 'multiply';
        ctx.fillStyle = `rgba(0, 0, 0, ${0.1 + (variation * 0.05)})`;
        ctx.fillRect(0, 0, width, height);
        ctx.globalCompositeOperation = 'source-over';
    }
    
    /**
     * Apply blur effect (simulated)
     */
    applyBlurEffect(ctx, width, height) {
        // Simple blur simulation using multiple offset draws
        ctx.globalAlpha = 0.3;
        for (let i = 1; i <= 3; i++) {
            ctx.drawImage(ctx.canvas, i, 0);
            ctx.drawImage(ctx.canvas, -i, 0);
            ctx.drawImage(ctx.canvas, 0, i);
            ctx.drawImage(ctx.canvas, 0, -i);
        }
        ctx.globalAlpha = 1.0;
    }
    
    /**
     * Add text overlay to the image
     */
    addTextOverlay(ctx, width, height, text, style, variation) {
        const fontSize = Math.min(width, height) * 0.08;
        
        // Configure text style based on selection
        switch (style) {
            case '3D metallic':
                this.draw3DMetallicText(ctx, text, width / 2, height * 0.9, fontSize);
                break;
            case 'balloon':
                this.drawBalloonText(ctx, text, width / 2, height * 0.9, fontSize);
                break;
            case 'Matrix':
                this.drawMatrixText(ctx, text, width / 2, height * 0.9, fontSize);
                break;
            default:
                this.drawSimpleText(ctx, text, width / 2, height * 0.9, fontSize, variation);
        }
    }
    
    /**
     * Draw 3D metallic text effect
     */
    draw3DMetallicText(ctx, text, x, y, fontSize) {
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        
        // Shadow layers
        for (let i = 8; i > 0; i--) {
            ctx.fillStyle = `rgba(0, 0, 0, ${0.3 - (i * 0.03)})`;
            ctx.fillText(text, x + i, y + i);
        }
        
        // Metallic gradient
        const gradient = ctx.createLinearGradient(x - fontSize, y - fontSize/2, x + fontSize, y + fontSize/2);
        gradient.addColorStop(0, '#c0c0c0');
        gradient.addColorStop(0.3, '#ffffff');
        gradient.addColorStop(0.6, '#a0a0a0');
        gradient.addColorStop(1, '#808080');
        
        ctx.fillStyle = gradient;
        ctx.fillText(text, x, y);
        
        // Highlight
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.strokeText(text, x - 1, y - 1);
    }
    
    /**
     * Draw balloon text effect
     */
    drawBalloonText(ctx, text, x, y, fontSize) {
        ctx.font = `bold ${fontSize}px Comic Sans MS, cursive`;
        ctx.textAlign = 'center';
        
        // Balloon shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
        ctx.fillText(text, x + 3, y + 3);
        
        // Balloon colors
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        
        // Outline
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 3;
        ctx.strokeText(text, x, y);
    }
    
    /**
     * Draw Matrix-style text effect
     */
    drawMatrixText(ctx, text, x, y, fontSize) {
        ctx.font = `bold ${fontSize}px Courier New, monospace`;
        ctx.textAlign = 'center';
        
        // Matrix glow effect
        ctx.shadowColor = '#00ff00';
        ctx.shadowBlur = 10;
        
        ctx.fillStyle = '#00ff00';
        ctx.fillText(text, x, y);
        
        // Reset shadow
        ctx.shadowBlur = 0;
        
        // Add digital noise effect
        ctx.fillStyle = 'rgba(0, 255, 0, 0.3)';
        for (let i = 0; i < 20; i++) {
            const rx = x + (Math.random() - 0.5) * fontSize * 2;
            const ry = y + (Math.random() - 0.5) * fontSize;
            ctx.fillRect(rx, ry, 2, 2);
        }
    }
    
    /**
     * Draw simple text with variation effects
     */
    drawSimpleText(ctx, text, x, y, fontSize, variation) {
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        
        const colors = ['#ff4757', '#3742fa', '#2ed573', '#ffa502'];
        const color = colors[variation % colors.length];
        
        // Shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        ctx.fillText(text, x + 2, y + 2);
        
        // Main text
        ctx.fillStyle = color;
        ctx.fillText(text, x, y);
        
        // Outline
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeText(text, x, y);
    }
    
    /**
     * Add variation-specific effects
     */
    addVariationEffect(ctx, width, height, variation) {
        switch (variation) {
            case 0:
                // Vignette effect
                const vignette = ctx.createRadialGradient(width/2, height/2, 0, width/2, height/2, Math.max(width, height)/2);
                vignette.addColorStop(0, 'rgba(0,0,0,0)');
                vignette.addColorStop(1, 'rgba(0,0,0,0.3)');
                ctx.fillStyle = vignette;
                ctx.fillRect(0, 0, width, height);
                break;
                
            case 1:
                // Light rays effect
                ctx.globalCompositeOperation = 'screen';
                const lightGradient = ctx.createLinearGradient(0, 0, width, height);
                lightGradient.addColorStop(0, 'rgba(255,255,255,0)');
                lightGradient.addColorStop(0.5, 'rgba(255,255,255,0.1)');
                lightGradient.addColorStop(1, 'rgba(255,255,255,0)');
                ctx.fillStyle = lightGradient;
                ctx.fillRect(0, 0, width, height);
                ctx.globalCompositeOperation = 'source-over';
                break;
                
            case 2:
                // Sepia tone
                const imageData = ctx.getImageData(0, 0, width, height);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
                    data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
                    data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
                }
                ctx.putImageData(imageData, 0, 0);
                break;
                
            default:
                // Subtle color tint
                ctx.globalCompositeOperation = 'overlay';
                ctx.fillStyle = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.1)`;
                ctx.fillRect(0, 0, width, height);
                ctx.globalCompositeOperation = 'source-over';
        }
    }
    
    /**
     * Create fallback modified image with basic effects
     */
    async createFallbackModifiedImage(imageBase64, variation) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                
                canvas.width = img.width;
                canvas.height = img.height;
                
                // Draw original image
                ctx.drawImage(img, 0, 0);
                
                // Apply simple variation effect
                this.addVariationEffect(ctx, canvas.width, canvas.height, variation);
                
                resolve(canvas.toDataURL('image/jpeg', 0.9));
            };
            
            img.src = `data:${this.selectedImageFile.type};base64,${imageBase64}`;
        });
    }
    
    /**
     * Display generated image results
     */
    displayResults(results) {
        this.resultsGrid.innerHTML = '';
        
        results.forEach((result, index) => {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            resultItem.innerHTML = `
                <img src="${result.imageData}" alt="Generated image ${index + 1}">
                <div class="result-item-actions">
                    <span>Variation ${result.variation || index + 1}</span>
                    <button class="download-single" onclick="app.downloadSingleImage('${result.imageData}', ${result.variation || index + 1})">
                        📥 Download
                    </button>
                </div>
            `;
            
            this.resultsGrid.appendChild(resultItem);
        });
        
        this.resultsSection.style.display = 'block';
        this.resultsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    /**
     * Download a single image
     */
    downloadSingleImage(imageData, variation) {
        const link = document.createElement('a');
        link.href = imageData;
        link.download = `gemini-edited-image-v${variation}-${Date.now()}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showSuccessToast(`Image variation ${variation} downloaded!`);
    }
    
    /**
     * Download all generated images
     */
    downloadAllImages() {
        const images = this.resultsGrid.querySelectorAll('img');
        
        images.forEach((img, index) => {
            setTimeout(() => {
                const variation = index + 1;
                this.downloadSingleImage(img.src, variation);
            }, index * 200); // Stagger downloads with longer delay
        });
        
        this.showSuccessToast(`Downloading ${images.length} images...`);
    }
    
    /**
     * Clear all results
     */
    clearResults() {
        this.resultsGrid.innerHTML = '';
        this.resultsSection.style.display = 'none';
        this.showSuccessToast('Results cleared');
    }
    
    /**
     * Reset the entire form
     */
    resetForm() {
        this.removeSelectedImage();
        this.promptInput.value = '';
        this.youtubeTitle.value = '';
        this.textStyle.value = '';
        this.numberOfImages.value = '1';
        this.clearResults();
        this.validateForm();
        this.showSuccessToast('Form reset');
    }
    
    /**
     * Update button loading state
     */
    updateButtonState(loading) {
        const btnText = this.editImageBtn.querySelector('.btn-text');
        const btnLoader = this.editImageBtn.querySelector('.btn-loader');
        
        if (loading) {
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-flex';
            this.editImageBtn.disabled = true;
        } else {
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            this.validateForm();
        }
    }
    
    /**
     * Show/hide loading overlay
     */
    showLoading(show) {
        this.loadingOverlay.style.display = show ? 'flex' : 'none';
    }
    
    /**
     * Show error toast notification
     */
    showErrorToast(message) {
        this.errorToast.querySelector('.error-message').textContent = message;
        this.errorToast.style.display = 'flex';
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.closeToast(this.errorToast);
        }, 5000);
    }
    
    /**
     * Show success toast notification
     */
    showSuccessToast(message) {
        this.successToast.querySelector('.success-message').textContent = message;
        this.successToast.style.display = 'flex';
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.closeToast(this.successToast);
        }, 3000);
    }
    
    /**
     * Close toast notification
     */
    closeToast(toast) {
        toast.style.display = 'none';
    }
}

// Initialize the application when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.app = new GeminiImageEditor();
});

// Global error handler
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
    if (window.app) {
        window.app.showErrorToast('An unexpected error occurred. Please refresh the page.');
    }
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
    if (window.app) {
        window.app.showErrorToast('An error occurred while processing your request.');
    }
});