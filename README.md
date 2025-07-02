# React + Flask Project


A beautiful, modern landing page built with React frontend and Flask backend.

## Features

- 🎨 Modern, responsive design with cool animations
- 🚀 React frontend with hooks and API integration
- 🐍 Flask backend with RESTful APIs
- 📱 Mobile-friendly responsive layout
- ✨ Smooth animations and hover effects
- 🎯 Clean, professional styling

## Project Structure

```
youtubify/
├── app.py              # Flask backend
├── requirements.txt    # Python dependencies
├── frontend/           # React application
│   ├── src/
│   │   ├── App.js     # Main React component
│   │   └── App.css    # Styling
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Python 3.7+
- Node.js 14+
- npm or yarn

### Backend Setup (Flask)

1. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the Flask server:
   ```bash
   python app.py
   ```

   The backend will be available at `http://localhost:5000`

### Frontend Setup (React)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## API Endpoints

- `GET /` - Health check
- `GET /api/data` - Get landing page data (title, description, features, stats)
- `GET /api/users` - Get team members data

## Features Showcase

- **Hero Section**: Eye-catching gradient background with floating animations
- **Stats Section**: Dynamic statistics fetched from the backend
- **Features Grid**: Responsive card layout with hover effects
- **Team Section**: Team member profiles with avatar circles
- **Loading State**: Beautiful loading spinner while fetching data
- **Responsive Design**: Optimized for desktop, tablet, and mobile

## Customization

To customize the content:

1. **Backend Data**: Edit the `sample_data` dictionary in `app.py`
2. **Styling**: Modify `frontend/src/App.css` for custom colors and animations
3. **Components**: Update `frontend/src/App.js` for layout changes

## Technologies Used

- **Frontend**: React, CSS3, JavaScript ES6+
- **Backend**: Flask, Python
- **Styling**: CSS Grid, Flexbox, Animations, Gradients
- **HTTP Client**: Fetch API

## Development Notes

- The Flask backend runs on port 5000
- React development server runs on port 3000
- CORS is enabled for cross-origin requests
- The app uses modern CSS features like Grid and Flexbox
- Animations are optimized for performance

Enjoy your beautiful new landing page! ✨
