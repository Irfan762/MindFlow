# Mental Wellness Platform

A full-stack AI-powered Mental Wellness Platform with React (Frontend) and Node.js + MongoDB (Backend).

## Features

- **User Authentication**: JWT-based secure authentication
- **Mood Tracking**: Log daily moods with emoji selector and visualize trends
- **Secure Journaling**: End-to-end encrypted journal entries
- **AI Chatbot**: Supportive AI conversations for mental wellness
- **Coping Strategies**: Library of breathing exercises and mindfulness tools
- **Sentiment Analysis**: AI-powered analysis of journal entries

## Tech Stack

### Frontend

- React.js with Vite
- Tailwind CSS v4
- React Router
- Axios
- Recharts (for mood visualization)
- Framer Motion (for animations)
- Lucide React (for icons)

### Backend

- Node.js with Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- Sentiment analysis library
- AES-256 encryption for journal entries

## Prerequisites

- Node.js v18+ (v20+ recommended)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

### 1. Clone the repository

```bash
cd helathIntel
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://localhost:27017/mental_wellness
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
ENCRYPTION_KEY=your_encryption_key_change_this
```

**Important**: Make sure MongoDB is running on your system!

### 3. Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application

### Start MongoDB (if running locally)

```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
```

### Start Backend Server

```bash
cd backend
npm run dev
```

Backend will run on `http://localhost:5000`

### Start Frontend Development Server

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## Usage

1. **Register**: Create a new account at `/register`
2. **Login**: Sign in at `/login`
3. **Dashboard**: View your wellness overview
4. **Mood Tracker**: Log your daily moods and see trends
5. **Journal**: Write encrypted journal entries
6. **AI Chat**: Talk to the AI wellness companion
7. **Coping Toolkit**: Access breathing exercises and strategies

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Mood Tracking

- `POST /api/mood` - Log mood (protected)
- `GET /api/mood` - Get user's mood logs (protected)
- `DELETE /api/mood/:id` - Delete mood log (protected)

### Journaling

- `POST /api/journal` - Create journal entry (protected)
- `GET /api/journal` - Get user's journal entries (protected)
- `DELETE /api/journal/:id` - Delete journal entry (protected)

### AI Features

- `POST /api/ai/chat` - Chat with AI (protected)
- `POST /api/ai/analyze` - Analyze sentiment (protected)

### Coping Strategies

- `GET /api/coping` - Get all strategies (protected)
- `POST /api/coping` - Create user strategy (protected)
- `DELETE /api/coping/:id` - Delete user strategy (protected)
- `POST /api/coping/seed` - Seed default strategies (public)

## Troubleshooting

### "User already exists" error

- This means you're trying to register with an email that's already in the database
- Try using a different email address
- Or delete the existing user from MongoDB

### Cannot connect to backend

- Make sure the backend server is running on port 5000
- Check that MongoDB is running
- Verify the `MONGO_URI` in your `.env` file

### Frontend shows blank page

- Check browser console for errors
- Ensure all dependencies are installed (`npm install`)
- Try clearing browser cache and reloading

### CORS errors

- Backend already has CORS enabled
- Make sure backend is running on port 5000 and frontend on 5173

## Security Features

- Passwords hashed with bcrypt
- JWT tokens for authentication
- Journal entries encrypted with AES-256
- Helmet.js for security headers
- Input validation on all endpoints

## Project Structure

```
helathIntel/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Auth middleware
│   │   ├── services/        # AI services
│   │   └── utils/           # Encryption utilities
│   ├── server.js            # Entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── layouts/         # Layout components
    │   ├── context/         # React Context (Auth)
    │   └── utils/           # Helper functions
    ├── index.html
    └── package.json
```

## License

MIT

## Support

For issues or questions, please open an issue on GitHub.
