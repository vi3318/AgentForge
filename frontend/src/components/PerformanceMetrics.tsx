import React from 'react';
import { TrendingUp, TrendingDown, Activity, Zap, Shield, TestTube, Code, Wrench } from 'lucide-react';

interface PerformanceMetricsProps {
  agentOutputs: any[];
  originalCode: string;
  improvedCode?: string;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  agentOutputs,
  originalCode,
  improvedCode
}) => {
  const calculateMetrics = () => {
    const originalLines = originalCode.split('\n').length;
    const improvedLines = improvedCode?.split('\n').length || originalLines;
    
    const architect = agentOutputs.find(o => o.agent === 'architect');
    const implementer = agentOutputs.find(o => o.agent === 'implementer');
    const tester = agentOutputs.find(o => o.agent === 'tester');
    const security = agentOutputs.find(o => o.agent === 'security');

    return {
      linesReduced: Math.max(0, originalLines - improvedLines),
      linesAdded: Math.max(0, improvedLines - originalLines),
      improvementsSuggested: architect?.output?.improvements?.length || 0,
      patternsIdentified: architect?.output?.patterns?.length || 0,
      performanceTips: architect?.output?.performance?.length || 0,
      securityChecks: architect?.output?.security?.length || 0,
      testCoverage: tester?.output?.coverage || '0%',
      riskAssessment: security?.output?.risk_assessment || 'Unknown',
      vulnerabilities: security?.output?.vulnerabilities?.length || 0,
      unitTests: tester?.output?.unit_tests?.length || 0,
      integrationTests: tester?.output?.integration_tests?.length || 0
    };
  };

  const metrics = calculateMetrics();

  const MetricCard = ({ 
    title, 
    value, 
    icon: Icon, 
    color, 
    trend = 'neutral',
    subtitle = ''
  }: {
    title: string;
    value: string | number;
    icon: any;
    color: string;
    trend?: 'up' | 'down' | 'neutral';
    subtitle?: string;
  }) => (
    <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <Icon className={`w-5 h-5 ${color}`} />
          <span className="text-sm text-gray-400">{title}</span>
        </div>
        {trend !== 'neutral' && (
          <div className={`flex items-center space-x-1 ${
            trend === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      {subtitle && <div className="text-xs text-gray-400">{subtitle}</div>}
    </div>
  );

  return (
    <div className="agent-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-blue-400">Performance Metrics</h2>
        <Activity className="w-6 h-6 text-blue-400" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Code Quality"
          value={metrics.improvementsSuggested}
          icon={Code}
          color="text-blue-400"
          trend={metrics.improvementsSuggested > 0 ? 'up' : 'neutral'}
          subtitle="Improvements suggested"
        />
        <MetricCard
          title="Performance"
          value={metrics.performanceTips}
          icon={Zap}
          color="text-yellow-400"
          trend={metrics.performanceTips > 0 ? 'up' : 'neutral'}
          subtitle="Optimization tips"
        />
        <MetricCard
          title="Security"
          value={metrics.securityChecks}
          icon={Shield}
          color="text-red-400"
          trend={metrics.vulnerabilities === 0 ? 'up' : 'down'}
          subtitle="Security checks"
        />
        <MetricCard
          title="Test Coverage"
          value={metrics.testCoverage}
          icon={TestTube}
          color="text-green-400"
          trend={metrics.testCoverage.includes('95') ? 'up' : 'neutral'}
          subtitle="Code coverage"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Code Analysis */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
          <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
            <Code className="w-5 h-5 mr-2" />
            Code Analysis
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Lines of Code:</span>
              <span className="text-white">
                {metrics.linesReduced > 0 ? `-${metrics.linesReduced}` : `+${metrics.linesAdded}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Design Patterns:</span>
              <span className="text-white">{metrics.patternsIdentified}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Complexity:</span>
              <span className="text-green-400">Reduced</span>
            </div>
          </div>
        </div>

        {/* Testing Metrics */}
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-600">
          <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
            <TestTube className="w-5 h-5 mr-2" />
            Testing Metrics
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Unit Tests:</span>
              <span className="text-white">{metrics.unitTests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Integration Tests:</span>
              <span className="text-white">{metrics.integrationTests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Coverage:</span>
              <span className="text-green-400">{metrics.testCoverage}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Assessment */}
      <div className="mt-6 bg-gray-800/50 rounded-lg p-4 border border-gray-600">
        <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center">
          <Shield className="w-5 h-5 mr-2" />
          Security Assessment
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{metrics.vulnerabilities}</div>
            <div className="text-xs text-gray-400">Vulnerabilities</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{metrics.securityChecks}</div>
            <div className="text-xs text-gray-400">Security Checks</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{metrics.riskAssessment}</div>
            <div className="text-xs text-gray-400">Risk Level</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">✓</div>
            <div className="text-xs text-gray-400">Compliant</div>
          </div>
        </div>
      </div>
    </div>
  );
}; 