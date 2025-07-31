# 🔧 Environment Variables Setup Guide

## 🚨 Current Issue
Your frontend is trying to connect to the wrong backend URL. The environment variable `VITE_API_URL` is not set correctly.

## ✅ How to Fix

### **Step 1: Get Your Railway Backend URL**

1. Go to your Railway dashboard
2. Click on your backend project
3. Copy the generated URL (e.g., `https://agentforge-production.up.railway.app`)

### **Step 2: Set Environment Variable in Vercel**

1. Go to your Vercel dashboard
2. Click on your frontend project (`agent-forge-black`)
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-railway-url.up.railway.app`
   - **Environment**: Production, Preview, Development
5. Click **Save**

### **Step 3: Redeploy Frontend**

1. Go to your Vercel project
2. Click **Deployments**
3. Click **Redeploy** on the latest deployment

## 🔍 Verify the Fix

### **Check Console Logs**
After redeploying, open your browser's developer console and look for:
```
API URL: https://your-railway-url.up.railway.app
WebSocket URL: wss://your-railway-url.up.railway.app/ws/agent-updates
HTTP API URL: https://your-railway-url.up.railway.app
```

### **Test the Connection**
1. Open your frontend app
2. Paste some code and click "Process Code"
3. Check if agents start working

## 🛠️ Troubleshooting

### **Wrong URL Format**
- ❌ `VITE_API_URL=https://agentforge-production.up.railway.app/`
- ✅ `VITE_API_URL=https://agentforge-production.up.railway.app`

### **Missing Protocol**
- ❌ `VITE_API_URL=agentforge-production.up.railway.app`
- ✅ `VITE_API_URL=https://agentforge-production.up.railway.app`

### **Environment Variable Not Loading**
1. Make sure you redeployed after adding the variable
2. Check that the variable is set for all environments
3. Clear browser cache and reload

## 📋 Example Configuration

### **For Production (Vercel)**
```
VITE_API_URL=https://agentforge-production.up.railway.app
```

### **For Local Development**
```
VITE_API_URL=http://localhost:8000
```

## 🎯 Expected Results

After fixing the environment variable:
- ✅ WebSocket connects to Railway backend
- ✅ HTTP requests go to Railway backend
- ✅ Agents process code successfully
- ✅ Real-time updates work

---

**Need help? Check the Railway logs to make sure your backend is running correctly!** 