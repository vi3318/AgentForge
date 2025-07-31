import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { Code, GitBranch, GitCommit, GitPullRequest, Layers, Network, Zap } from 'lucide-react';

interface CodeNode {
  id: string;
  name: string;
  type: 'function' | 'class' | 'variable' | 'import' | 'comment';
  line: number;
  dependencies: string[];
  complexity: number;
  color: string;
}

interface CodeFlow {
  nodes: CodeNode[];
  links: { source: string; target: string; type: string }[];
}

interface CodeVisualizerProps {
  code: string;
  className?: string;
}

export const CodeVisualizer: React.FC<CodeVisualizerProps> = ({ code, className = '' }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [visualizationType, setVisualizationType] = useState<'flow' | 'structure' | 'complexity'>('flow');
  const [parsedCode, setParsedCode] = useState<CodeFlow>({ nodes: [], links: [] });
  const [inputCode, setInputCode] = useState(code || '');

  // Parse code into nodes and relationships
  const parseCode = (codeString: string): CodeFlow => {
    const lines = codeString.split('\n');
    const nodes: CodeNode[] = [];
    const links: { source: string; target: string; type: string }[] = [];
    
    let nodeId = 0;
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      // Function detection
      if (trimmedLine.match(/^(function|const|let|var)\s+\w+/)) {
        const match = trimmedLine.match(/(?:function\s+)?(\w+)/);
        if (match) {
          const functionName = match[1];
          nodes.push({
            id: `node_${nodeId++}`,
            name: functionName,
            type: 'function',
            line: index + 1,
            dependencies: [],
            complexity: Math.floor(Math.random() * 5) + 1,
            color: '#3B82F6'
          });
        }
      }
      
      // Class detection
      if (trimmedLine.match(/^class\s+\w+/)) {
        const match = trimmedLine.match(/class\s+(\w+)/);
        if (match) {
          const className = match[1];
          nodes.push({
            id: `node_${nodeId++}`,
            name: className,
            type: 'class',
            line: index + 1,
            dependencies: [],
            complexity: Math.floor(Math.random() * 8) + 3,
            color: '#10B981'
          });
        }
      }
      
      // Variable detection
      if (trimmedLine.match(/^(const|let|var)\s+\w+/)) {
        const match = trimmedLine.match(/(?:const|let|var)\s+(\w+)/);
        if (match) {
          const varName = match[1];
          nodes.push({
            id: `node_${nodeId++}`,
            name: varName,
            type: 'variable',
            line: index + 1,
            dependencies: [],
            complexity: 1,
            color: '#F59E0B'
          });
        }
      }
      
      // Import detection
      if (trimmedLine.match(/^import\s+/)) {
        const match = trimmedLine.match(/from\s+['"]([^'"]+)['"]/);
        if (match) {
          const importName = match[1].split('/').pop() || 'import';
          nodes.push({
            id: `node_${nodeId++}`,
            name: importName,
            type: 'import',
            line: index + 1,
            dependencies: [],
            complexity: 1,
            color: '#8B5CF6'
          });
        }
      }
    });
    
    // Create some sample relationships
    nodes.forEach((node, index) => {
      if (index < nodes.length - 1) {
        links.push({
          source: node.id,
          target: nodes[index + 1].id,
          type: 'calls'
        });
      }
    });
    
    return { nodes, links };
  };

  useEffect(() => {
    if (code) {
      setInputCode(code);
      setParsedCode(parseCode(code));
    }
  }, [code]);

  useEffect(() => {
    if (!svgRef.current || parsedCode.nodes.length === 0) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create simulation
    const simulation = d3.forceSimulation(parsedCode.nodes)
      .force('link', d3.forceLink(parsedCode.links).id((d: any) => d.id).distance(100))
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create links
    const link = g.append('g')
      .selectAll('line')
      .data(parsedCode.links)
      .enter().append('line')
      .attr('stroke', '#666')
      .attr('stroke-width', 2)
      .attr('marker-end', 'url(#arrowhead)');

    // Create arrow marker
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 15)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', '#666');

    // Create nodes
    const node = g.append('g')
      .selectAll('g')
      .data(parsedCode.nodes)
      .enter().append('g')
      .call(d3.drag<any, CodeNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended));

    // Add circles to nodes
    node.append('circle')
      .attr('r', (d: CodeNode) => Math.max(8, d.complexity * 3))
      .attr('fill', (d: CodeNode) => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    // Add labels to nodes
    node.append('text')
      .text((d: CodeNode) => d.name)
      .attr('x', 12)
      .attr('dy', '.35em')
      .attr('fill', '#fff')
      .style('font-size', '12px');

    // Add type icons
    node.append('text')
      .attr('x', -8)
      .attr('y', -8)
      .attr('fill', '#fff')
      .style('font-size', '10px')
      .text((d: CodeNode) => {
        switch (d.type) {
          case 'function': return '⚡';
          case 'class': return '🏗️';
          case 'variable': return '📦';
          case 'import': return '📥';
          default: return '•';
        }
      });

    // Update positions on simulation tick
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);
    });

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: any, d: any) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [parsedCode, visualizationType]);

  const renderComplexityChart = () => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .domain(parsedCode.nodes.map(d => d.name))
      .range([0, width - margin.left - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(parsedCode.nodes, d => d.complexity) || 10])
      .range([height - margin.top - margin.bottom, 0]);

    // Add bars
    g.selectAll('rect')
      .data(parsedCode.nodes)
      .enter().append('rect')
      .attr('x', (d: CodeNode) => x(d.name) || 0)
      .attr('y', (d: CodeNode) => y(d.complexity))
      .attr('width', x.bandwidth())
      .attr('height', (d: CodeNode) => height - margin.top - margin.bottom - y(d.complexity))
      .attr('fill', (d: CodeNode) => d.color)
      .attr('rx', 4);

    // Add labels
    g.selectAll('text')
      .data(parsedCode.nodes)
      .enter().append('text')
      .text((d: CodeNode) => d.name)
      .attr('x', (d: CodeNode) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', height - margin.top - margin.bottom + 20)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-size', '10px');

    // Add complexity values
    g.selectAll('.complexity-value')
      .data(parsedCode.nodes)
      .enter().append('text')
      .attr('class', 'complexity-value')
      .text((d: CodeNode) => d.complexity)
      .attr('x', (d: CodeNode) => (x(d.name) || 0) + x.bandwidth() / 2)
      .attr('y', (d: CodeNode) => y(d.complexity) - 5)
      .attr('text-anchor', 'middle')
      .attr('fill', '#fff')
      .style('font-size', '12px')
      .style('font-weight', 'bold');
  };

  const renderStructureTree = () => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Create hierarchical structure
    const hierarchy = d3.stratify()
      .id((d: any) => d.id)
      .parentId((d: any) => d.parentId)
      (parsedCode.nodes.map((node, index) => ({
        ...node,
        parentId: index > 0 ? parsedCode.nodes[index - 1].id : null
      })));

    const tree = d3.tree().size([width - margin.left - margin.right, height - margin.top - margin.bottom]);
    const root = d3.hierarchy(hierarchy);
    tree(root);

    // Create links
    g.selectAll('path')
      .data(root.links())
      .enter().append('path')
      .attr('d', d3.linkHorizontal()
        .x((d: any) => d.y)
        .y((d: any) => d.x))
      .attr('fill', 'none')
      .attr('stroke', '#666')
      .attr('stroke-width', 2);

    // Create nodes
    const node = g.selectAll('g')
      .data(root.descendants())
      .enter().append('g')
      .attr('transform', (d: any) => `translate(${d.y},${d.x})`);

    node.append('circle')
      .attr('r', 6)
      .attr('fill', (d: any) => d.data.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2);

    node.append('text')
      .attr('dy', '.35em')
      .attr('x', (d: any) => d.children ? -8 : 8)
      .attr('text-anchor', (d: any) => d.children ? 'end' : 'start')
      .attr('fill', '#fff')
      .style('font-size', '10px')
      .text((d: any) => d.data.name);
  };

  useEffect(() => {
    if (visualizationType === 'complexity') {
      renderComplexityChart();
    } else if (visualizationType === 'structure') {
      renderStructureTree();
    }
  }, [visualizationType, parsedCode]);

  return (
    <div className={`agent-card rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-blue-400">Code Visualization</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setVisualizationType('flow')}
            className={`px-3 py-1 rounded text-sm ${
              visualizationType === 'flow' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            <Network className="w-4 h-4 inline mr-1" />
            Flow
          </button>
          <button
            onClick={() => setVisualizationType('structure')}
            className={`px-3 py-1 rounded text-sm ${
              visualizationType === 'structure' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            <GitBranch className="w-4 h-4 inline mr-1" />
            Structure
          </button>
          <button
            onClick={() => setVisualizationType('complexity')}
            className={`px-3 py-1 rounded text-sm ${
              visualizationType === 'complexity' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-600 text-gray-300'
            }`}
          >
            <Zap className="w-4 h-4 inline mr-1" />
            Complexity
          </button>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg p-4">
        {parsedCode.nodes.length === 0 ? (
          <div className="text-center text-gray-400 py-8">
            <Code className="w-12 h-12 mx-auto mb-4" />
            <p>Enter code to visualize structure and flow</p>
            <textarea
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setParsedCode(parseCode(e.target.value));
              }}
              placeholder="Paste your code here to visualize..."
              className="w-full h-32 mt-4 bg-gray-700 text-gray-200 p-3 rounded border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm"
            />
          </div>
        ) : (
          <div>
            <textarea
              value={inputCode}
              onChange={(e) => {
                setInputCode(e.target.value);
                setParsedCode(parseCode(e.target.value));
              }}
              placeholder="Paste your code here to visualize..."
              className="w-full h-20 mb-4 bg-gray-700 text-gray-200 p-3 rounded border border-gray-600 focus:border-blue-500 focus:outline-none font-mono text-sm"
            />
            <svg
              ref={svgRef}
              width="100%"
              height="400"
              className="w-full"
            />
          </div>
        )}
      </div>

      {parsedCode.nodes.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-300 mb-2">Code Elements</h4>
            <div className="space-y-1">
              {parsedCode.nodes.map(node => (
                <div key={node.id} className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: node.color }}
                  />
                  <span className="text-gray-400">{node.name}</span>
                  <span className="text-xs text-gray-500">({node.type})</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-300 mb-2">Statistics</h4>
            <div className="space-y-1 text-gray-400">
              <div>Functions: {parsedCode.nodes.filter(n => n.type === 'function').length}</div>
              <div>Classes: {parsedCode.nodes.filter(n => n.type === 'class').length}</div>
              <div>Variables: {parsedCode.nodes.filter(n => n.type === 'variable').length}</div>
              <div>Imports: {parsedCode.nodes.filter(n => n.type === 'import').length}</div>
              <div>Avg Complexity: {(parsedCode.nodes.reduce((sum, n) => sum + n.complexity, 0) / parsedCode.nodes.length).toFixed(1)}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}; 