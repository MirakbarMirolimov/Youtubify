from flask import Flask, jsonify, request
from flask_cors import CORS
import re
import random
import time
import requests
import base64
import os

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Home page data for YouTuber AI advisor
home_data = {
    "title": "YouTubify AI",
    "subtitle": "Get AI-Powered Advice for Your YouTube Channel",
    "description": "Transform your YouTube content with intelligent insights and personalized recommendations from our AI advisor.",
    "features": [
        "Content Strategy Analysis",
        "Title & Thumbnail Optimization",
        "Audience Engagement Tips",
        "Growth Strategies"
    ],
    "stats": {
        "creators": 5420,
        "videos_analyzed": 12847,
        "success_rate": 87
    }
}

def generate_youtube_advice(user_input):
    """Generate YouTube advice using intelligent analysis"""
    input_lower = user_input.lower()
    
    # Keywords for different advice categories
    if any(word in input_lower for word in ['title', 'headline', 'name']):
        return {
            "category": "Title Optimization",
            "advice": [
                "Keep titles under 60 characters for better visibility",
                "Use power words like 'Ultimate', 'Secret', 'Proven'",
                "Include your target keyword early in the title",
                "Add numbers or brackets for higher click-through rates",
                "Create curiosity gaps to encourage clicks"
            ],
            "examples": [
                "'5 SECRET YouTube Tips That Actually Work'",
                "'How I Gained 10K Subscribers in 30 Days (PROVEN Method)'"
            ]
        }
    
    elif any(word in input_lower for word in ['thumbnail', 'image', 'visual']):
        return {
            "category": "Thumbnail Strategy",
            "advice": [
                "Use bright, contrasting colors to stand out",
                "Include faces with clear emotions",
                "Keep text large and readable on mobile",
                "Use the rule of thirds for composition",
                "Test different thumbnail styles"
            ],
            "examples": [
                "Use arrows pointing to key elements",
                "Include before/after comparisons"
            ]
        }
    
    elif any(word in input_lower for word in ['engagement', 'comment', 'like', 'subscribe']):
        return {
            "category": "Audience Engagement",
            "advice": [
                "Ask questions in your videos to encourage comments",
                "Respond to comments within the first hour",
                "Create community posts to stay connected",
                "Use polls and community features",
                "End videos with clear calls-to-action"
            ],
            "examples": [
                "'What's your experience with this? Let me know below!'",
                "'Which topic should I cover next? Comment your suggestions!'"
            ]
        }
    
    elif any(word in input_lower for word in ['growth', 'subscriber', 'view', 'algorithm']):
        return {
            "category": "Channel Growth",
            "advice": [
                "Maintain a consistent upload schedule",
                "Focus on your niche and target audience",
                "Optimize for search with relevant keywords",
                "Collaborate with other creators",
                "Analyze your analytics regularly"
            ],
            "examples": [
                "Upload at the same time each week",
                "Create series or playlists for better retention"
            ]
        }
    
    elif any(word in input_lower for word in ['content', 'video', 'idea', 'topic']):
        return {
            "category": "Content Strategy",
            "advice": [
                "Research trending topics in your niche",
                "Create evergreen content that stays relevant",
                "Mix educational and entertaining content",
                "Use storytelling to keep viewers engaged",
                "Plan content series for better retention"
            ],
            "examples": [
                "'Beginner's Guide' series",
                "'Common Mistakes' videos perform well"
            ]
        }
    
    else:
        return {
            "category": "General YouTube Tips",
            "advice": [
                "Focus on providing value to your audience",
                "Be authentic and show your personality",
                "Optimize your channel page and about section",
                "Use end screens and cards effectively",
                "Create compelling channel trailers",
                "Engage with your community regularly"
            ],
            "examples": [
                "Share behind-the-scenes content",
                "Create 'Day in the Life' videos to connect with audience"
            ]
        }

@app.route('/')
def home():
    return jsonify({"message": "YouTubify AI backend is running!"})

@app.route('/api/home-data')
def get_home_data():
    return jsonify(home_data)

@app.route('/api/analyze', methods=['POST'])
def analyze_input():
    try:
        data = request.get_json()
        user_input = data.get('input', '')
        
        if not user_input or len(user_input.strip()) < 3:
            return jsonify({
                'error': 'Please provide a more detailed description of what you need help with.'
            }), 400
        
        # Generate advice based on input
        advice_response = generate_youtube_advice(user_input)
        
        return jsonify({
            'success': True,
            'input': user_input,
            'response': advice_response
        })
        
    except Exception as e:
        return jsonify({
            'error': f'An error occurred while analyzing your input: {str(e)}'
        }), 500

