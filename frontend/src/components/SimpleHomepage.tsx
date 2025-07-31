import React from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { Code, Brain, Zap, Shield, TestTube, Wrench, ArrowRight, Sparkles } from 'lucide-react';

export const SimpleHomepage: React.FC = () => {
  return (
    <div className="min-h-screen terminal-bg">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-indigo-900/20"></div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <Code className="w-10 h-10 text-white" />
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6">
              AgentForge
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The world's first AI-powered multi-agent code evolution system. 
              Transform your code with intelligent agents that learn and improve together.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SignInButton mode="modal">
                <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-semibold">
                  <Sparkles className="w-5 h-5" />
                  <span>Get Started Free</span>
                </button>
              </SignInButton>
              
              <button className="px-8 py-4 border border-gray-600 text-gray-300 rounded-lg hover:border-gray-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 text-lg">
                <ArrowRight className="w-5 h-5" />
                <span>Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Revolutionary AI Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the future of code development with our cutting-edge AI agents
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300">
            <Brain className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Multi-Agent AI</h3>
            <p className="text-gray-400">Four specialized AI agents work together to analyze, improve, test, and secure your code.</p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-green-500 transition-all duration-300">
            <Zap className="w-12 h-12 text-green-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Real-Time Evolution</h3>
            <p className="text-gray-400">Watch your code evolve in real-time with AI-driven improvements and optimizations.</p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300">
            <TestTube className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Smart Testing</h3>
            <p className="text-gray-400">Automated test generation and quality assurance with comprehensive coverage.</p>
          </div>

          <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-red-500 transition-all duration-300">
            <Shield className="w-12 h-12 text-red-400 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Security First</h3>
            <p className="text-gray-400">Advanced security analysis and vulnerability detection for robust code.</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Code?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already using AgentForge to build better, safer, and more efficient code.
          </p>
          
          <SignInButton mode="modal">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 text-lg font-semibold mx-auto">
              <Sparkles className="w-5 h-5" />
              <span>Start Building Now</span>
            </button>
          </SignInButton>
        </div>
      </div>
    </div>
  );
}; 