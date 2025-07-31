import React from 'react';
import { 
  Code, 
  Shield, 
  TestTube, 
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface AgentOutput {
  agent: string;
  output: any;
  timestamp: string;
}

interface AgentActivityProps {
  outputs: AgentOutput[];
}

interface ExpandedOutput {
  [key: string]: boolean;
}

const agentIcons = {
  architect: Code,
  implementer: Wrench,
  tester: TestTube,
  security: Shield,
};

const agentColors = {
  architect: 'text-blue-400',
  implementer: 'text-green-400',
  tester: 'text-yellow-400',
  security: 'text-red-400',
};

export const AgentActivity: React.FC<AgentActivityProps> = ({ outputs }) => {
  const [expandedOutputs, setExpandedOutputs] = React.useState<ExpandedOutput>({});

  const toggleExpanded = (index: number) => {
    setExpandedOutputs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const renderOutputSummary = (output: any) => {
    if (!output) {
      return 'No output available';
    }
    
    const summary = [];
    
    if (output.analysis) summary.push(`📊 Analysis: ${output.analysis}`);
    if (output.improvements && output.improvements.length > 0) {
      summary.push(`🔧 ${output.improvements.length} improvements suggested`);
    }
    if (output.patterns && output.patterns.length > 0) {
      summary.push(`🏗️ ${output.patterns.length} patterns identified`);
    }
    if (output.performance && output.performance.length > 0) {
      summary.push(`⚡ ${output.performance.length} performance tips`);
    }
    if (output.security && output.security.length > 0) {
      summary.push(`🛡️ ${output.security.length} security checks`);
    }
    if (output.unit_tests) summary.push(`🧪 Unit tests created`);
    if (output.integration_tests) summary.push(`🔗 Integration tests added`);
    if (output.vulnerabilities) summary.push(`🔍 Security audit completed`);
    
    return summary.length > 0 ? summary.join(' • ') : 'Processing...';
  };

  return (
    <div className="agent-card rounded-lg p-6">
      <h2 className="text-xl font-semibold text-blue-400 mb-4">
        Agent Activity
      </h2>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {outputs.map((output, index) => {
          if (!output || !output.agent) {
            return null;
          }
          
          const Icon = agentIcons[output.agent as keyof typeof agentIcons] || Code;
          const color = agentColors[output.agent as keyof typeof agentColors] || 'text-gray-400';
          const isExpanded = expandedOutputs[index];
          
          return (
            <div key={index} className="border border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Icon className={`w-5 h-5 ${color}`} />
                  <span className={`font-medium capitalize ${color}`}>
                    {output.agent}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span>{output.timestamp ? new Date(output.timestamp).toLocaleTimeString() : 'Now'}</span>
                  </div>
                  <button
                    onClick={() => toggleExpanded(index)}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    {isExpanded ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
              </div>
              
              <div className="text-sm text-gray-300 mb-3">
                {renderOutputSummary(output.output)}
              </div>
              
              {isExpanded && (
                <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-600">
                  <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                    {JSON.stringify(output.output, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          );
        })}
        
        {outputs.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <Code className="w-12 h-12 mx-auto mb-4" />
            <p>No agent activity yet. Submit code to see agents in action!</p>
          </div>
        )}
      </div>
    </div>
  );
}; 