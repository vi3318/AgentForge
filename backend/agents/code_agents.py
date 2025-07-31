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
        You are a Senior Software Architect. Analyze this code and provide specific architectural improvements with Big O notation analysis.
        
        Code:
        {code}
        
        Requirements:
        {requirements}
        
        Provide a comprehensive analysis with:
        1. Current time and space complexity analysis
        2. Specific optimization suggestions with Big O improvements
        3. Design patterns that could be applied
        4. Performance bottlenecks identification
        5. Security considerations
        
        Format as JSON with keys: analysis, improvements, patterns, performance, security, complexity_analysis
        
        The complexity_analysis should include:
        - current: "O(n²) time, O(1) space" (example)
        - optimized: "O(n) time, O(n) space" (example)
        - explanation: Brief explanation of the optimization
        
        Focus on:
        - Algorithm efficiency improvements
        - Data structure optimizations
        - Input validation and error handling
        - Code readability and maintainability
        - Security considerations
        - Documentation improvements
        
        Keep responses concise and actionable with specific Big O notation.
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
        You are a Senior Software Developer. Implement optimized improvements to this code with better time/space complexity.
        
        Original Code:
        {code}
        
        Suggested Improvements:
        {suggestions}
        
        Provide an optimized version of the code that:
        1. Improves time and/or space complexity
        2. Implements proper error handling and input validation
        3. Follows best practices and is well-documented
        4. Is more robust and maintainable
        
        If the code is already optimal, provide the same code with better documentation and error handling.
        
        Format as JSON with keys: improved_code, comments, tests, benchmarks, complexity_analysis
        
        The complexity_analysis should include:
        - time: "O(n) - single pass through array" (example)
        - space: "O(n) - HashMap storage" (example)
        - explanation: Brief explanation of the optimization
        
        Focus on:
        - Algorithm optimizations (HashMap, two-pointer, etc.)
        - Error handling and input validation
        - Performance improvements with Big O notation
        - Documentation and type hints
        - Code readability and maintainability
        - Security considerations
        
        Keep the improved code concise, practical, and well-documented.
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
        You are a Senior QA Engineer. Create comprehensive tests for this code and verify complexity analysis.
        
        Code:
        {code}
        
        Provide essential tests:
        1. Unit tests for main functions with edge cases
        2. Integration tests for component interactions
        3. Performance tests to verify Big O complexity
        4. Error handling tests for invalid inputs
        5. Security tests for input validation
        
        Format as JSON with keys: unit_tests, integration_tests, edge_cases, performance_tests, coverage, complexity_verification
        
        The complexity_verification should include:
        - time: "O(n) verified through profiling" (example)
        - space: "O(n) confirmed with memory analysis" (example)
        
        Focus on:
        - Testing all code paths and edge cases
        - Verifying performance characteristics
        - Ensuring proper error handling
        - Testing security aspects
        - Achieving good test coverage
        
        Keep tests concise, practical, and focused on verifying the code's correctness and performance.
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
        You are a Senior Security Engineer. Audit this code for security vulnerabilities and provide comprehensive security analysis.
        
        Code:
        {code}
        
        Provide comprehensive security analysis:
        1. Input validation and sanitization issues
        2. Data exposure and privacy risks
        3. Authentication and authorization concerns
        4. Common vulnerability patterns (SQL injection, XSS, etc.)
        5. Security best practices recommendations
        6. Risk assessment and mitigation strategies
        
        Format as JSON with keys: vulnerabilities, risk_assessment, fixes, best_practices, compliance, security_analysis
        
        The security_analysis should include:
        - input_validation: "✅ Properly implemented" or "❌ Missing validation"
        - error_handling: "✅ Graceful failure" or "❌ Poor error handling"
        - data_exposure: "✅ No sensitive data exposure" or "❌ Potential data leak"
        
        Focus on:
        - Input validation and sanitization
        - Error handling and logging
        - Data protection and privacy
        - Authentication and authorization
        - Security headers and configurations
        - Compliance with security standards
        
        Keep analysis concise, actionable, and focused on practical security improvements.
        """
        
        response = self.model.generate_content(prompt)
        result = json.loads(response.text)
        
        self.add_to_memory({
            "input": input_data,
            "output": result,
            "timestamp": "2025-01-20T10:00:00Z"
        })
        
        return result 