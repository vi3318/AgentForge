import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, Code, Shield, TestTube, Wrench, ArrowLeft, Sparkles, Brain } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ChatMessage {
  id: string;
  agent: string;
  message: string;
  timestamp: Date;
  type: 'user' | 'agent';
  code?: string;
}

const agents = [
  { 
    id: 'architect', 
    name: 'Architect', 
    icon: Code, 
    color: 'text-blue-400', 
    bgColor: 'bg-blue-900/20',
    description: 'Code structure and design expert',
    expertise: ['Design Patterns', 'Code Architecture', 'Best Practices', 'System Design']
  },
  { 
    id: 'implementer', 
    name: 'Implementer', 
    icon: Wrench, 
    color: 'text-green-400', 
    bgColor: 'bg-green-900/20',
    description: 'Code enhancement specialist',
    expertise: ['Code Optimization', 'Performance', 'Clean Code', 'SOLID Principles']
  },
  { 
    id: 'tester', 
    name: 'Tester', 
    icon: TestTube, 
    color: 'text-yellow-400', 
    bgColor: 'bg-yellow-900/20',
    description: 'Quality assurance expert',
    expertise: ['Unit Testing', 'Integration Testing', 'Code Coverage', 'Edge Cases']
  },
  { 
    id: 'security', 
    name: 'Security', 
    icon: Shield, 
    color: 'text-red-400', 
    bgColor: 'bg-red-900/20',
    description: 'Security vulnerability expert',
    expertise: ['Vulnerability Detection', 'Security Best Practices', 'Input Validation', 'Authentication']
  }
];

