import json
from typing import List, Dict, Any
import hashlib

class MemoryManager:
    def __init__(self):
        try:
            import chromadb
            # Use the new ChromaDB client configuration
            self.client = chromadb.PersistentClient(path="./chroma_db")
            self.use_chroma = True
        except Exception as e:
            print(f"Warning: ChromaDB not available, using in-memory storage: {e}")
            self.use_chroma = False
            self.memory_store = {
                "code_patterns": [],
                "agent_interactions": [],
                "improvements": []
            }
        
        # Create collections for different types of memory
        if self.use_chroma:
            try:
                # Try to get existing collections or create new ones
                try:
                    self.code_collection = self.client.get_collection("code_patterns")
                except:
                    self.code_collection = self.client.create_collection("code_patterns")
                
                try:
                    self.agent_collection = self.client.get_collection("agent_interactions")
                except:
                    self.agent_collection = self.client.create_collection("agent_interactions")
                
                try:
                    self.improvement_collection = self.client.get_collection("improvements")
                except:
                    self.improvement_collection = self.client.create_collection("improvements")
                    
            except Exception as e:
                print(f"Warning: Could not create ChromaDB collections: {e}")
                self.use_chroma = False
                self.memory_store = {
                    "code_patterns": [],
                    "agent_interactions": [],
                    "improvements": []
                }
    
    def store_code_pattern(self, code: str, pattern_type: str, metadata: Dict[str, Any]):
        """Store code patterns for future reference"""
        code_hash = hashlib.md5(code.encode()).hexdigest()
        
        if self.use_chroma:
            try:
                self.code_collection.add(
                    documents=[code],
                    metadatas=[{
                        "pattern_type": pattern_type,
                        "hash": code_hash,
                        **metadata
                    }],
                    ids=[code_hash]
                )
            except Exception as e:
                print(f"Warning: Could not store in ChromaDB: {e}")
        else:
            # Fallback to in-memory storage
            self.memory_store["code_patterns"].append({
                "code": code,
                "metadata": {
                    "pattern_type": pattern_type,
                    "hash": code_hash,
                    **metadata
                }
            })
    
    def store_agent_interaction(self, agent_name: str, input_data: Dict, output_data: Dict):
        """Store agent interactions for learning"""
        interaction_id = f"{agent_name}_{hash(str(input_data))}"
        
        if self.use_chroma:
            try:
                self.agent_collection.add(
                    documents=[json.dumps(output_data)],
                    metadatas=[{
                        "agent": agent_name,
                        "input": json.dumps(input_data),
                        "timestamp": "2025-01-20T10:00:00Z"
                    }],
                    ids=[interaction_id]
                )
            except Exception as e:
                print(f"Warning: Could not store in ChromaDB: {e}")
        else:
            # Fallback to in-memory storage
            self.memory_store["agent_interactions"].append({
                "output": output_data,
                "metadata": {
                    "agent": agent_name,
                    "input": input_data,
                    "timestamp": "2025-01-20T10:00:00Z"
                }
            })
    
    def find_similar_patterns(self, code: str, n_results: int = 5) -> List[Dict]:
        """Find similar code patterns from memory"""
        if self.use_chroma:
            try:
                results = self.code_collection.query(
                    query_texts=[code],
                    n_results=n_results
                )
                
                return [
                    {
                        "code": doc,
                        "metadata": metadata,
                        "distance": distance
                    }
                    for doc, metadata, distance in zip(
                        results["documents"][0],
                        results["metadatas"][0],
                        results["distances"][0]
                    )
                ]
            except Exception as e:
                print(f"Warning: Could not query ChromaDB: {e}")
                return []
        else:
            # Fallback to in-memory search
            return self.memory_store["code_patterns"][:n_results]
    
    def get_agent_history(self, agent_name: str, limit: int = 10) -> List[Dict]:
        """Get recent history for a specific agent"""
        if self.use_chroma:
            try:
                results = self.agent_collection.get(
                    where={"agent": agent_name},
                    limit=limit
                )
                
                return [
                    {
                        "output": json.loads(doc),
                        "metadata": metadata
                    }
                    for doc, metadata in zip(results["documents"], results["metadatas"])
                ]
            except Exception as e:
                print(f"Warning: Could not query ChromaDB: {e}")
                return []
        else:
            # Fallback to in-memory search
            return [
                item for item in self.memory_store["agent_interactions"]
                if item["metadata"]["agent"] == agent_name
            ][:limit] 