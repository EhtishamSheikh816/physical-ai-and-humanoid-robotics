import React, { useEffect, useRef } from 'react';

const D3Diagram = ({ data, type = 'bar', className = '' }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const renderDiagram = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Dynamically import D3
          const d3 = await import('d3');

          // Clear the SVG
          d3.default.select(svgRef.current).selectAll('*').remove();

          const margin = { top: 20, right: 30, bottom: 40, left: 40 };
          const width = 600 - margin.left - margin.right;
          const height = 400 - margin.top - margin.bottom;

          // Create SVG container
          const svg = d3.default.select(svgRef.current)
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

          const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

          // Different chart types
          switch (type) {
            case 'bar':
              renderBarChart(d3.default, g, data, width, height);
              break;
            case 'line':
              renderLineChart(d3.default, g, data, width, height);
              break;
            case 'scatter':
              renderScatterPlot(d3.default, g, data, width, height);
              break;
            default:
              renderBarChart(d3.default, g, data, width, height);
          }
        } catch (error) {
          console.error('Error rendering D3 diagram:', error);

          // Fallback: show error message
          if (svgRef.current) {
            svgRef.current.innerHTML = `
              <text x="50%" y="50%" text-anchor="middle" dominant-baseline="middle">
                D3 diagram failed to render
              </text>
            `;
          }
        }
      }
    };

    const renderBarChart = (d3, g, data, width, height) => {
      // Set up scales
      const x = d3.scaleBand()
        .domain(data.map(d => d.label))
        .range([0, width])
        .padding(0.1);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .nice()
        .range([height, 0]);

      // Create bars
      g.selectAll('.bar')
        .data(data)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.label))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => height - y(d.value))
        .attr('fill', '#4a90e2');

      // Add axes
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append('g')
        .call(d3.axisLeft(y));
    };

    const renderLineChart = (d3, g, data, width, height) => {
      // Set up scales
      const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .range([height, 0]);

      // Create line
      const line = d3.line()
        .x(d => x(d.x))
        .y(d => y(d.y))
        .curve(d3.curveMonotoneX);

      g.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', '#4a90e2')
        .attr('stroke-width', 2)
        .attr('d', line);

      // Add axes
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append('g')
        .call(d3.axisLeft(y));
    };

    const renderScatterPlot = (d3, g, data, width, height) => {
      // Set up scales
      const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x))
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d.y))
        .range([height, 0]);

      // Create points
      g.selectAll('.dot')
        .data(data)
        .enter().append('circle')
        .attr('class', 'dot')
        .attr('cx', d => x(d.x))
        .attr('cy', d => y(d.y))
        .attr('r', 5)
        .attr('fill', '#4a90e2');

      // Add axes
      g.append('g')
        .attr('transform', `translate(0,${height})`)
        .call(d3.axisBottom(x));

      g.append('g')
        .call(d3.axisLeft(y));
    };

    renderDiagram();
  }, [data, type]);

  return (
    <div className={`d3-diagram ${className}`} style={{ textAlign: 'center' }}>
      <svg ref={svgRef} style={{ maxWidth: '100%', height: 'auto' }} />
    </div>
  );
};

export default D3Diagram;