export const AgentChatPage: React.FC = () => {
  const navigate = useNavigate();
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

  const analyzeUserQuestion = (question: string, agent: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Analyze the question type and context
    const isAskingAbout = {
      optimization: lowerQuestion.includes('optimize') || lowerQuestion.includes('performance') || lowerQuestion.includes('speed'),
      patterns: lowerQuestion.includes('pattern') || lowerQuestion.includes('design') || lowerQuestion.includes('architecture'),
      testing: lowerQuestion.includes('test') || lowerQuestion.includes('coverage') || lowerQuestion.includes('bug'),
      security: lowerQuestion.includes('security') || lowerQuestion.includes('vulnerability') || lowerQuestion.includes('safe'),
      codeQuality: lowerQuestion.includes('clean') || lowerQuestion.includes('quality') || lowerQuestion.includes('best practice'),
      specificProblem: lowerQuestion.includes('problem') || lowerQuestion.includes('issue') || lowerQuestion.includes('challenge'),
      howTo: lowerQuestion.includes('how') || lowerQuestion.includes('what') || lowerQuestion.includes('why'),
      comparison: lowerQuestion.includes('vs') || lowerQuestion.includes('difference') || lowerQuestion.includes('compare')
    };

    // Generate contextual response based on agent and question analysis
    if (agent === 'architect') {
      if (isAskingAbout.optimization) {
        return `I see you're asking about optimization. As an Architect, here's my approach:

**Performance Architecture Strategy:**
1. **Identify Bottlenecks First**
   - Profile your code to find the real performance issues
   - Don't optimize prematurely
   - Focus on the 80/20 rule

2. **Critical Path Optimization**
   - Map out your application's critical paths
   - Optimize the most frequently executed code
   - Consider caching strategies for expensive operations

3. **System-Level Optimization**
   - Database query optimization
   - Network request batching
   - Memory usage patterns
   - Concurrency and parallelization

4. **Architectural Patterns for Performance**
   - CQRS (Command Query Responsibility Segregation)
   - Event sourcing for high-throughput systems
   - Microservices for horizontal scaling
   - Caching layers (Redis, CDN)

**Key Principle**: Always measure before and after optimization. What specific performance issue are you facing?`;
      }
      
      if (isAskingAbout.patterns) {
        return `Great question about design patterns! Here's my architectural perspective:

**When to Use Design Patterns:**
1. **Strategy Pattern** - When you have multiple algorithms for the same task
2. **Observer Pattern** - For event-driven architectures
3. **Factory Pattern** - When object creation is complex
4. **Singleton** - Only when you truly need global state
5. **Command Pattern** - For undo/redo functionality

**Architectural Decision Framework:**
- **Problem First**: What specific problem are you solving?
- **Context Matters**: Patterns that work in one context may not in another
- **Simplicity**: Don't over-engineer - start simple
- **Evolution**: Patterns can emerge as your system grows

**Anti-Patterns to Avoid:**
- Using patterns just because they're "cool"
- Over-abstracting simple problems
- Not considering maintenance costs

What specific architectural challenge are you trying to solve?`;
      }
      
      if (isAskingAbout.specificProblem) {
        return `I understand you're facing a specific architectural challenge. Let me help you think through this systematically:

**Problem Analysis Framework:**
1. **Root Cause Analysis**
   - What's the core problem?
   - What are the symptoms vs. causes?
   - What constraints are you working under?

2. **Solution Design Process**
   - Brainstorm multiple approaches
   - Evaluate trade-offs (performance, maintainability, complexity)
   - Consider long-term implications

3. **Architectural Trade-offs**
   - Performance vs. Maintainability
   - Flexibility vs. Simplicity
   - Scalability vs. Development Speed

4. **Decision Making**
   - Document your reasoning
   - Consider the team's expertise
   - Plan for future changes

**My Approach**: I'd need to understand your specific context better. Can you share more details about your problem, constraints, and goals?`;
      }
      
      return `As an Architect, I think about code structure and design systematically. Let me analyze your question...

**My Architectural Philosophy:**
1. **Problem-Driven Design**: Start with the problem, not the solution
2. **Trade-off Awareness**: Every decision has costs and benefits
3. **Evolutionary Architecture**: Design for change, not perfection
4. **Context Matters**: What works in one situation may not in another

**Key Questions I Ask:**
- What problem are you really trying to solve?
- What are your constraints (time, team, technology)?
- How will this system evolve over time?
- What are the failure modes?

**My Process:**
1. Understand the problem deeply
2. Explore multiple solution approaches
3. Evaluate trade-offs systematically
4. Choose the simplest solution that meets requirements
5. Plan for future changes

Can you tell me more about your specific situation? I want to understand your context better to give you the most relevant advice.`;
    }
    
    if (agent === 'implementer') {
      if (isAskingAbout.optimization) {
        return `I see you're asking about optimization. As an Implementer, here's my practical approach:

**Code Optimization Strategy:**
1. **Profile First**
   - Use profiling tools to find real bottlenecks
   - Don't guess - measure everything
   - Focus on the slowest parts

2. **Algorithm Optimization**
   - Choose the right data structures
   - Reduce time complexity where possible
   - Use built-in optimized functions

3. **Memory Optimization**
   - Avoid memory leaks
   - Use efficient data structures
   - Consider object pooling for expensive objects

4. **Practical Techniques**
   - Loop optimization (unrolling, early termination)
   - Function inlining for small, frequently called functions
   - Caching expensive computations
   - Lazy loading and evaluation

**Implementation Tips:**
- Start with clean, readable code
- Optimize only after profiling
- Keep optimizations documented
- Test performance improvements

What specific code are you trying to optimize? I can help you identify the best approaches.`;
      }
      
      if (isAskingAbout.codeQuality) {
        return `Clean code is my specialty! Here's my implementation approach:

**Clean Code Principles:**
1. **Meaningful Names**
   - Variables and functions should be self-documenting
   - Avoid abbreviations and magic numbers
   - Use consistent naming conventions

2. **Small Functions**
   - Single responsibility principle
   - Keep functions under 20 lines
   - One level of abstraction per function

3. **SOLID Principles**
   - **S**ingle Responsibility: One reason to change
   - **O**pen/Closed: Open for extension, closed for modification
   - **L**iskov Substitution: Subtypes are substitutable
   - **I**nterface Segregation: Small, focused interfaces
   - **D**ependency Inversion: Depend on abstractions

4. **Code Organization**
   - Group related functionality
   - Use consistent formatting
   - Remove dead code
   - Keep dependencies minimal

**Implementation Checklist:**
- [ ] Functions have clear, single purposes
- [ ] Variables have descriptive names
- [ ] No code duplication
- [ ] Error handling is graceful
- [ ] Comments explain WHY, not WHAT

What specific code quality issue are you working on?`;
      }
      
      return `As an Implementer, I focus on writing clean, efficient, and maintainable code. Let me think about your question...

**My Implementation Philosophy:**
1. **Readability First**: Code is read more than written
2. **Practical Solutions**: Focus on what works in practice
3. **Incremental Improvement**: Small, consistent improvements
4. **Testing as Documentation**: Tests show how code should work

**Key Implementation Areas:**
- **Code Structure**: Organizing code for clarity and maintainability
- **Performance**: Writing efficient, scalable code
- **Error Handling**: Graceful failure and recovery
- **Testing**: Ensuring code works correctly
- **Documentation**: Making code self-explanatory

**My Process:**
1. Understand the requirements clearly
2. Design the simplest solution that works
3. Write clean, testable code
4. Refactor for clarity and performance
5. Document the important decisions

What specific implementation challenge are you facing? I'd love to help you write better code!`;
    }
    
    if (agent === 'tester') {
      if (isAskingAbout.testing) {
        return `Testing is crucial for code quality! Here's my comprehensive testing approach:

**Testing Strategy:**
1. **Test Pyramid**
   - Many unit tests (fast, cheap)
   - Fewer integration tests
   - Even fewer end-to-end tests

2. **Unit Testing Best Practices**
   - Test one thing at a time
   - Use descriptive test names
   - Arrange-Act-Assert pattern
   - Mock external dependencies

3. **Test Coverage**
   - Aim for 80-90% coverage
   - Focus on critical business logic
   - Don't chase 100% coverage blindly

4. **Testing Types**
   - **Happy Path**: Normal operation
   - **Edge Cases**: Boundary conditions
   - **Error Cases**: Exception handling
   - **Performance**: Load and stress testing

**Testing Tools & Techniques:**
- Jest, Mocha, JUnit for unit testing
- Mocking libraries for dependencies
- Coverage tools to identify gaps
- Test data builders for complex scenarios

**My Testing Philosophy:**
- Tests are documentation
- Write tests before code (TDD)
- Tests should be fast and reliable
- Focus on behavior, not implementation

What specific testing challenge are you working on?`;
      }
      
      if (isAskingAbout.coverage) {
        return `Test coverage is important, but quality matters more! Here's my approach:

**Coverage Strategy:**
1. **Line Coverage**: Execute every line of code
2. **Branch Coverage**: Test all conditional paths
3. **Function Coverage**: Test all functions/methods
4. **Statement Coverage**: Execute every statement

**Quality Over Quantity:**
- **Meaningful Tests**: Tests that catch real bugs
- **Maintainable Tests**: Tests that are easy to update
- **Fast Tests**: Tests that run quickly
- **Reliable Tests**: Tests that don't flake

**Coverage Best Practices:**
1. **Focus on Critical Paths**
   - Business logic is more important than utility functions
   - Error handling paths are crucial
   - Edge cases often hide bugs

2. **Avoid Coverage Gaming**
   - Don't write tests just to increase coverage
   - Focus on testing behavior, not implementation
   - Test the "why", not just the "what"

3. **Coverage Tools**
   - Use coverage reports to identify gaps
   - Set realistic coverage targets (80-90%)
   - Review uncovered code regularly

**My Coverage Philosophy:**
- 80% coverage with good tests > 100% coverage with poor tests
- Focus on critical business logic
- Test error conditions thoroughly
- Keep tests simple and focused

What's your current testing situation?`;
      }
      
      return `As a Tester, I ensure code quality and reliability. Let me think about your testing question...

**My Testing Philosophy:**
1. **Quality Assurance**: Preventing bugs before they reach production
2. **Risk-Based Testing**: Focus on high-risk areas
3. **Automation**: Automate repetitive testing tasks
4. **Continuous Testing**: Test early and often

**Testing Areas I Focus On:**
- **Unit Testing**: Testing individual components
- **Integration Testing**: Testing component interactions
- **System Testing**: Testing the entire system
- **Performance Testing**: Ensuring system meets performance requirements
- **Security Testing**: Identifying security vulnerabilities

**My Testing Process:**
1. Understand the requirements and acceptance criteria
2. Design test cases that cover all scenarios
3. Implement automated tests where possible
4. Execute tests and analyze results
5. Report issues and track resolution

**Testing Tools I Use:**
- Unit testing frameworks (Jest, JUnit, etc.)
- Mocking libraries for dependencies
- Coverage tools to measure test effectiveness
- CI/CD integration for continuous testing

What specific testing challenge are you facing? I can help you design effective test strategies!`;
    }
    
    if (agent === 'security') {
      if (isAskingAbout.security) {
        return `Security is critical! Here's my comprehensive security approach:

**Security Fundamentals:**
1. **Defense in Depth**
   - Multiple layers of security controls
   - Don't rely on a single security measure
   - Assume any single layer can be compromised

2. **Input Validation**
   - Validate all user inputs
   - Use parameterized queries (SQL injection prevention)
   - Sanitize data before processing
   - Implement proper encoding

3. **Authentication & Authorization**
   - Strong password policies
   - Multi-factor authentication
   - Role-based access control
   - Session management and timeout

4. **Common Vulnerabilities to Prevent:**
   - **SQL Injection**: Use ORMs or prepared statements
   - **XSS**: Sanitize all user inputs
   - **CSRF**: Implement anti-CSRF tokens
   - **Injection Attacks**: Validate and sanitize all inputs

**Security Best Practices:**
- Keep dependencies updated
- Use HTTPS for all communications
- Implement proper logging and monitoring
- Regular security audits and penetration testing
- Follow the principle of least privilege

**Security Tools & Techniques:**
- Static analysis tools (SonarQube, Snyk)
- Dynamic testing tools (OWASP ZAP)
- Dependency vulnerability scanners
- Security headers implementation

What specific security concern are you addressing?`;
      }
      
      if (isAskingAbout.vulnerability) {
        return `Vulnerability assessment is crucial! Here's my systematic approach:

**Vulnerability Assessment Process:**
1. **Code Review**
   - Manual security review
   - Automated static analysis
   - Peer review with security focus

2. **Penetration Testing**
   - Simulate real attack scenarios
   - Test all entry points
   - Identify weak points in defenses

3. **Vulnerability Scanning**
   - Automated vulnerability scanners
   - Regular dependency checks
   - Configuration security analysis

4. **Common Vulnerability Types:**
   - **Input Validation**: Missing or weak input validation
   - **Authentication**: Weak authentication mechanisms
   - **Authorization**: Insufficient access controls
   - **Data Exposure**: Sensitive data not properly protected
   - **Configuration**: Insecure default configurations

**Vulnerability Management:**
1. **Identification**: Find vulnerabilities through various methods
2. **Assessment**: Evaluate risk level and impact
3. **Prioritization**: Focus on high-risk vulnerabilities first
4. **Remediation**: Fix vulnerabilities systematically
5. **Verification**: Confirm vulnerabilities are resolved

**Security Tools:**
- OWASP ZAP for dynamic testing
- SonarQube for static analysis
- Snyk for dependency scanning
- Burp Suite for web application testing

**My Security Philosophy:**
- Security by design, not as an afterthought
- Regular security assessments
- Continuous monitoring and improvement
- Stay updated with latest threats and countermeasures

What specific vulnerability are you concerned about?`;
      }
      
      return `As a Security expert, I protect your code from vulnerabilities and threats. Let me think about your security question...

**My Security Philosophy:**
1. **Security by Design**: Build security in from the start
2. **Defense in Depth**: Multiple layers of protection
3. **Risk-Based Approach**: Focus on high-impact vulnerabilities
4. **Continuous Improvement**: Regular security assessments

**Security Areas I Focus On:**
- **Vulnerability Assessment**: Identifying security weaknesses
- **Threat Modeling**: Understanding potential attack vectors
- **Security Testing**: Penetration testing and code review
- **Compliance**: Meeting security standards and regulations
- **Incident Response**: Planning for security incidents

**My Security Process:**
1. Understand the system and its security requirements
2. Identify potential threats and vulnerabilities
3. Assess risk levels and prioritize issues
4. Recommend security controls and countermeasures
5. Verify that security measures are effective

**Security Tools & Techniques:**
- Static and dynamic analysis tools
- Penetration testing frameworks
- Vulnerability scanning tools
- Security monitoring and logging

**Key Security Principles:**
- Principle of least privilege
- Defense in depth
- Fail securely
- Security through obscurity is not security

What specific security concern do you need help with? I can help you identify and address security vulnerabilities!`;
    }
    
    // Default intelligent response
    return `I understand your question. Let me think about this from my perspective as a ${agent}...

**My Analysis:**
Based on your question, I can see you're looking for practical guidance. As a ${agent}, my approach is to:

1. **Understand the Context**: What specific problem are you trying to solve?
2. **Consider Multiple Approaches**: There's usually more than one way to solve a problem
3. **Evaluate Trade-offs**: Every solution has costs and benefits
4. **Focus on Practical Results**: What works in your specific situation?

**My Process:**
- Ask clarifying questions to understand your needs better
- Provide specific, actionable advice
- Consider your constraints and context
- Suggest multiple approaches when appropriate

**Key Questions for You:**
- What's your specific goal or problem?
- What constraints are you working under?
- What have you tried so far?
- What's your team's experience level?

Can you give me more context about your situation? I want to provide the most relevant and helpful advice for your specific case.`;
  };

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
      // Simulate thinking time for more realistic interaction
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
      
      const response = analyzeUserQuestion(inputMessage, selectedAgent);
      
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
    <div className="min-h-screen terminal-bg">
      {/* Header */}
      <header className="p-4 border-b border-gray-700">
        <div className="container mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-blue-400 hover:text-blue-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold text-blue-400">Agent Chat</h1>
          <div className="flex items-center space-x-2">
            <Brain className="w-6 h-6 text-purple-400" />
            <span className="text-sm text-gray-400">AI-Powered</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Agent Selection Sidebar */}
          <div className="lg:col-span-1">
            <div className="agent-card rounded-lg p-6">
              <h2 className="text-lg font-semibold text-blue-400 mb-4">Choose Your Agent</h2>
              <div className="space-y-3">
                {agents.map(agent => {
                  const Icon = agent.icon;
                  return (
                    <button
                      key={agent.id}
                      onClick={() => setSelectedAgent(agent.id)}
                      className={`w-full p-4 rounded-lg text-left transition-all ${
                        selectedAgent === agent.id 
                          ? `${agent.bgColor} border border-current ${agent.color}` 
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-6 h-6 ${agent.color}`} />
                        <div>
                          <h3 className="font-semibold">{agent.name}</h3>
                          <p className="text-sm opacity-80">{agent.description}</p>
                        </div>
                      </div>
                      <div className="mt-2">
                        <p className="text-xs opacity-60">Expertise:</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {agent.expertise.slice(0, 2).map((skill, index) => (
                            <span key={index} className="text-xs px-2 py-1 bg-gray-600 rounded">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <div className="agent-card rounded-lg p-6 h-[600px] flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const agent = agents.find(a => a.id === selectedAgent);
                    const Icon = agent?.icon || MessageCircle;
                    return (
                      <>
                        <Icon className={`w-6 h-6 ${agent?.color}`} />
                        <div>
                          <h2 className="text-xl font-semibold text-blue-400">{agent?.name}</h2>
                          <p className="text-sm text-gray-400">{agent?.description}</p>
                        </div>
                      </>
                    );
                  })()}
                </div>
                <Sparkles className="w-5 h-5 text-purple-400 animate-pulse" />
              </div>

              <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                {messages.length === 0 ? (
                  <div className="text-center text-gray-400 py-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                    <p>Start a conversation with your AI agent!</p>
                    <p className="text-sm mt-2">Ask about code patterns, best practices, or get specific advice.</p>
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
                          <div className="text-sm whitespace-pre-wrap">{message.message}</div>
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
          </div>
        </div>
      </div>
    </div>
  );
}; 