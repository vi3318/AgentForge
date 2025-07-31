from .base_agent import BaseAgent
import google.generativeai as genai
from typing import Dict, Any, List
import json

class ArchitectAgent(BaseAgent):
    def __init__(self, model):
        super().__init__("Architect", "Code Architecture Designer", model)
        
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        code = input_data.get("code", "")
        requirements = input_data.get("requirements", "")
        
        prompt = f"""
        You are a Senior Software Architect. Analyze this code and provide specific architectural improvements.
        
        Code:
        {code}
        
        Requirements:
        {requirements}
        
        Memory Context:
        {self.get_memory_context()}
        
        Provide a detailed analysis and specific improvements. Be concrete and actionable.
        
        Format as JSON with keys: analysis, improvements, patterns, performance, security
        
        General improvement categories to consider:
        - Input validation and error handling
        - Performance optimizations (time/space complexity)
        - Code readability and maintainability
        - Design patterns and best practices
        - Security considerations
        - Documentation and type hints
        - Edge case handling
        - Memory management
        - Algorithm efficiency
        - Code organization and structure
        
        Be specific about what to change and why. Provide concrete, actionable suggestions.
        """
        
        response = self.model.generate_content(prompt)
        result = json.loads(response.text)
        
        self.add_to_memory({
            "input": input_data,
            "output": result,
            "timestamp": "2025-01-20T10:00:00Z"
        })
        
        return result

class ImplementationAgent(BaseAgent):
    def __init__(self, model):
        super().__init__("Implementer", "Code Implementation Specialist", model)
        
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        code = input_data.get("code", "")
        suggestions = input_data.get("suggestions", "")
        
        prompt = f"""
        You are a Senior Software Developer. Implement the suggested improvements to this code.
        
        Original Code:
        {code}
        
        Suggested Improvements:
        {suggestions}
        
        Memory Context:
        {self.get_memory_context()}
        
        Provide an ACTUALLY IMPROVED version of the code with the suggested changes implemented.
        Make the code better, more robust, and follow best practices.
        
        Format as JSON with keys: improved_code, comments, tests, benchmarks
        
        Improvement guidelines:
        - Add proper error handling and input validation
        - Improve performance where possible
        - Add comprehensive documentation and type hints
        - Follow language-specific best practices
        - Make code more readable and maintainable
        - Add edge case handling
        - Use modern language features when appropriate
        - Implement proper logging and debugging
        - Consider security implications
        - Add unit tests for critical functionality
        
        The improved_code should be the actual enhanced version with better performance, error handling, and documentation.
        """
        
        response = self.model.generate_content(prompt)
        result = json.loads(response.text)
        
        self.add_to_memory({
            "input": input_data,
            "output": result,
            "timestamp": "2025-01-20T10:00:00Z"
        })
        
        return result

class TestingAgent(BaseAgent):
    def __init__(self, model):
        super().__init__("Tester", "Quality Assurance Specialist", model)
        
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        code = input_data.get("code", "")
        
        prompt = f"""
        You are a Senior QA Engineer. Create comprehensive tests for this code.
        
        Code:
        {code}
        
        Memory Context:
        {self.get_memory_context()}
        
        Provide comprehensive testing strategy:
        1. Unit tests for all functions/methods
        2. Integration tests for component interactions
        3. Edge case tests (null inputs, empty arrays, boundary conditions)
        4. Performance tests (time complexity, memory usage)
        5. Error handling tests
        6. Security tests (input validation, injection attacks)
        7. Accessibility tests (if applicable)
        8. Test coverage analysis and recommendations
        
        Consider the programming language and framework used.
        Provide actual test code, not just descriptions.
        
        Format as JSON with keys: unit_tests, integration_tests, edge_cases, performance_tests, security_tests, coverage, recommendations
        """
        
        response = self.model.generate_content(prompt)
        result = json.loads(response.text)
        
        self.add_to_memory({
            "input": input_data,
            "output": result,
            "timestamp": "2025-01-20T10:00:00Z"
        })
        
        return result

class SecurityAgent(BaseAgent):
    def __init__(self, model):
        super().__init__("Security", "Security Auditor", model)
        
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        code = input_data.get("code", "")
        
        prompt = f"""
        You are a Senior Security Engineer. Audit this code for security vulnerabilities.
        
        Code:
        {code}
        
        Memory Context:
        {self.get_memory_context()}
        
        Provide comprehensive security analysis:
        1. Input validation vulnerabilities (SQL injection, XSS, buffer overflow)
        2. Authentication and authorization issues
        3. Data exposure and privacy concerns
        4. Cryptographic weaknesses
        5. Resource management issues (memory leaks, DoS)
        6. Third-party dependency risks
        7. Configuration security issues
        8. Logging and monitoring gaps
        9. Compliance considerations (GDPR, HIPAA, PCI-DSS if applicable)
        10. Security best practices recommendations
        
        Consider the programming language, framework, and deployment context.
        Provide specific, actionable security fixes.
        
        Format as JSON with keys: vulnerabilities, risk_assessment, fixes, best_practices, compliance, recommendations
        """
        
        response = self.model.generate_content(prompt)
        result = json.loads(response.text)
        
        self.add_to_memory({
            "input": input_data,
            "output": result,
            "timestamp": "2025-01-20T10:00:00Z"
        })
        
        return result 