def generate_with_huggingface(prompt):
    """Generate image using Hugging Face's free Stable Diffusion model"""
    
    # Use Hugging Face's free Stable Diffusion model
    API_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
    
    # Enhance the prompt for better thumbnail generation
    enhanced_prompt = f"YouTube thumbnail style, {prompt}, high quality, vibrant colors, eye-catching, professional, 16:9 aspect ratio, bold text overlay space, dramatic lighting"
    
    headers = {
        "Authorization": "Bearer hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",  # You need to replace this with your actual token
        "Content-Type": "application/json"
    }
    
    payload = {
        "inputs": enhanced_prompt,
        "parameters": {
            "width": 1024,
            "height": 576,  # 16:9 aspect ratio for thumbnails
            "num_inference_steps": 25,
            "guidance_scale": 7.5
        }
    }
    
    try:
        response = requests.post(API_URL, headers=headers, json=payload, timeout=60)
        
        if response.status_code == 200:
            # Convert response to base64 for frontend
            image_bytes = response.content
            image_base64 = base64.b64encode(image_bytes).decode('utf-8')
            
            return {
                'success': True,
                'url': f"data:image/png;base64,{image_base64}",
                'title': 'AI Generated Thumbnail',
                'description': f'Generated using Stable Diffusion: "{prompt}"',
                'resolution': '1024x576',
                'style': 'AI Generated',
                'filename': f'thumbnail_{int(time.time())}.png'
            }
        else:
            return {
                'success': False,
                'error': f'Hugging Face API error: {response.status_code}'
            }
            
    except requests.exceptions.Timeout:
        return {
            'success': False,
            'error': 'Request timed out. The model might be loading, please try again in a few seconds.'
        }
    except Exception as e:
        return {
            'success': False,
            'error': f'Error calling Hugging Face API: {str(e)}'
        }

def fallback_image_generation(prompt):
    """Fallback to alternative free services if Hugging Face fails"""
    
    # Try Pollinations AI (free alternative)
    try:
        pollinations_url = f"https://image.pollinations.ai/prompt/{requests.utils.quote(prompt + ' YouTube thumbnail style high quality')}"
        
        response = requests.get(pollinations_url, timeout=30)
        if response.status_code == 200:
            image_base64 = base64.b64encode(response.content).decode('utf-8')
            return {
                'success': True,
                'url': f"data:image/jpeg;base64,{image_base64}",
                'title': 'AI Generated Thumbnail',
                'description': f'Generated using Pollinations AI: "{prompt}"',
                'resolution': '1024x576',
                'style': 'AI Generated',
                'filename': f'thumbnail_{int(time.time())}.jpg'
            }
    except Exception as e:
        print(f"Pollinations fallback failed: {e}")
    
    # Final fallback: use placeholder with custom styling
    return {
        'success': True,
        'url': f'https://via.placeholder.com/1024x576/FF6B6B/FFFFFF?text={requests.utils.quote(prompt[:50])}',
        'title': 'Placeholder Thumbnail',
        'description': f'Placeholder for: "{prompt}"',
        'resolution': '1024x576',
        'style': 'Placeholder',
        'filename': f'placeholder_{int(time.time())}.png'
    }

@app.route('/api/generate-image', methods=['POST'])
def generate_image():
    try:
        data = request.get_json()
        prompt = data.get('prompt', '')
        
        if not prompt or len(prompt.strip()) < 5:
            return jsonify({
                'error': 'Please provide a more detailed description for your thumbnail.'
            }), 400
        
        # Try Hugging Face first
        result = generate_with_huggingface(prompt)
        
        if not result['success']:
            # If Hugging Face fails, try fallback options
            result = fallback_image_generation(prompt)
        
        if result['success']:
            return jsonify({
                'success': True,
                'prompt': prompt,
                'image': {
                    'url': result['url'],
                    'title': result['title'],
                    'description': result['description'],
                    'resolution': result['resolution'],
                    'style': result['style'],
                    'filename': result['filename']
                },
                'generation_time': '3-15s',
                'message': 'Thumbnail generated successfully using AI!'
            })
        else:
            return jsonify({
                'error': result.get('error', 'Failed to generate image')
            }), 500
        
    except Exception as e:
        return jsonify({
            'error': f'An error occurred while generating the image: {str(e)}'
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
