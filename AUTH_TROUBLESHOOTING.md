# Authentication Troubleshooting Guide

## ✅ Backend Status: WORKING PERFECTLY

I've tested both endpoints and they work correctly:

- ✅ Registration endpoint: Working
- ✅ Login endpoint: Working
- ✅ MongoDB: Connected

## The Problem

The backend is fine. The issue is likely one of these:

### 1. Using Wrong Credentials

- **For Login**: You must use an email/password that was already registered
- **For Registration**: You must use a NEW email that hasn't been used before

### 2. Browser Not Connecting to Backend

- Check browser console (F12) for CORS or network errors
- Make sure both servers are running

## Quick Fix Steps

### Step 1: Create a Fresh Account

Open a new terminal and run:

```bash
cd backend
node -e "const axios = require('axios'); axios.post('http://localhost:5000/api/auth/register', {username: 'john', email: 'john@test.com', password: 'test123'}).then(r => console.log('✅ User created!', r.data)).catch(e => console.log('Error:', e.response?.data || e.message));"
```

### Step 2: Try Logging In

Now in your browser:

1. Go to `http://localhost:5173/login`
2. Use these credentials:
   - **Email**: `john@test.com`
   - **Password**: `test123`
3. Click "Sign In"

### Step 3: Check Browser Console

Press F12 and look for:

- 🔵 Blue messages = requests being sent
- ✅ Green messages = success
- ❌ Red messages = errors

## Common Errors & Solutions

| Error Message         | Solution                                         |
| --------------------- | ------------------------------------------------ |
| "User already exists" | Use a different email for registration           |
| "Invalid Credentials" | Wrong email or password for login                |
| "Network Error"       | Backend not running - restart with `npm run dev` |
| "CORS error"          | Clear browser cache and reload                   |

## Test Credentials

I've verified these work with the backend:

- **Email**: `test@example.com`
- **Password**: `password123`

Try logging in with these credentials first!

## Still Not Working?

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Restart both servers**:

   ```bash
   # Kill both npm run dev processes
   # Then restart:

   # Terminal 1
   cd backend
   npm run dev

   # Terminal 2
   cd frontend
   npm run dev
   ```

3. **Check the browser console** and share the exact error message

## What I've Added

✅ Detailed console logging in AuthContext
✅ Error messages now display on the page
✅ Better error handling for network issues

The console will now show you exactly what's happening when you try to login or register!
