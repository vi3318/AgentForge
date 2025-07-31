import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Code, Shield, TestTube, Wrench } from 'lucide-react';

interface ChatMessage {
  id: string;
  agent: string;
  message: string;
  timestamp: Date;
  type: 'user' | 'agent';
}

interface AgentChatProps {
  onSendMessage: (agent: string, message: string) => Promise<string>;
}

const agents = [
  { id: 'architect', name: 'Architect', icon: Code, color: 'text-blue-400', bgColor: 'bg-blue-900/20' },
  { id: 'implementer', name: 'Implementer', icon: Wrench, color: 'text-green-400', bgColor: 'bg-green-900/20' },
  { id: 'tester', name: 'Tester', icon: TestTube, color: 'text-yellow-400', bgColor: 'bg-yellow-900/20' },
  { id: 'security', name: 'Security', icon: Shield, color: 'text-red-400', bgColor: 'bg-red-900/20' }
];

export const AgentChat: React.FC<AgentChatProps> = ({ onSendMessage }) => {
  const [selectedAgent, setSelectedAgent] = useState('architect');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      agent: selectedAgent,
      message: inputMessage,
      timestamp: new Date(),
      type: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await onSendMessage(selectedAgent, inputMessage);
      
      const agentMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        agent: selectedAgent,
        message: response,
        timestamp: new Date(),
        type: 'agent'
      };

      setMessages(prev => [...prev, agentMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getAgentIcon = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return MessageCircle;
    return agent.icon;
  };

  const getAgentColor = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    return agent?.color || 'text-gray-400';
  };

  return (
    <div className="agent-card rounded-lg p-6 h-[600px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-400">Agent Chat</h2>
        <div className="flex space-x-2">
          {agents.map(agent => {
            const Icon = agent.icon;
            return (
              <button
                key={agent.id}
                onClick={() => setSelectedAgent(agent.id)}
                className={`p-2 rounded-lg transition-all ${
                  selectedAgent === agent.id 
                    ? `${agent.bgColor} ${agent.color} border border-current` 
                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                }`}
                title={`Chat with ${agent.name}`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-4" />
            <p>Start a conversation with your AI agents!</p>
            <p className="text-sm mt-2">Ask them about code patterns, best practices, or get specific advice.</p>
          </div>
        ) : (
          messages.map(message => {
            const AgentIcon = getAgentIcon(message.agent);
            const agentColor = getAgentColor(message.agent);
            
            return (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-200'
                }`}>
                  {message.type === 'agent' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <AgentIcon className={`w-4 h-4 ${agentColor}`} />
                      <span className={`text-xs font-medium ${agentColor}`}>
                        {agents.find(a => a.id === message.agent)?.name}
                      </span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.message}</p>
                  <p className="text-xs opacity-70 mt-2">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            );
          })
        )}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-700 text-gray-200 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-400"></div>
                <span className="text-sm">Agent is thinking...</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Ask ${agents.find(a => a.id === selectedAgent)?.name} anything...`}
          className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}; 