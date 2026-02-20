# 🚀 Quick Setup & Run Guide

## Prerequisites Installation

### 1. Install Node.js
Download and install Node.js from: https://nodejs.org/
- Choose LTS version (20.x or higher)
- This includes npm automatically

### 2. Verify Installation
Open a new terminal and run:
```bash
node --version
npm --version
```

### 3. Install pnpm (Recommended)
```bash
npm install -g pnpm
```

## Running the Project

### Option 1: Using start.bat (Windows)
```bash
# Double-click start.bat
# OR run in terminal:
start.bat
```

### Option 2: Manual Steps

**Step 1: Install Dependencies**
```bash
npm install
```

**Step 2: Generate Admin Token**
```bash
npm run generate:token
```

**Step 3: Configure Environment**
```bash
# Copy template
copy .env.server .env

# Edit .env and add the generated token
```

**Step 4: Start Development Servers**

Open TWO terminals:

Terminal 1 (Backend):
```bash
npm run dev:server
```

Terminal 2 (Frontend):
```bash
npm run dev
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

## Troubleshooting

### Node.js Not Found
1. Download from https://nodejs.org/
2. Install with default options
3. Restart your terminal/IDE
4. Verify: `node --version`

### Port Already in Use
If port 3000 or 5173 is busy:
1. Close other applications using these ports
2. Or change PORT in .env file

### Dependencies Installation Failed
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### Backend Not Connecting
1. Ensure backend is running: `npm run dev:server`
2. Check http://localhost:3000/api/health
3. Verify .env file exists with ADMIN_TOKEN

## Production Build

```bash
# Build everything
npm run build

# Start production server
set NODE_ENV=production
npm start
```

## Quick Test

After starting both servers:

1. Open http://localhost:5173
2. You should see the homepage with categories
3. Try searching for schemes
4. Fill the eligibility form and submit

## Need Help?

- Check if Node.js is installed: `node --version`
- Check if servers are running: Look for terminal output
- Check browser console: Press F12 in browser
- Review logs: Check terminal output for errors

## Next Steps

1. ✅ Install Node.js
2. ✅ Run `npm install`
3. ✅ Run `npm run generate:token`
4. ✅ Create .env file with token
5. ✅ Run `npm run dev:server` (Terminal 1)
6. ✅ Run `npm run dev` (Terminal 2)
7. ✅ Open http://localhost:5173

🎉 Enjoy your Smart Government Scheme Platform!
