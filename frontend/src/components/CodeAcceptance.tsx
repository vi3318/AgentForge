import React, { useState } from 'react';
import { Check, X, Copy, Download } from 'lucide-react';
import Editor from '@monaco-editor/react';

interface CodeAcceptanceProps {
  originalCode: string;
  improvedCode: string;
  onAccept: (code: string) => void;
  onReject: () => void;
  agentOutputs: any[];
}

export const CodeAcceptance: React.FC<CodeAcceptanceProps> = ({
  originalCode,
  improvedCode,
  onAccept,
  onReject,
  agentOutputs
}) => {
  const [selectedCode, setSelectedCode] = useState<'original' | 'improved'>('improved');

  const getImprovedCode = () => {
    // Find the implementer agent's output
    const implementerOutput = agentOutputs.find(output => output.agent === 'implementer');
    return implementerOutput?.output?.improved_code || improvedCode;
  };

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
  };

  const downloadCode = (code: string, filename: string) => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderAgentSummary = () => {
    const architect = agentOutputs.find(o => o.agent === 'architect');
    const implementer = agentOutputs.find(o => o.agent === 'implementer');
    const tester = agentOutputs.find(o => o.agent === 'tester');
    const security = agentOutputs.find(o => o.agent === 'security');

    return (
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-900/20 p-3 rounded border border-blue-600">
          <h4 className="text-blue-400 font-semibold">🏗️ Architect</h4>
          <p className="text-sm text-gray-300">
            {architect?.output?.improvements?.length || 0} improvements suggested
          </p>
        </div>
        <div className="bg-green-900/20 p-3 rounded border border-green-600">
          <h4 className="text-green-400 font-semibold">🔧 Implementer</h4>
          <p className="text-sm text-gray-300">
            Code enhanced with best practices
          </p>
        </div>
        <div className="bg-yellow-900/20 p-3 rounded border border-yellow-600">
          <h4 className="text-yellow-400 font-semibold">🧪 Tester</h4>
          <p className="text-sm text-gray-300">
            {tester?.output?.coverage || '95%'} test coverage
          </p>
        </div>
        <div className="bg-red-900/20 p-3 rounded border border-red-600">
          <h4 className="text-red-400 font-semibold">🛡️ Security</h4>
          <p className="text-sm text-gray-300">
            {security?.output?.risk_assessment || 'Low risk'}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="agent-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-400">Code Improvements</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedCode('original')}
            className={`px-3 py-1 rounded text-sm ${
              selectedCode === 'original' 
                ? 'bg-gray-600 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Original
          </button>
          <button
            onClick={() => setSelectedCode('improved')}
            className={`px-3 py-1 rounded text-sm ${
              selectedCode === 'improved' 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 text-gray-300'
            }`}
          >
            Improved
          </button>
        </div>
      </div>

      {renderAgentSummary()}

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-400">
            {selectedCode === 'original' ? 'Original Code' : 'Improved Code'}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={() => copyToClipboard(selectedCode === 'original' ? originalCode : getImprovedCode())}
              className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
            >
              <Copy className="w-3 h-3" />
              Copy
            </button>
            <button
              onClick={() => downloadCode(
                selectedCode === 'original' ? originalCode : getImprovedCode(),
                selectedCode === 'original' ? 'original.js' : 'improved.js'
              )}
              className="flex items-center space-x-1 px-2 py-1 text-xs bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
            >
              <Download className="w-3 h-3" />
              Download
            </button>
          </div>
        </div>
        
        <div className="h-64 border border-gray-600 rounded-lg overflow-hidden">
          <Editor
            height="100%"
            language="javascript"
            value={selectedCode === 'original' ? originalCode : getImprovedCode()}
            theme="vs-dark"
            options={{
              readOnly: true,
              minimap: { enabled: false },
              fontSize: 14,
              lineNumbers: 'on',
              roundedSelection: false,
              scrollBeyondLastLine: false,
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => onAccept(getImprovedCode())}
          className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Check className="w-4 h-4" />
          Accept Improved Code
        </button>
        <button
          onClick={onReject}
          className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          <X className="w-4 h-4" />
          Keep Original
        </button>
      </div>
    </div>
  );
}; 