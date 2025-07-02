from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Sample data
sample_data = {
    "title": "Welcome to Our App",
    "description": "This is a simple landing page with a Flask backend",
    "features": [
        "Modern React Frontend",
        "Flask Backend API",
        "Beautiful Styling",
        "Responsive Design"
    ],
    "stats": {
        "users": 1250,
        "projects": 89,
        "downloads": 45000
    }
}

@app.route('/')
def home():
    return jsonify({"message": "Flask backend is running!"})

@app.route('/api/data')
def get_data():
    return jsonify(sample_data)

@app.route('/api/users')
def get_users():
    users = [
        {"id": 1, "name": "Mirakbar Mirolimov", "role": "Founder"},
    ]
    return jsonify(users)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
