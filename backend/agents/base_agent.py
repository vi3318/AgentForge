# backend/agents/base_agent.py
from abc import ABC, abstractmethod
import google.generativeai as genai
from typing import Dict, Any, List
import json

class BaseAgent(ABC):
    def __init__(self, name: str, role: str, model):
        self.name = name
        self.role = role
        self.model = model
        self.memory = []

    @abstractmethod
    async def process(self, input_data: Dict[str, Any]) -> Dict[str, Any]:
        pass

    def add_to_memory(self, data: Dict[str, Any]):
        self.memory.append(data)

    def get_memory_context(self) -> str:
        return json.dumps(self.memory[-5:])  # Last 5 interactions