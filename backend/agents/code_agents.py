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
        
        Example improvements:
        - "Add input validation for empty arrays"
        - "Use Math.max() instead of manual comparison"
        - "Add early return for edge cases"
        - "Consider using reduce() for cleaner code"
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
        
        The improved_code should be the actual enhanced version of the original code.
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
        
        Provide:
        1. Unit tests
        2. Integration tests
        3. Edge case tests
        4. Performance tests
        5. Test coverage analysis
        
        Format as JSON with keys: unit_tests, integration_tests, edge_cases, performance_tests, coverage
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
        
        Provide:
        1. Security vulnerabilities found
        2. Risk assessment
        3. Security fixes
        4. Best practices recommendations
        5. Compliance checks
        
        Format as JSON with keys: vulnerabilities, risk_assessment, fixes, best_practices, compliance
        """
        
        response = self.model.generate_content(prompt)
        result = json.loads(response.text)
        
        self.add_to_memory({
            "input": input_data,
            "output": result,
            "timestamp": "2025-01-20T10:00:00Z"
        })
        
        return result 