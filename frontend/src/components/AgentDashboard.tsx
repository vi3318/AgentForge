import React from 'react';
import { 
  Code, 
  Shield, 
  TestTube, 
  Wrench,
  Activity,
  TrendingUp
} from 'lucide-react';

interface Agent {
  name: string;
  icon: any;
  color: string;
  bgColor: string;
  status: 'idle' | 'processing' | 'completed' | 'error';
  description: string;
  progress?: number;
}

interface AgentDashboardProps {
  agentStatuses?: Record<string, { status: string; progress?: number }>;
}

export const AgentDashboard: React.FC<AgentDashboardProps> = ({ agentStatuses = {} }) => {
  const agents: Agent[] = [
    {
      name: 'Architect',
      icon: Code,
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10',
      status: (agentStatuses['architect']?.status as any) || 'idle',
      progress: agentStatuses['architect']?.progress,
      description: 'Analyzes code structure and suggests architectural improvements'
    },
    {
      name: 'Implementer',
      icon: Wrench,
      color: 'text-green-400',
      bgColor: 'bg-green-400/10',
      status: (agentStatuses['implementer']?.status as any) || 'idle',
      progress: agentStatuses['implementer']?.progress,
      description: 'Implements suggested improvements and optimizations'
    },
    {
      name: 'Tester',
      icon: TestTube,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-400/10',
      status: (agentStatuses['tester']?.status as any) || 'idle',
      progress: agentStatuses['tester']?.progress,
      description: 'Creates comprehensive tests and validates code quality'
    },
    {
      name: 'Security',
      icon: Shield,
      color: 'text-red-400',
      bgColor: 'bg-red-400/10',
      status: (agentStatuses['security']?.status as any) || 'idle',
      progress: agentStatuses['security']?.progress,
      description: 'Audits code for security vulnerabilities and compliance'
    }
  ];

  return (
    <div className="agent-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-blue-400">Agent Dashboard</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Activity className="w-4 h-4" />
          <span>Real-time Status</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        {agents.map((agent) => {
          const Icon = agent.icon;
          
          return (
            <div key={agent.name} className={`${agent.bgColor} rounded-lg p-4 border border-gray-600`}>
              <div className="flex items-center space-x-3 mb-3">
                <Icon className={`w-6 h-6 ${agent.color}`} />
                <div className="flex-1">
                  <h3 className={`font-semibold ${agent.color}`}>{agent.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      agent.status === 'processing' ? 'bg-yellow-400 animate-pulse' : 
                      agent.status === 'completed' ? 'bg-green-400' : 
                      agent.status === 'error' ? 'bg-red-400' : 'bg-gray-400'
                    }`} />
                    <span className="text-xs text-gray-400 capitalize">{agent.status}</span>
                  </div>
                </div>
              </div>
              
              {agent.progress !== undefined && (
                <div className="mb-2">
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${agent.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-400">{agent.progress}%</span>
                </div>
              )}
              
              <p className="text-xs text-gray-300">{agent.description}</p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">System Performance</span>
          <TrendingUp className="w-4 h-4 text-green-400" />
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-400">4</div>
            <div className="text-xs text-gray-400">Active Agents</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400">98%</div>
            <div className="text-xs text-gray-400">Success Rate</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-400">2.3s</div>
            <div className="text-xs text-gray-400">Avg Response</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 