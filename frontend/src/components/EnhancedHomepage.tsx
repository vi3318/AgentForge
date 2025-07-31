import React, { useEffect, useRef } from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { Code, Brain, Zap, Shield, TestTube, Wrench, ArrowRight, Sparkles } from 'lucide-react';

export const EnhancedHomepage: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Subtle 3D Particle System
    const particles: any[] = [];
    const particleCount = 30;

          for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 3,
          vy: (Math.random() - 0.5) * 3,
          vz: (Math.random() - 0.5) * 1,
          size: Math.random() * 2 + 1,
          color: `rgba(59, 130, 246, 0.3)`,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.01 + 0.005
        });
      }

          const animate = () => {
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        particles.forEach(particle => {
          // Update position
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.z += particle.vz;
          particle.pulse += particle.pulseSpeed;

          // Wrap around edges
          if (particle.x < 0) particle.x = canvas.width;
          if (particle.x > canvas.width) particle.x = 0;
          if (particle.y < 0) particle.y = canvas.height;
          if (particle.y > canvas.height) particle.y = 0;
          if (particle.z < 0) particle.z = 1000;
          if (particle.z > 1000) particle.z = 0;

          // Calculate 3D position
          const scale = 1000 / (1000 + particle.z);
          const x = (particle.x - canvas.width / 2) * scale + canvas.width / 2;
          const y = (particle.y - canvas.height / 2) * scale + canvas.height / 2;
          const size = particle.size * scale * (0.8 + 0.2 * Math.sin(particle.pulse));

          // Draw particle with glow effect
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          
          // Simple particle without glow effect
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = particle.color;
          ctx.fill();

          // Draw connections with enhanced effects
          particles.forEach(otherParticle => {
            const otherScale = 1000 / (1000 + otherParticle.z);
            const otherX = (otherParticle.x - canvas.width / 2) * otherScale + canvas.width / 2;
            const otherY = (otherParticle.y - canvas.height / 2) * otherScale + canvas.height / 2;

            const distance = Math.sqrt((x - otherX) ** 2 + (y - otherY) ** 2);
            if (distance < 80) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(otherX, otherY);
              
              ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
              ctx.lineWidth = 1 * (1 - distance / 80);
              ctx.stroke();
            }
          });
        });

        requestAnimationFrame(animate);
      };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Four specialized AI agents work together to analyze and improve your code",
      color: "text-blue-400"
    },
    {
      icon: Zap,
      title: "Real-time Processing",
      description: "Watch your code being enhanced in real-time with live agent updates",
      color: "text-yellow-400"
    },
    {
      icon: Shield,
      title: "Security First",
      description: "Comprehensive security audits and vulnerability detection",
      color: "text-red-400"
    },
    {
      icon: TestTube,
      title: "Quality Assurance",
      description: "Automated testing and code coverage analysis",
      color: "text-green-400"
    }
  ];

  const agents = [
    { name: "Architect", icon: Code, color: "text-blue-400", description: "Designs optimal code structure" },
    { name: "Implementer", icon: Wrench, color: "text-green-400", description: "Enhances code implementation" },
    { name: "Tester", icon: TestTube, color: "text-yellow-400", description: "Ensures code quality" },
    { name: "Security", icon: Shield, color: "text-red-400", description: "Audits security vulnerabilities" }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* 3D Background Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ zIndex: 0 }}
      />

      {/* Content */}
      <div className="relative z-10">
        {/* Navigation Bar */}
        <nav className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">AgentForge</span>
              </div>
              
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
                <a href="#agents" className="text-gray-300 hover:text-white transition-colors">AI Agents</a>
                <a href="#pricing" className="text-gray-300 hover:text-white transition-colors">Pricing</a>
                <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              </div>
              
              <div className="flex items-center space-x-4">
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-gray-300 hover:text-white transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                    Get Started
                  </button>
                </SignInButton>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-20">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-blue-400 mr-3" />
              <h1 className="text-6xl lg:text-8xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                AgentForge
              </h1>
              <Sparkles className="w-8 h-8 text-cyan-400 ml-3" />
            </div>
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              The future of code development. Four AI agents collaborate to analyze, improve, and secure your code in real-time.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <SignInButton mode="modal">
                <button className="group flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-xl font-bold">
                  <Sparkles className="w-6 h-6" />
                  <span>Get Started Free</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </button>
              </SignInButton>
              <button className="px-10 py-5 border-2 border-gray-600 text-gray-300 rounded-xl hover:border-gray-500 hover:text-white transition-all duration-300 text-xl font-semibold hover:bg-gray-800/50 transform hover:scale-105">
                <span>Watch Demo</span>
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group bg-gray-800/50 backdrop-blur-sm rounded-xl p-8 border border-gray-600 hover:border-blue-500 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
                >
                  <div className={`w-16 h-16 ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 text-base leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* AI Agents Showcase */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center text-white mb-12 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Meet Your AI Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {agents.map((agent, index) => {
                const Icon = agent.icon;
                return (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-xl p-8 border-2 border-gray-600 hover:border-current transition-all duration-500 transform hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20"
                    style={{ borderColor: agent.color.replace('text-', '') }}
                  >
                    <div className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 ${agent.color.replace('text-', 'bg-')}`} />
                    <div className={`w-20 h-20 ${agent.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-full h-full" />
                    </div>
                    <h3 className={`text-2xl font-bold ${agent.color} mb-3`}>{agent.name}</h3>
                    <p className="text-gray-400 text-base leading-relaxed">{agent.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-blue-400 mb-3">4</div>
              <div className="text-gray-300 text-lg font-semibold">AI Agents</div>
            </div>
            <div className="text-center bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-green-500 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-green-400 mb-3">98%</div>
              <div className="text-gray-300 text-lg font-semibold">Success Rate</div>
            </div>
            <div className="text-center bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-yellow-500 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-yellow-400 mb-3">2.3s</div>
              <div className="text-gray-300 text-lg font-semibold">Avg Response</div>
            </div>
            <div className="text-center bg-gray-800/30 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all duration-300 transform hover:scale-105">
              <div className="text-4xl font-bold text-purple-400 mb-3">∞</div>
              <div className="text-gray-300 text-lg font-semibold">Learning</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-12 border border-gray-700">
            <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ready to revolutionize your coding?
            </h2>
            <p className="text-gray-300 text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
              Join thousands of developers who are already using AgentForge to write better, safer, and more efficient code.
            </p>
            <SignInButton mode="modal">
                              <button className="group flex items-center space-x-3 px-12 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-2xl font-bold">
                  <Sparkles className="w-8 h-8" />
                  <span>Start Building with AI</span>
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
}; 