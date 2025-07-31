import json
import os
from typing import Dict, List, Any, Optional
from datetime import datetime

class MemoryManager:
    def __init__(self):
        """Initialize memory manager with in-memory storage only"""
        self.memory_store = {
            "code_patterns": [],
            "agent_interactions": [],
            "improvements": []
        }
        self.use_chroma = False
        print("Using in-memory storage for deployment")
    
    def store_code_pattern(self, code: str, pattern_type: str, metadata: Dict[str, Any]) -> None:
        """Store a code pattern in memory"""
        pattern = {
            "code": code,
            "type": pattern_type,
            "metadata": metadata,
            "timestamp": datetime.now().isoformat()
        }
        self.memory_store["code_patterns"].append(pattern)
        
        # Keep only last 100 patterns to prevent memory bloat
        if len(self.memory_store["code_patterns"]) > 100:
            self.memory_store["code_patterns"] = self.memory_store["code_patterns"][-100:]
    
    def store_agent_interaction(self, agent_name: str, context: Dict[str, Any], output: Dict[str, Any]) -> None:
        """Store an agent interaction in memory"""
        interaction = {
            "agent": agent_name,
            "context": context,
            "output": output,
            "timestamp": datetime.now().isoformat()
        }
        self.memory_store["agent_interactions"].append(interaction)
        
        # Keep only last 200 interactions
        if len(self.memory_store["agent_interactions"]) > 200:
            self.memory_store["agent_interactions"] = self.memory_store["agent_interactions"][-200:]
    
    def find_similar_patterns(self, code: str, limit: int = 5) -> List[Dict[str, Any]]:
        """Find similar code patterns using simple text matching"""
        similar_patterns = []
        
        for pattern in self.memory_store["code_patterns"]:
            # Simple similarity check based on function/class names
            code_lower = code.lower()
            pattern_lower = pattern["code"].lower()
            
            # Check for common keywords
            common_keywords = ["function", "class", "def", "const", "let", "var", "import", "export"]
            similarity_score = 0
            
            for keyword in common_keywords:
                if keyword in code_lower and keyword in pattern_lower:
                    similarity_score += 1
            
            if similarity_score > 0:
                similar_patterns.append({
                    "pattern": pattern,
                    "similarity": similarity_score
                })
        
        # Sort by similarity and return top matches
        similar_patterns.sort(key=lambda x: x["similarity"], reverse=True)
        return [p["pattern"] for p in similar_patterns[:limit]]
    
    def get_agent_history(self, agent_name: str, user_id: Optional[str] = None) -> List[Dict[str, Any]]:
        """Get interaction history for a specific agent"""
        history = []
        
        for interaction in self.memory_store["agent_interactions"]:
            if interaction["agent"] == agent_name:
                # Filter by user_id if provided
                if user_id is None or interaction["context"].get("userId") == user_id:
                    history.append(interaction)
        
        return history[-50:]  # Return last 50 interactions
    
    def get_memory_stats(self) -> Dict[str, Any]:
        """Get memory statistics"""
        return {
            "total_patterns": len(self.memory_store["code_patterns"]),
            "total_interactions": len(self.memory_store["agent_interactions"]),
            "total_improvements": len(self.memory_store["improvements"]),
            "storage_type": "in-memory"
        }
    
    def clear_memory(self) -> None:
        """Clear all memory (useful for testing)"""
        self.memory_store = {
            "code_patterns": [],
            "agent_interactions": [],
            "improvements": []
        } 