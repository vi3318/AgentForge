import React from 'react';
import { 
  Code, 
  Shield, 
  TestTube, 
  Wrench,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingUp,
  Zap
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
      return 'Processing...';
    }
    
    const summary = [];
    
    // Architect summary
    if (output.analysis) summary.push(`📊 ${output.analysis}`);
    if (output.improvements && output.improvements.length > 0) {
      summary.push(`🔧 ${output.improvements.length} optimizations`);
    }
    if (output.complexity_analysis) {
      const comp = output.complexity_analysis;
      summary.push(`⚡ ${comp.current} → ${comp.optimized}`);
    }
    
    // Implementer summary
    if (output.improved_code) summary.push(`💻 Optimized code generated`);
    if (output.complexity_analysis) {
      const comp = output.complexity_analysis;
      summary.push(`📈 ${comp.time} time, ${comp.space} space`);
    }
    
    // Tester summary
    if (output.unit_tests) summary.push(`🧪 ${output.unit_tests.length} test cases`);
    if (output.coverage) summary.push(`📊 ${output.coverage}`);
    if (output.complexity_verification) {
      const comp = output.complexity_verification;
      summary.push(`✅ ${comp.time} verified`);
    }
    
    // Security summary
    if (output.vulnerabilities) summary.push(`🛡️ ${output.vulnerabilities.length} checks`);
    if (output.risk_assessment) summary.push(`⚠️ ${output.risk_assessment}`);
    
    return summary.length > 0 ? summary.join(' • ') : 'Processing...';
  };

  const renderComplexityAnalysis = (output: any) => {
    if (!output.complexity_analysis && !output.complexity_verification) return null;
    
    return (
      <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-600">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-sm font-medium text-green-400">Complexity Analysis</span>
        </div>
        <div className="text-xs text-gray-300 space-y-1">
          {output.complexity_analysis && (
            <>
              <div><span className="text-red-400">Current:</span> {output.complexity_analysis.current}</div>
              <div><span className="text-green-400">Optimized:</span> {output.complexity_analysis.optimized}</div>
              <div className="text-gray-400 italic">{output.complexity_analysis.explanation}</div>
            </>
          )}
          {output.complexity_verification && (
            <>
              <div><span className="text-blue-400">Time:</span> {output.complexity_verification.time}</div>
              <div><span className="text-blue-400">Space:</span> {output.complexity_verification.space}</div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderImprovedCode = (output: any) => {
    if (!output.improved_code) return null;
    
    return (
      <div className="mt-3 p-3 bg-gray-800 rounded border border-gray-600">
        <div className="flex items-center space-x-2 mb-2">
          <Zap className="w-4 h-4 text-yellow-400" />
          <span className="text-sm font-medium text-yellow-400">Optimized Code</span>
        </div>
        <pre className="text-xs text-gray-300 whitespace-pre-wrap bg-gray-900 p-2 rounded">
          {output.improved_code}
        </pre>
      </div>
    );
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
                <div className="space-y-3">
                  {renderComplexityAnalysis(output.output)}
                  {renderImprovedCode(output.output)}
                  <div className="p-3 bg-gray-800 rounded border border-gray-600">
                    <div className="text-xs text-gray-400 mb-2">Full Analysis:</div>
                    <pre className="text-xs text-gray-300 whitespace-pre-wrap">
                      {JSON.stringify(output.output, null, 2)}
                    </pre>
                  </div>
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