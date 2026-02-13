# Project Documentation - MindFlow

This document provides detailed technical information about the MindFlow platform's architecture, API endpoints, and data models.

## 🏗️ Architecture Overview

MindFlow follows a standard MERN-like architecture with a decoupled frontend and backend.

- **Frontend:** Single Page Application (SPA) built with React.
- **Backend:** RESTful API built with Express/Node.js.
- **Database:** NoSQL MongoDB for flexibility with mood logs and journal entries.

## 🔑 Authentication Flow

1.  **JWT Based:** Users receive a JSON Web Token upon successful login/registration.
2.  **Middleware:** A custom `authToken` middleware protects private routes.
3.  **Encrypted Persistence:** Passwords are never stored in plain text (Bcrypt).

## 🗃️ Data Models

### User Model

- `username`: String (required)
- `email`: String (required, unique)
- `password`: String (hashed)
- `createdAt`: Date

### MoodLog Model

- `user`: ObjectId (linked to User)
- `score`: Number (1-5)
- `emotion`: String
- `note`: String
- `date`: Date

### JournalEntry Model

- `user`: ObjectId
- `content`: String (Encrypted)
- `tags`: Array of Strings
- `sentimentScore`: Number
- `date`: Date

## 📡 API Endpoints

### Auth Routes (`/api/auth`)

- `POST /register`: Create a new user.
- `POST /login`: Authenticate user and return token.
- `GET /user`: Return current user profile.

### Mood Routes (`/api/mood`)

- `GET /`: Get all mood logs for user.
- `POST /`: Log a new mood.
- `DELETE /:id`: Remove a mood entry.

### Journal Routes (`/api/journal`)

- `GET /`: Get all encrypted journal entries.
- `POST /`: Add new entry (content auto-encrypted).
- `DELETE /:id`: Remove an entry.

### AI & Coping

- `POST /api/ai/chat`: Interface with the wellness chatbot.
- `GET /api/coping`: Fetch the library of coping strategies.

## 🔐 Security Implementations

- **Journal Encryption:** Content is encrypted at the application layer before reaching the database using `crypto` module (AES-256-CBC).
- **Helmet.js:** Used in Express to set various HTTP headers for security.
- **CORS:** Restricted to trusted origins in the production environment.

## 🎤 Voice Recording Details

Uses the browser's `webkitSpeechRecognition` (or standard `SpeechRecognition`) to transcribe audio locally. Transcripts are then sent to the backend for encryption and storage.

---

_Document Version: 1.0.0 | Date: Feb 2026_
