import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AgentDashboard } from './components/AgentDashboard';
import { CodeEditor } from './components/CodeEditor';
import { AgentActivity } from './components/AgentActivity';
import { MemoryGraph } from './components/MemoryGraph';
import { CodeAcceptance } from './components/CodeAcceptance';
import { PerformanceMetrics } from './components/PerformanceMetrics';
import { EnhancedHomepage } from './components/EnhancedHomepage';
import { SimpleHomepage } from './components/SimpleHomepage';
import { AgentChatPage } from './pages/AgentChatPage';
import { CodeVisualizer } from './components/CodeVisualizer';
import { CodeEvolutionTimeline } from './components/CodeEvolutionTimeline';
import { useUser, SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { MessageCircle } from 'lucide-react';
// WebSocket connection for real-time updates
let ws: WebSocket | null = null;

const AppContent: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [agentOutputs, setAgentOutputs] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [agentStatuses, setAgentStatuses] = useState({});
  const [showCodeAcceptance, setShowCodeAcceptance] = useState(false);
  const [originalCode, setOriginalCode] = useState('');
  const [processingProgress, setProcessingProgress] = useState(0);

  useEffect(() => {
    // Initialize WebSocket connection
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    console.log('API URL:', apiUrl); // Debug log
    const wsUrl = apiUrl.replace('http://', 'ws://').replace('https://', 'wss://');
    console.log('WebSocket URL:', `${wsUrl}/ws/agent-updates`); // Debug log
    ws = new WebSocket(`${wsUrl}/ws/agent-updates`);
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === 'agent_update') {
          setAgentOutputs(prev => [...prev, data.data]);
        } else if (data.type === 'processing_complete') {
          // Handle processing completion
          if (data.data && data.data.agent_outputs) {
            setAgentOutputs(data.data.agent_outputs);
          }
          setIsProcessing(false);
        }
      } catch (error) {
        console.log('WebSocket message received:', event.data);
      }
    };

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onerror = (error) => {
      console.log('WebSocket error:', error);
    };

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);

  const handleCodeSubmit = async () => {
    setIsProcessing(true);
    setAgentOutputs([]); // Clear previous outputs
    setShowCodeAcceptance(false); // Hide previous acceptance UI
    setOriginalCode(code); // Store original code
    setProcessingProgress(0);
    
    // Update agent statuses to processing with progress
    setAgentStatuses({
      architect: { status: 'processing', progress: 0 },
      implementer: { status: 'idle', progress: 0 },
      tester: { status: 'idle', progress: 0 },
      security: { status: 'idle', progress: 0 }
    });
    
    // Simulate progress updates with better timing
    const progressInterval = setInterval(() => {
      setProcessingProgress(prev => {
        if (prev >= 85) return prev; // Stop at 85% to wait for backend
        return prev + Math.random() * 15;
      });
    }, 800);
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
      console.log('HTTP API URL:', apiUrl); // Debug log
      
      // Add timeout to prevent hanging requests
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout
      
      const response = await fetch(`${apiUrl}/process-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.id}` // Send user ID for personalization
        },
        body: JSON.stringify({ 
          code, 
          task: 'Improve this code',
          userId: user?.id 
        }),
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);

      const result = await response.json();
      console.log('Processing result:', result);
      
      if (result.success) {
        // Add all agent outputs to the activity feed
        if (result.result && result.result.agent_outputs) {
          setAgentOutputs(result.result.agent_outputs);
          setShowCodeAcceptance(true); // Show acceptance UI
        }
        
        // Update agent statuses to completed
        setAgentStatuses({
          architect: { status: 'completed', progress: 100 },
          implementer: { status: 'completed', progress: 100 },
          tester: { status: 'completed', progress: 100 },
          security: { status: 'completed', progress: 100 }
        });
        setProcessingProgress(100);
      } else {
        console.error('Processing failed:', result.error);
        setAgentStatuses({
          architect: { status: 'error', progress: 0 },
          implementer: { status: 'error', progress: 0 },
          tester: { status: 'error', progress: 0 },
          security: { status: 'error', progress: 0 }
        });
      }
    } catch (error) {
      console.error('Error submitting code:', error);
      
      // Handle different types of errors
      let errorMessage = 'An error occurred while processing your code.';
      if (error.name === 'AbortError') {
        errorMessage = 'Request timed out. Please try again with a smaller code snippet.';
      } else if (error.name === 'TypeError' && error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      setAgentStatuses({
        architect: { status: 'error', progress: 0 },
        implementer: { status: 'error', progress: 0 },
        tester: { status: 'error', progress: 0 },
        security: { status: 'error', progress: 0 }
      });
      
      // Show error message to user
      alert(errorMessage);
    } finally {
      setIsProcessing(false);
      clearInterval(progressInterval);
    }
  };

  const handleAcceptCode = (improvedCode: string) => {
    setCode(improvedCode);
    setShowCodeAcceptance(false);
  };

  const handleRejectCode = () => {
    setShowCodeAcceptance(false);
  };



  return (
    <div className="min-h-screen terminal-bg">
      <header className="p-4 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">AgentForge</h1>
          <div className="flex items-center space-x-4">
            <SignedIn>
              <button 
                onClick={() => navigate('/chat')}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat with Agents</span>
              </button>
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <CodeEditor 
              code={code} 
              onCodeChange={setCode}
              onSubmit={handleCodeSubmit}
              isProcessing={isProcessing}
            />
            
            {/* Processing Progress Indicator */}
            {isProcessing && (
              <div className="agent-card rounded-lg p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Processing Code...</h3>
                    <p className="text-sm text-gray-400">AI agents are analyzing your code</p>
                  </div>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${processingProgress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{Math.round(processingProgress)}% complete</p>
              </div>
            )}
            
            <AgentActivity outputs={agentOutputs} />
            {showCodeAcceptance && (
              <CodeAcceptance
                originalCode={originalCode}
                improvedCode={agentOutputs.find(o => o.agent === 'implementer')?.output?.improved_code}
                onAccept={handleAcceptCode}
                onReject={handleRejectCode}
                agentOutputs={agentOutputs}
              />
            )}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <AgentDashboard agentStatuses={agentStatuses} />
            <CodeVisualizer code={code} />
            <PerformanceMetrics 
              agentOutputs={agentOutputs}
              originalCode={originalCode}
              improvedCode={agentOutputs.find(o => o.agent === 'implementer')?.output?.improved_code}
            />
            <CodeEvolutionTimeline originalCode={originalCode} agentOutputs={agentOutputs} />
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <SignedIn>
              <AppContent />
            </SignedIn>
            <SignedOut>
              <EnhancedHomepage />
            </SignedOut>
          </>
        } />
        <Route path="/chat" element={
          <>
            <SignedIn>
              <AgentChatPage />
            </SignedIn>
            <SignedOut>
              <EnhancedHomepage />
            </SignedOut>
          </>
        } />
        <Route path="*" element={<EnhancedHomepage />} />
      </Routes>
    </Router>
  );
};

export default App; 