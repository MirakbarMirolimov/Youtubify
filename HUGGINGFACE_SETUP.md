# 🤗 Hugging Face API Setup Guide

## Getting Your Free Hugging Face API Token

To use the AI image generation feature, you'll need a free Hugging Face API token:

### Step 1: Create a Hugging Face Account
1. Go to [https://huggingface.co/join](https://huggingface.co/join)
2. Sign up for a free account
3. Verify your email address

### Step 2: Get Your API Token
1. Go to [https://huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Click "New token"
3. Name it something like "YouTubify-Image-Gen"
4. Select "Read" permissions (sufficient for inference)
5. Click "Generate a token"
6. Copy the token (starts with `hf_`)

### Step 3: Configure the Backend
1. Open `backend/app.py`
2. Find line 178: `"Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"`
3. Replace `hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` with your actual token

### Alternative Free Services

The app includes fallback options if Hugging Face is unavailable:

1. **Pollinations AI** - Completely free, no API key needed
2. **Placeholder Service** - Generates styled placeholder images

### Image Generation Models Available

- **Stable Diffusion XL** (Primary): High-quality image generation
- **Pollinations AI** (Fallback): Free alternative service
- **Custom Placeholders** (Final fallback): Styled placeholder images

### Tips for Better Results

1. **Be Specific**: Include details about colors, style, mood
2. **Mention YouTube**: The prompt is automatically enhanced with "YouTube thumbnail style"
3. **Include Keywords**: Words like "vibrant", "professional", "eye-catching" help
4. **Consider Format**: Thumbnails are generated in 16:9 aspect ratio (1024x576)

### Example Prompts

- "Gaming setup with RGB lighting and neon colors"
- "Professional tech review with laptop and clean background" 
- "Cooking tutorial with delicious food and bright kitchen"
- "Fitness workout with energetic person exercising"

### Rate Limits

- **Hugging Face Free Tier**: ~1000 requests/month
- **Pollinations AI**: No strict limits
- **Fallback**: Unlimited placeholders

### Troubleshooting

**Error: "Model is loading"**
- The Hugging Face model needs time to "warm up"
- Wait 30-60 seconds and try again
- The app will automatically use fallback services

**Error: "API rate limit exceeded"**
- You've reached your monthly quota
- The app will automatically switch to fallback services
- Consider upgrading to Hugging Face Pro for higher limits

**Error: "Request timed out"**
- Network or server issues
- The app will retry with fallback services
- Check your internet connection

### Cost Information

- **Hugging Face Inference API**: Free tier with monthly limits
- **Pollinations AI**: Completely free
- **All Fallbacks**: Free

Your app is designed to always work, even if primary services are down!
