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
        
        Provide a concise analysis with 3-5 specific improvements. Be actionable and practical.
        
        Format as JSON with keys: analysis, improvements, patterns, performance, security
        
        Focus on:
        - Input validation and error handling
        - Performance optimizations
        - Code readability
        - Security considerations
        - Documentation
        
        Keep responses concise and actionable.
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
        
        Provide an improved version of the code with the key improvements implemented.
        Make the code better, more robust, and follow best practices.
        
        Format as JSON with keys: improved_code, comments, tests, benchmarks
        
        Focus on:
        - Error handling and input validation
        - Performance improvements
        - Documentation and type hints
        - Code readability
        - Security considerations
        
        Keep the improved code concise and practical.
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
        You are a Senior QA Engineer. Create tests for this code.
        
        Code:
        {code}
        
        Provide essential tests:
        1. Unit tests for main functions
        2. Edge case tests (null inputs, empty arrays)
        3. Error handling tests
        4. Basic performance considerations
        
        Format as JSON with keys: unit_tests, edge_cases, error_tests, performance_notes
        
        Keep tests concise and practical.
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
        
        Provide essential security analysis:
        1. Input validation issues
        2. Data exposure risks
        3. Authentication concerns
        4. Security best practices
        
        Format as JSON with keys: vulnerabilities, risk_level, fixes, best_practices
        
        Keep analysis concise and actionable.
        """
        
        response = self.model.generate_content(prompt)
        result = json.loads(response.text)
        
        self.add_to_memory({
            "input": input_data,
            "output": result,
            "timestamp": "2025-01-20T10:00:00Z"
        })
        
        return result 