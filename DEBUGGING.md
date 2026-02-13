# Quick Debugging Guide

## Check Browser Console

Open your browser's Developer Tools (F12) and look at the Console tab when you try to register.

You should see messages like:

- 🔵 Registration attempt with data: {...}
- 🔵 Sending POST to http://localhost:5000/api/auth/register
- Either ✅ Registration successful OR ❌ Registration error

## Common Issues & Solutions

### 1. "User already exists"

**Solution**: Use a different email address that hasn't been registered yet.

### 2. Network Error / CORS Error

**Check**:

- Is the backend running? (should see "Server running on port 5000")
- Is MongoDB running?

**Fix**: Restart both servers:

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### 3. "Cannot connect" / "ECONNREFUSED"

**Solution**: Backend server is not running. Start it with `npm run dev` in the backend folder.

### 4. MongoDB Connection Error

**Solution**: Make sure MongoDB is installed and running:

```bash
# Windows - check if MongoDB service is running
# Or start mongod manually
mongod
```

## Test Backend Directly

Run this in the backend folder to test if registration works:

```bash
node test-register.js
```

If you see "User already exists", the backend is working fine!

## Still Having Issues?

Share the exact error message from the browser console (the red text).
