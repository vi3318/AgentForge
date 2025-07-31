# 🚀 AgentForge Deployment Guide

## **Overview**
This guide will help you deploy AgentForge to production using free services.

## **📋 Prerequisites**
- GitHub account
- Railway account (free tier)
- Vercel account (free tier)
- Google Cloud account (for Gemini API)

## **🔧 Step 1: Environment Setup**

### **Backend Environment Variables**
Create a `.env` file in the `backend` directory:

```bash
# Google Gemini API
GOOGLE_API_KEY=your_gemini_api_key_here

# Database (SQLite for free tier)
DATABASE_URL=sqlite:///./agentforge.db

# Server Configuration
HOST=0.0.0.0
PORT=8000
```

### **Frontend Environment Variables**
Create a `.env` file in the `frontend` directory:

```bash
# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key

# Backend API URL (will be updated after deployment)
VITE_API_URL=https://your-railway-app.railway.app
```

## **🚀 Step 2: Deploy Backend to Railway**

### **2.1 Prepare Backend**
```bash
cd backend

# Create requirements.txt (already exists)
# Create Procfile for Railway
echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile

# Create runtime.txt
echo "python-3.11" > runtime.txt
```

### **2.2 Deploy to Railway**
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Connect your GitHub account
4. Select your AgentForge repository
5. Set the root directory to `backend`
6. Add environment variables:
   - `GOOGLE_API_KEY`
   - `DATABASE_URL`
   - `HOST`
   - `PORT`

### **2.3 Railway Configuration**
```json
// railway.json (optional)
{
  "build": {
    "builder": "nixpacks"
  },
  "deploy": {
    "startCommand": "uvicorn main:app --host 0.0.0.0 --port $PORT",
    "healthcheckPath": "/test",
    "healthcheckTimeout": 300,
    "restartPolicyType": "ON_FAILURE"
  }
}
```

## **🌐 Step 3: Deploy Frontend to Vercel**

### **3.1 Prepare Frontend**
```bash
cd frontend

# Update vite.config.ts for production
```

### **3.2 Deploy to Vercel**
1. Go to [Vercel.com](https://vercel.com)
2. Click "New Project" → "Import Git Repository"
3. Select your AgentForge repository
4. Set the root directory to `frontend`
5. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### **3.3 Environment Variables in Vercel**
Add these environment variables in Vercel dashboard:
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_API_URL` (your Railway backend URL)

## **🔐 Step 4: Setup Authentication**

### **4.1 Clerk Setup**
1. Go to [Clerk.com](https://clerk.com)
2. Create a new application
3. Copy your publishable key
4. Add it to your environment variables

### **4.2 Configure Clerk**
In your Clerk dashboard:
1. Go to "Settings" → "Domains"
2. Add your Vercel domain
3. Configure sign-in methods (Google, GitHub, etc.)

## **🔧 Step 5: API Configuration**

### **5.1 Update Frontend API URL**
After getting your Railway URL, update the frontend environment:
```bash
VITE_API_URL=https://your-app-name.railway.app
```

### **5.2 Test Backend Health**
```bash
curl https://your-app-name.railway.app/test
```

## **📊 Step 6: Monitoring & Analytics**

### **6.1 Railway Monitoring**
- Railway provides built-in monitoring
- Check logs in Railway dashboard
- Monitor resource usage

### **6.2 Vercel Analytics**
- Enable Vercel Analytics in dashboard
- Track performance and errors

## **🔧 Step 7: Custom Domain (Optional)**

### **7.1 Railway Custom Domain**
1. Go to Railway dashboard
2. Click on your app
3. Go to "Settings" → "Domains"
4. Add your custom domain

### **7.2 Vercel Custom Domain**
1. Go to Vercel dashboard
2. Click on your project
3. Go to "Settings" → "Domains"
4. Add your custom domain

## **🚀 Step 8: Production Checklist**

### **✅ Backend Checklist**
- [ ] Environment variables set
- [ ] Database migrations run
- [ ] Health check endpoint working
- [ ] CORS configured for frontend domain
- [ ] Rate limiting enabled
- [ ] Error logging configured

### **✅ Frontend Checklist**
- [ ] Environment variables set
- [ ] API URL configured
- [ ] Authentication working
- [ ] Build successful
- [ ] Performance optimized
- [ ] Error boundaries added

### **✅ Security Checklist**
- [ ] HTTPS enabled
- [ ] Environment variables secured
- [ ] API keys not exposed
- [ ] CORS properly configured
- [ ] Rate limiting active

## **🔧 Step 9: Troubleshooting**

### **Common Issues**

#### **Backend Issues**
```bash
# Check Railway logs
railway logs

# Test locally
uvicorn main:app --reload --port 8000

# Check environment variables
echo $GOOGLE_API_KEY
```

#### **Frontend Issues**
```bash
# Check Vercel logs
vercel logs

# Build locally
npm run build

# Test locally
npm run dev
```

#### **CORS Issues**
Update `backend/main.py`:
```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-domain.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## **📈 Step 10: Performance Optimization**

### **Backend Optimization**
```python
# Add caching
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend

# Add compression
from fastapi.middleware.gzip import GZipMiddleware
app.add_middleware(GZipMiddleware, minimum_size=1000)
```

### **Frontend Optimization**
```typescript
// Add lazy loading
const CodeVisualizer = lazy(() => import('./components/CodeVisualizer'));

// Add service worker for caching
// Add image optimization
```

## **🔗 Final URLs**
- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-app.railway.app`
- **API Docs**: `https://your-app.railway.app/docs`

## **🎉 Deployment Complete!**

Your AgentForge application is now live with:
- ✅ Multi-agent AI code evolution
- ✅ Real-time collaboration
- ✅ Code visualization
- ✅ Authentication
- ✅ Performance monitoring
- ✅ Scalable architecture

## **📚 Next Steps**
1. Set up monitoring alerts
2. Configure backup strategies
3. Set up CI/CD pipelines
4. Add more AI agents
5. Implement advanced features

## **🆘 Support**
- Railway Docs: https://docs.railway.app
- Vercel Docs: https://vercel.com/docs
- Clerk Docs: https://clerk.com/docs
- FastAPI Docs: https://fastapi.tiangolo.com 