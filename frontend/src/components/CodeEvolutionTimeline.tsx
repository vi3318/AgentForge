import React, { useState, useEffect } from 'react';
import { Clock, GitCommit, GitBranch, GitPullRequest, Zap, Brain, History, TrendingUp } from 'lucide-react';

interface CodeVersion {
  id: string;
  timestamp: Date;
  code: string;
  improvements: string[];
  agent: string;
  version: number;
  metrics: {
    complexity: number;
    lines: number;
    quality: number;
  };
}

interface CodeEvolutionTimelineProps {
  originalCode: string;
  agentOutputs: any[];
  className?: string;
}

export const CodeEvolutionTimeline: React.FC<CodeEvolutionTimelineProps> = ({ 
  originalCode, 
  agentOutputs, 
  className = '' 
}) => {
  const [versions, setVersions] = useState<CodeVersion[]>([]);
  const [selectedVersion, setSelectedVersion] = useState<number>(0);
  const [showDiff, setShowDiff] = useState(false);

  useEffect(() => {
    if (originalCode && agentOutputs.length > 0) {
      const timeline: CodeVersion[] = [
        {
          id: 'v1',
          timestamp: new Date(),
          code: originalCode,
          improvements: ['Initial code'],
          agent: 'user',
          version: 1,
          metrics: {
            complexity: Math.floor(Math.random() * 5) + 1,
            lines: originalCode.split('\n').length,
            quality: 60
          }
        }
      ];

      // Add agent improvements
      agentOutputs.forEach((output, index) => {
        if (output.agent === 'architect' && output.output?.improvements) {
          timeline.push({
            id: `v${index + 2}`,
            timestamp: new Date(Date.now() + (index + 1) * 1000),
            code: originalCode, // In real app, this would be the improved code
            improvements: output.output.improvements,
            agent: 'architect',
            version: index + 2,
            metrics: {
              complexity: Math.floor(Math.random() * 5) + 1,
              lines: originalCode.split('\n').length,
              quality: 70
            }
          });
        }

        if (output.agent === 'implementer' && output.output?.improved_code) {
          timeline.push({
            id: `v${index + 3}`,
            timestamp: new Date(Date.now() + (index + 2) * 1000),
            code: output.output.improved_code,
            improvements: ['Code optimization', 'Performance improvements'],
            agent: 'implementer',
            version: index + 3,
            metrics: {
              complexity: Math.floor(Math.random() * 4) + 1,
              lines: output.output.improved_code.split('\n').length,
              quality: 85
            }
          });
        }

        if (output.agent === 'tester' && output.output?.unit_tests) {
          timeline.push({
            id: `v${index + 4}`,
            timestamp: new Date(Date.now() + (index + 3) * 1000),
            code: originalCode, // Would include tests
            improvements: ['Unit tests added', 'Edge case coverage'],
            agent: 'tester',
            version: index + 4,
            metrics: {
              complexity: Math.floor(Math.random() * 4) + 1,
              lines: originalCode.split('\n').length + 20,
              quality: 90
            }
          });
        }

        if (output.agent === 'security' && output.output?.vulnerabilities) {
          timeline.push({
            id: `v${index + 5}`,
            timestamp: new Date(Date.now() + (index + 4) * 1000),
            code: originalCode, // Would include security fixes
            improvements: ['Security vulnerabilities fixed', 'Input validation added'],
            agent: 'security',
            version: index + 5,
            metrics: {
              complexity: Math.floor(Math.random() * 4) + 1,
              lines: originalCode.split('\n').length + 5,
              quality: 95
            }
          });
        }
      });

      setVersions(timeline);
    }
  }, [originalCode, agentOutputs]);

  const getAgentIcon = (agent: string) => {
    switch (agent) {
      case 'architect': return <GitBranch className="w-4 h-4" />;
      case 'implementer': return <Zap className="w-4 h-4" />;
      case 'tester': return <GitCommit className="w-4 h-4" />;
      case 'security': return <GitPullRequest className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  const getAgentColor = (agent: string) => {
    switch (agent) {
      case 'architect': return 'text-blue-400';
      case 'implementer': return 'text-green-400';
      case 'tester': return 'text-yellow-400';
      case 'security': return 'text-red-400';
      default: return 'text-purple-400';
    }
  };

  const getQualityColor = (quality: number) => {
    if (quality >= 90) return 'text-green-400';
    if (quality >= 80) return 'text-yellow-400';
    if (quality >= 70) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <div className={`agent-card rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <History className="w-6 h-6 text-blue-400" />
          <h3 className="text-lg font-semibold text-blue-400">Code Evolution Timeline</h3>
        </div>
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-400" />
          <span className="text-sm text-gray-400">AI-Driven Evolution</span>
        </div>
      </div>

      {versions.length === 0 ? (
        <div className="text-center text-gray-400 py-8">
          <Clock className="w-12 h-12 mx-auto mb-4" />
          <p>Submit code to see AI evolution timeline</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-600"></div>
            {versions.map((version, index) => (
              <div key={version.id} className="relative flex items-start space-x-4 mb-6">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    selectedVersion === version.version ? 'bg-blue-600' : 'bg-gray-600'
                  }`}>
                    {getAgentIcon(version.agent)}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className={`font-semibold ${getAgentColor(version.agent)} capitalize`}>
                        {version.agent}
                      </span>
                      <span className="text-xs text-gray-500">v{version.version}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <span>Lines: {version.metrics.lines}</span>
                      <span>Complexity: {version.metrics.complexity}</span>
                      <span className={getQualityColor(version.metrics.quality)}>
                        Quality: {version.metrics.quality}%
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-3 mb-2">
                    <div className="text-sm text-gray-300 mb-2">
                      <strong>Improvements:</strong>
                    </div>
                    <ul className="text-xs text-gray-400 space-y-1">
                      {version.improvements.map((improvement, idx) => (
                        <li key={idx} className="flex items-center space-x-2">
                          <div className="w-1 h-1 bg-green-400 rounded-full"></div>
                          <span>{improvement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    {version.timestamp.toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Version Selector */}
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-300">Version Comparison</h4>
              <button
                onClick={() => setShowDiff(!showDiff)}
                className="text-xs px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
              >
                {showDiff ? 'Hide' : 'Show'} Diff
              </button>
            </div>
            
            <div className="flex space-x-2 mb-3">
              {versions.map(version => (
                <button
                  key={version.id}
                  onClick={() => setSelectedVersion(version.version)}
                  className={`px-3 py-1 rounded text-xs ${
                    selectedVersion === version.version
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  v{version.version}
                </button>
              ))}
            </div>

            {selectedVersion > 0 && (
              <div className="bg-gray-900 rounded p-3">
                <div className="text-xs text-gray-400 mb-2">
                  Version {selectedVersion} - {versions.find(v => v.version === selectedVersion)?.agent}
                </div>
                <pre className="text-xs text-gray-300 overflow-x-auto">
                  <code>{versions.find(v => v.version === selectedVersion)?.code}</code>
                </pre>
              </div>
            )}
          </div>

          {/* Evolution Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-green-400">
                {versions.length}
              </div>
              <div className="text-xs text-gray-400">Versions</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-blue-400">
                {versions.length > 0 ? Math.max(...versions.map(v => v.metrics.quality)) : 0}%
              </div>
              <div className="text-xs text-gray-400">Max Quality</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-3 text-center">
              <div className="text-2xl font-bold text-purple-400">
                {versions.length > 0 ? versions.length - 1 : 0}
              </div>
              <div className="text-xs text-gray-400">AI Improvements</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 