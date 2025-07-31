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

  const getImprovedResponse = (agent: string, message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    const responses = {
      architect: {
        'linked list': `For linked list problems, here are the key architectural patterns:

**1. Two-Pointer Technique**
- Fast & Slow pointers for cycle detection
- Start pointers at different positions
- Useful for: finding middle, detecting cycles

**2. Recursive Approach**
- Break problem into smaller subproblems
- Base case: null or single node
- Useful for: reversing, merging, tree-like operations

**3. Iterative Approach**
- Use while loops with current pointer
- Maintain previous pointer for connections
- Useful for: traversal, modification

**4. Dummy Node Pattern**
- Create dummy head to simplify edge cases
- Avoid null pointer issues
- Useful for: insertion, deletion at head

**Best Practice**: Always consider edge cases (empty list, single node) and draw out the pointer movements!`,
        
        'design pattern': `Here are the most important design patterns for your code:

**1. Strategy Pattern**
- Define family of algorithms
- Make them interchangeable
- Example: Different sorting algorithms

**2. Observer Pattern**
- One-to-many dependency
- Automatic updates when state changes
- Example: Event systems, UI updates

**3. Factory Pattern**
- Create objects without specifying exact class
- Centralize object creation logic
- Example: Database connections, UI components

**4. Singleton Pattern**
- Ensure only one instance exists
- Global access point
- Example: Configuration, logging

**5. Command Pattern**
- Encapsulate request as object
- Parameterize clients with requests
- Example: Undo/redo functionality

Choose patterns based on your specific problem domain!`,
        
        'architecture': `Here's a clean architecture approach:

**1. Separation of Concerns**
- Data layer (models, repositories)
- Business logic layer (services)
- Presentation layer (UI components)

**2. Dependency Inversion**
- High-level modules don't depend on low-level modules
- Both depend on abstractions
- Example: Interface-based design

**3. Single Responsibility**
- Each class/module has one reason to change
- Makes code more maintainable
- Easier to test and debug

**4. Open/Closed Principle**
- Open for extension, closed for modification
- Use inheritance and polymorphism
- Example: Plugin architecture

**5. Interface Segregation**
- Clients shouldn't depend on interfaces they don't use
- Keep interfaces focused and small`,
        
        default: `As an Architect, I focus on code structure and design. Here are key principles:

**1. Clean Architecture**
- Separate concerns into layers
- Make dependencies flow inward
- Keep business logic independent

**2. Design Patterns**
- Use proven solutions for common problems
- Strategy, Observer, Factory patterns
- Choose based on your specific needs

**3. Code Organization**
- Group related functionality
- Use meaningful names
- Keep functions small and focused

**4. Scalability**
- Design for future growth
- Consider performance implications
- Plan for maintainability

What specific architectural challenge are you facing?`
      },
      
      implementer: {
        'optimize': `Here are code optimization strategies:

**1. Algorithm Optimization**
- Choose right data structures
- Reduce time complexity
- Example: Use HashMap for O(1) lookups

**2. Memory Optimization**
- Avoid memory leaks
- Use efficient data structures
- Example: Use StringBuilder for string concatenation

**3. Loop Optimization**
- Reduce nested loops
- Use early termination
- Example: Break when condition met

**4. Function Optimization**
- Cache expensive computations
- Use memoization
- Example: Fibonacci with memoization

**5. Code Quality**
- Remove dead code
- Simplify complex logic
- Use built-in functions

**Performance Tip**: Profile your code to find bottlenecks first!`,
        
        'clean code': `Here are clean code principles:

**1. Meaningful Names**
- Use descriptive variable/function names
- Avoid abbreviations
- Example: calculateTotalPrice() not calc()

**2. Small Functions**
- One function, one responsibility
- Keep under 20 lines
- Easy to test and understand

**3. Comments**
- Explain WHY, not WHAT
- Use comments for complex business logic
- Keep code self-documenting

**4. Error Handling**
- Use specific exceptions
- Handle edge cases
- Provide meaningful error messages

**5. SOLID Principles**
- Single Responsibility
- Open/Closed
- Liskov Substitution
- Interface Segregation
- Dependency Inversion

**6. Code Formatting**
- Consistent indentation
- Proper spacing
- Follow style guides`,
        
        default: `As an Implementer, I focus on writing clean, efficient code. Here are my key areas:

**1. Code Quality**
- Write readable, maintainable code
- Follow naming conventions
- Keep functions small and focused

**2. Performance**
- Choose efficient algorithms
- Optimize data structures
- Profile and measure performance

**3. Best Practices**
- Follow SOLID principles
- Use design patterns appropriately
- Write self-documenting code

**4. Refactoring**
- Improve existing code
- Remove code smells
- Maintain functionality while improving structure

What specific implementation challenge do you need help with?`
      },
      
      tester: {
        'test': `Here's a comprehensive testing strategy:

**1. Unit Testing**
- Test individual functions/methods
- Mock dependencies
- Example: Test each sorting algorithm separately

**2. Integration Testing**
- Test component interactions
- Test API endpoints
- Example: Test database operations

**3. Edge Cases**
- Empty/null inputs
- Boundary conditions
- Invalid data formats
- Example: Test with empty arrays, null values

**4. Test Coverage**
- Aim for 80-90% coverage
- Focus on critical paths
- Test error conditions

**5. Test Types**
- Happy path (normal flow)
- Error path (exception handling)
- Edge cases (boundary conditions)

**6. Testing Tools**
- Jest, Mocha, JUnit
- Mocking libraries
- Coverage tools

**Best Practice**: Write tests before or alongside your code (TDD)!`,
        
        'coverage': `Here's how to achieve good test coverage:

**1. Line Coverage**
- Execute every line of code
- Use coverage tools
- Aim for 80%+ coverage

**2. Branch Coverage**
- Test all conditional branches
- Include true/false paths
- Example: Test both if/else blocks

**3. Function Coverage**
- Test all functions/methods
- Include private methods
- Test different parameter combinations

**4. Statement Coverage**
- Execute every statement
- Include error handling
- Test exception paths

**5. Coverage Tools**
- Jest: --coverage flag
- Istanbul for JavaScript
- JaCoCo for Java

**6. Coverage Reports**
- Identify untested code
- Focus on critical areas
- Set coverage thresholds

**Remember**: Quality over quantity - meaningful tests are better than high coverage with poor tests!`,
        
        default: `As a Tester, I ensure code quality and reliability. Here are my key areas:

**1. Test Strategy**
- Unit, integration, and system tests
- Automated testing pipelines
- Continuous testing practices

**2. Quality Assurance**
- Bug detection and prevention
- Code review processes
- Quality metrics tracking

**3. Edge Case Testing**
- Boundary conditions
- Error scenarios
- Performance under stress

**4. Test Automation**
- CI/CD integration
- Automated test suites
- Regression testing

**5. Coverage Analysis**
- Identify untested code
- Measure test effectiveness
- Improve test quality

What specific testing challenge are you facing?`
      },
      
      security: {
        'security': `Here are essential security practices:

**1. Input Validation**
- Validate all user inputs
- Use parameterized queries
- Example: SQL injection prevention

**2. Authentication**
- Strong password policies
- Multi-factor authentication
- Session management

**3. Authorization**
- Role-based access control
- Principle of least privilege
- Regular permission audits

**4. Data Protection**
- Encrypt sensitive data
- Secure data transmission (HTTPS)
- Regular backups

**5. Common Vulnerabilities**
- SQL Injection: Use prepared statements
- XSS: Sanitize user inputs
- CSRF: Use tokens
- Buffer Overflow: Validate input lengths

**6. Security Headers**
- Content Security Policy
- X-Frame-Options
- X-Content-Type-Options

**Best Practice**: Security by design - build it in from the start!`,
        
        'vulnerability': `Here's how to identify and fix vulnerabilities:

**1. Code Review**
- Manual security review
- Automated static analysis
- Peer review processes

**2. Penetration Testing**
- Simulate real attacks
- Identify weak points
- Test security controls

**3. Vulnerability Scanning**
- Automated tools
- Regular scans
- Dependency checking

**4. Common Vulnerabilities**
- **SQL Injection**: Use ORM or prepared statements
- **XSS**: Sanitize all user inputs
- **CSRF**: Implement anti-CSRF tokens
- **Injection**: Validate and sanitize inputs

**5. Security Tools**
- OWASP ZAP
- SonarQube
- Snyk for dependencies

**6. Best Practices**
- Keep dependencies updated
- Use security headers
- Implement logging and monitoring

**Remember**: Security is an ongoing process, not a one-time task!`,
        
        default: `As a Security expert, I protect your code from vulnerabilities. Here are my key areas:

**1. Vulnerability Assessment**
- Identify security weaknesses
- Analyze attack vectors
- Assess risk levels

**2. Security Best Practices**
- Input validation
- Authentication/authorization
- Data encryption

**3. Threat Modeling**
- Identify potential threats
- Assess attack scenarios
- Plan mitigation strategies

**4. Security Testing**
- Penetration testing
- Code security review
- Vulnerability scanning

**5. Compliance**
- Security standards
- Regulatory requirements
- Industry best practices

What specific security concern do you need help with?`
      }
    };

    const agentResponses = responses[agent as keyof typeof responses];
    if (!agentResponses) return 'I understand your question. Let me analyze this...';

    // Check for specific keywords in the message
    for (const [keyword, response] of Object.entries(agentResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    return agentResponses.default;
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
      const response = getImprovedResponse(selectedAgent, inputMessage);
      
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