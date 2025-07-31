# 🤖 AgentForge - Multi-Agent Code Evolution System

A cutting-edge AI-powered code improvement system that uses four specialized agents working together to analyze, improve, test, and secure your code automatically.

## 🚀 Features

- **4 Specialized AI Agents**: Architect, Implementer, Tester, and Security
- **Real-time Collaboration**: Agents work together in a coordinated workflow
- **Memory System**: ChromaDB-powered memory for learning from past interactions
- **Beautiful UI**: Modern terminal-themed interface with real-time updates
- **WebSocket Support**: Live agent activity streaming
- **Free Tech Stack**: All technologies used are completely free

## 🏗️ Architecture

```
Frontend (React + Vite) ←→ Backend (FastAPI) ←→ AI Agents (Gemini + LangGraph)
                                    ↓
                              Memory (ChromaDB)
```

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **Gemini API** - Google's latest LLM for agent reasoning
- **LangGraph** - Multi-agent workflow orchestration
- **In-Memory Storage** - Lightweight memory system for deployment
- **WebSockets** - Real-time communication

### Frontend
- **React 18** - Modern UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Monaco Editor** - Code editing
- **D3.js** - Data visualization
- **Socket.io** - Real-time updates

## 📦 Installation

### Prerequisites
- Python 3.9+ (3.13 recommended)
- Node.js 18+
- Git

### Backend Setup

1. **Navigate to backend directory:**
```bash
cd agent-forge/backend
```

2. **Create virtual environment:**
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. **Install dependencies:**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables:**
```bash
# Create .env file
echo "GEMINI_API_KEY=your_gemini_api_key_here" > .env
```

5. **Get Gemini API Key:**
   - Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add it to your `.env` file

### Frontend Setup

1. **Navigate to frontend directory:**
```bash
cd agent-forge/frontend
```

2. **Install dependencies:**
```bash
npm install
```

## 🚀 Running the Application

### Start Backend
```bash
cd backend
source venv/bin/activate
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Start Frontend
```bash
cd frontend
npm run dev
```

### Access the Application
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

## 🎯 How It Works

### 1. **Architect Agent** 🏗️
- Analyzes code structure and architecture
- Suggests design patterns and improvements
- Identifies performance bottlenecks
- Recommends refactoring strategies

### 2. **Implementer Agent** 🔧
- Takes architect's suggestions and implements them
- Writes improved code with comments
- Creates unit tests for new functionality
- Provides performance benchmarks

### 3. **Tester Agent** 🧪
- Creates comprehensive test suites
- Tests edge cases and error scenarios
- Validates code quality and coverage
- Ensures reliability and robustness

### 4. **Security Agent** 🛡️
- Audits code for security vulnerabilities
- Checks for best practices and compliance
- Suggests security improvements
- Validates input sanitization

## 📊 Memory System

The system uses ChromaDB to store:
- **Code Patterns**: Similar code structures and solutions
- **Agent Interactions**: Learning from past agent decisions
- **Improvement History**: Track what works and what doesn't

## 🔄 Workflow

1. **User submits code** through the Monaco editor
2. **Architect analyzes** the code structure and suggests improvements
3. **Implementer applies** the suggested improvements
4. **Tester creates** comprehensive tests for the improved code
5. **Security audits** the final code for vulnerabilities
6. **Memory stores** all interactions for future learning
7. **Results displayed** in real-time with beautiful visualizations

## 🎨 UI Features

- **Real-time Agent Dashboard**: See all agents' status and performance
- **Live Code Editor**: Monaco editor with syntax highlighting
- **Agent Activity Feed**: Real-time updates from each agent
- **Memory Network Visualization**: Interactive D3.js graph showing agent connections
- **Terminal Theme**: Dark, professional interface

## 🔧 API Endpoints

- `POST /process-code` - Submit code for agent processing
- `GET /memory/patterns` - Get similar code patterns
- `GET /memory/agent-history/{agent}` - Get agent history
- `GET /health` - System health check
- `WebSocket /ws/agent-updates` - Real-time agent updates

## 🚀 Deployment

### Backend (Railway) - Optimized for Free Tier

The backend has been optimized to work within Railway's 4GB image size limit:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Deploy to Railway
railway login
railway init
railway up
```

**Key Optimizations:**
- ✅ Removed heavy dependencies (`chromadb`, `sentence-transformers`)
- ✅ Lightweight in-memory storage
- ✅ Optimized Dockerfile with Python 3.11-slim
- ✅ Image size reduced from 7GB to under 4GB

**See [RAILWAY_DEPLOYMENT.md](./RAILWAY_DEPLOYMENT.md) for detailed deployment guide.**

### Frontend (Vercel)
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy to Vercel
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📝 License

MIT License - feel free to use this project for your portfolio!

## 🎯 Perfect for Internship Applications

This project demonstrates:
- **Advanced AI/LLM Integration**: Multi-agent systems with LangGraph
- **Modern Web Development**: React + TypeScript + FastAPI
- **Real-time Features**: WebSocket communication
- **Data Visualization**: D3.js for complex visualizations
- **Memory Systems**: Vector databases for AI learning
- **Production-Ready**: Proper error handling, testing, deployment

## 🔮 Future Enhancements

- [ ] Model Context Protocol (MCP) server integration
- [ ] Support for multiple programming languages
- [ ] Custom agent training capabilities
- [ ] Advanced memory visualization
- [ ] Team collaboration features
- [ ] Integration with GitHub repositories

---

**Built with ❤️ for top-tier AI internships** 