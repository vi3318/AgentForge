#!/usr/bin/env python3
"""
Simple test script to verify AgentForge backend can start properly
"""

import os
import sys
import asyncio
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def test_imports():
    """Test if all required modules can be imported"""
    try:
        from workflow.agent_workflow import create_agent_forge_workflow
        from memory.memory_manager import MemoryManager
        from agents.code_agents import ArchitectAgent, ImplementationAgent, TestingAgent, SecurityAgent
        print("✅ All imports successful")
        return True
    except Exception as e:
        print(f"❌ Import error: {e}")
        return False

def test_workflow_creation():
    """Test if the workflow can be created"""
    try:
        from workflow.agent_workflow import create_agent_forge_workflow
        workflow = create_agent_forge_workflow()
        print("✅ Workflow creation successful")
        return True
    except Exception as e:
        print(f"❌ Workflow creation error: {e}")
        return False

def test_memory_manager():
    """Test if memory manager can be initialized"""
    try:
        from memory.memory_manager import MemoryManager
        memory = MemoryManager()
        print("✅ Memory manager initialization successful")
        return True
    except Exception as e:
        print(f"❌ Memory manager error: {e}")
        return False

def test_gemini_config():
    """Test if Gemini API is configured"""
    api_key = os.getenv("GEMINI_API_KEY")
    if api_key:
        print("✅ Gemini API key found")
        return True
    else:
        print("❌ Gemini API key not found in .env file")
        return False

async def test_simple_workflow():
    """Test a simple workflow execution"""
    try:
        from workflow.agent_workflow import create_agent_forge_workflow
        
        workflow = create_agent_forge_workflow()
        
        # Create test state
        test_state = {
            "codebase": "function test() { return 'hello'; }",
            "current_task": "Improve this function",
            "agent_outputs": [],
            "memory_context": {},
            "improvement_suggestions": [],
            "final_result": {}
        }
        
        # Run workflow
        result = await workflow.ainvoke(test_state)
        
        print("✅ Simple workflow execution successful")
        print(f"   - Processed {len(result['agent_outputs'])} agents")
        return True
        
    except Exception as e:
        print(f"❌ Workflow execution error: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 Testing AgentForge Backend...")
    print("=" * 50)
    
    tests = [
        ("Import Test", test_imports),
        ("Gemini Config Test", test_gemini_config),
        ("Memory Manager Test", test_memory_manager),
        ("Workflow Creation Test", test_workflow_creation),
    ]
    
    passed = 0
    total = len(tests)
    
    for test_name, test_func in tests:
        print(f"\n🔍 Running {test_name}...")
        if test_func():
            passed += 1
        else:
            print(f"   ❌ {test_name} failed")
    
    # Run async test
    print(f"\n🔍 Running Workflow Execution Test...")
    try:
        asyncio.run(test_simple_workflow())
        passed += 1
        total += 1
    except Exception as e:
        print(f"   ❌ Workflow execution failed: {e}")
    
    print("\n" + "=" * 50)
    print(f"📊 Test Results: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend is ready to run.")
        print("\n🚀 To start the server, run:")
        print("   uvicorn main:app --reload --port 8000")
    else:
        print("❌ Some tests failed. Please check the errors above.")
        sys.exit(1)

if __name__ == "__main__":
    main() 