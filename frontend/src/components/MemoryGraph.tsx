import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Brain, Network } from 'lucide-react';

interface MemoryGraphProps {}

export const MemoryGraph: React.FC<MemoryGraphProps> = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    const width = 300;
    const height = 200;

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Create sample data for visualization with more realistic connections
    const data = [
      { 
        agent: 'Architect', 
        connections: 12, 
        strength: 0.8,
        color: '#3B82F6',
        description: 'Code patterns & architecture'
      },
      { 
        agent: 'Implementer', 
        connections: 15, 
        strength: 0.9,
        color: '#10B981',
        description: 'Implementation patterns'
      },
      { 
        agent: 'Tester', 
        connections: 8, 
        strength: 0.7,
        color: '#F59E0B',
        description: 'Test patterns & coverage'
      },
      { 
        agent: 'Security', 
        connections: 6, 
        strength: 0.6,
        color: '#EF4444',
        description: 'Security patterns & vulnerabilities'
      }
    ];

    // Create force simulation
    const simulation = d3.forceSimulation(data)
      .force('link', d3.forceLink().id((d: any) => d.agent))
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2));

    // Create nodes
    const nodes = svg.selectAll('.node')
      .data(data)
      .enter().append('circle')
      .attr('class', 'node')
      .attr('r', (d: any) => d.connections * 2)
      .attr('fill', (d: any) => d.color)
      .attr('opacity', 0.8)
      .on('mouseover', function(event, d) {
        d3.select(this).attr('opacity', 1).attr('r', d.connections * 2.5);
      })
      .on('mouseout', function(event, d) {
        d3.select(this).attr('opacity', 0.8).attr('r', d.connections * 2);
      });

    // Add labels
    const labels = svg.selectAll('.label')
      .data(data)
      .enter().append('text')
      .attr('class', 'label')
      .text((d: any) => d.agent)
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .attr('fill', 'white')
      .attr('font-size', '10px');

    // Update positions on simulation tick
    simulation.on('tick', () => {
      nodes
        .attr('cx', (d: any) => d.x)
        .attr('cy', (d: any) => d.y);

      labels
        .attr('x', (d: any) => d.x)
        .attr('y', (d: any) => d.y);
    });

    // Add drag behavior
    nodes.call(d3.drag<any, any>()
      .on('start', dragstarted)
      .on('drag', dragged)
      .on('end', dragended));

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
  }, []);

  return (
    <div className="agent-card rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-blue-400">Memory Network</h2>
        <div className="flex items-center space-x-2">
          <Brain className="w-4 h-4 text-purple-400" />
          <Network className="w-4 h-4 text-blue-400" />
        </div>
      </div>
      
      <div className="flex justify-center">
        <svg ref={svgRef} className="border border-gray-600 rounded-lg"></svg>
      </div>
      
      <div className="mt-4 text-center text-sm text-gray-400">
        <p>Agent memory connections and learning patterns</p>
        <p className="text-xs mt-1">Hover over nodes to see details • Drag to explore</p>
        <div className="mt-2 text-xs text-gray-500">
          <p>💡 <strong>What is Memory Network?</strong></p>
          <p>This shows how your AI agents learn and remember:</p>
          <ul className="text-left mt-1 space-y-1">
            <li>• <strong>Code Patterns:</strong> Common structures they've seen</li>
            <li>• <strong>Agent Interactions:</strong> How they work together</li>
            <li>• <strong>Learning History:</strong> Past improvements & decisions</li>
            <li>• <strong>Personalization:</strong> Adapts to your coding style</li>
          </ul>
        </div>
      </div>
    </div>
  );
}; 