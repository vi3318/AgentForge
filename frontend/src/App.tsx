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

  useEffect(() => {
    // Initialize WebSocket connection
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    const wsUrl = apiUrl.replace('http://', 'ws://').replace('https://', 'wss://');
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
    
    // Update agent statuses to processing
    setAgentStatuses({
      architect: { status: 'processing', progress: 0 },
      implementer: { status: 'idle', progress: 0 },
      tester: { status: 'idle', progress: 0 },
      security: { status: 'idle', progress: 0 }
    });
    
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000';
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
      });

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
      setAgentStatuses({
        architect: { status: 'error', progress: 0 },
        implementer: { status: 'error', progress: 0 },
        tester: { status: 'error', progress: 0 },
        security: { status: 'error', progress: 0 }
      });
    } finally {
      setIsProcessing(false);
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