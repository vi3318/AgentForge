import React from 'react';
import Editor from '@monaco-editor/react';
import { Play, Loader2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onCodeChange: (code: string) => void;
  onSubmit: () => void;
  isProcessing: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onCodeChange,
  onSubmit,
  isProcessing
}) => {
  // Detect language based on code content
  const detectLanguage = (code: string): string => {
    if (code.includes('def ') || code.includes('import ') || code.includes('print(')) {
      return 'python';
    }
    if (code.includes('function ') || code.includes('const ') || code.includes('let ')) {
      return 'javascript';
    }
    if (code.includes('public class ') || code.includes('public static void main')) {
      return 'java';
    }
    return 'python'; // Default to Python
  };

  return (
    <div className="agent-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-400">Code Input</h2>
        <button
          onClick={onSubmit}
          disabled={isProcessing || !code.trim()}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Play className="w-4 h-4 mr-2" />
          )}
          {isProcessing ? 'Processing...' : 'Run Agents'}
        </button>
      </div>
      
      <div className="h-[500px] border border-gray-600 rounded-lg overflow-hidden">
        <Editor
          height="100%"
          language={detectLanguage(code)}
          value={code}
          onChange={(value) => onCodeChange(value || '')}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: 'on',
            roundedSelection: false,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            wordWrap: 'on',
            folding: true,
            foldingStrategy: 'indentation',
            showFoldingControls: 'always',
            // Python-specific settings
            python: {
              linting: {
                enabled: false // Disable linting to prevent false positives
              }
            }
          }}
        />
      </div>
    </div>
  );
}; 