# 🚀 Railway Deployment Guide for AgentForge

## ✅ Optimized for Railway Free Tier

This guide will help you deploy the AgentForge backend to Railway without hitting the 4GB image size limit.

---

## 🔧 What We Fixed

### **Problem**: 
- Original image size: **7.0 GB** 
- Railway free tier limit: **4.0 GB**
- Caused by heavy dependencies: `chromadb` and `sentence-transformers`

### **Solution**:
- ✅ Removed `chromadb` and `sentence-transformers` from requirements
- ✅ Created lightweight in-memory storage
- ✅ Optimized Dockerfile with Python 3.11-slim
- ✅ Added `.dockerignore` to exclude unnecessary files

---

## 🚀 Step-by-Step Deployment

### **Step 1: Prepare Your Repository**

Make sure your GitHub repository has these optimized files:

```
agent-forge/
├── Dockerfile                   # Root-level Dockerfile
├── .dockerignore                # Root-level exclusions
├── railway.json                 # Railway configuration
├── backend/
│   ├── requirements.txt          # Lightweight version
│   └── memory/memory_manager.py # In-memory storage
└── frontend/                    # Already deployed on Vercel
```

### **Step 2: Deploy to Railway**

1. **Go to Railway Dashboard**
   - Visit [railway.app](https://railway.app)
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `vi3318/AgentForge` repository

3. **Configure Deployment**
   - Railway will automatically detect the `Dockerfile`
   - Set the root directory to `backend`
   - Click "Deploy"

4. **Add Environment Variables**
   - Go to your project settings
   - Add these variables:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

### **Step 3: Get Your Backend URL**

1. **Find Your Domain**
   - Go to your Railway project
   - Click on the deployed service
   - Copy the generated domain (e.g., `https://agent-forge-backend-production.up.railway.app`)

2. **Update Frontend Configuration**
   - Go to your Vercel frontend deployment
   - Add environment variable:
   ```
   VITE_API_URL=https://your-railway-domain.railway.app
   ```

---

## 🔍 Verify Deployment

### **Test Backend Health**
```bash
curl https://your-railway-domain.railway.app/health
```
Should return: `{"status": "healthy"}`

### **Test API Endpoints**
```bash
# Test the main endpoint
curl -X POST https://your-railway-domain.railway.app/process-code \
  -H "Content-Type: application/json" \
  -d '{"code": "function test() { return 1; }", "task": "Improve this function"}'
```

---

## 🛠️ Troubleshooting

### **Build Still Failing?**

1. **Check Image Size**
   - Railway shows build logs with image size
   - Should be under 4GB now

2. **Common Issues**:
   - **Port Issues**: Make sure `railway.json` uses `$PORT`
   - **Dependencies**: Check `requirements.txt` doesn't have heavy packages
   - **Environment Variables**: Ensure `GEMINI_API_KEY` is set

3. **Force Rebuild**:
   - Go to Railway project settings
   - Click "Redeploy" to force a fresh build

### **Runtime Errors?**

1. **Check Logs**:
   - Go to your Railway service
   - Click "Logs" tab
   - Look for error messages

2. **Common Runtime Issues**:
   - **Missing API Key**: Ensure `GEMINI_API_KEY` is set
   - **Port Issues**: Check if using `$PORT` environment variable
   - **Memory Issues**: In-memory storage should work fine

---

## 📊 Monitoring Your Deployment

### **Railway Dashboard**
- **Build Status**: Green = Success, Red = Failed
- **Deployment Time**: Should be 2-5 minutes
- **Image Size**: Should be under 4GB
- **Memory Usage**: Should be low with in-memory storage

### **Health Checks**
- Railway automatically checks `/health` endpoint
- If health checks fail, Railway will restart the service

---

## 🔄 Updating Your Deployment

### **Automatic Updates**
- Railway automatically redeploys when you push to GitHub
- No manual intervention needed

### **Manual Updates**
1. Push changes to your GitHub repository
2. Railway detects changes automatically
3. New deployment starts within 1-2 minutes

---

## 🎯 Expected Results

### **Successful Deployment**
- ✅ Build completes in 2-5 minutes
- ✅ Image size under 4GB
- ✅ Health check passes
- ✅ API endpoints respond correctly

### **Performance**
- ✅ Fast startup (no heavy dependencies)
- ✅ Low memory usage (in-memory storage)
- ✅ Reliable operation (Railway's infrastructure)

---

## 🚀 Next Steps

1. **Test Your Full Application**
   - Frontend: `https://agent-forge-black.vercel.app`
   - Backend: `https://your-railway-domain.railway.app`
   - Try processing some code!

2. **Monitor Performance**
   - Check Railway logs for any issues
   - Monitor memory usage
   - Test with different code types

3. **Share Your Project**
   - Update your GitHub README with live links
   - Add to your portfolio
   - Share with potential employers!

---

## 🆘 Need Help?

### **Railway Support**
- [Railway Documentation](https://docs.railway.app/)
- [Railway Discord](https://discord.gg/railway)

### **AgentForge Issues**
- Check the [GitHub repository](https://github.com/vi3318/AgentForge)
- Create an issue if you find bugs
- Star the repository if it helps!

---

**🎉 Congratulations! Your AgentForge backend should now deploy successfully on Railway!** 