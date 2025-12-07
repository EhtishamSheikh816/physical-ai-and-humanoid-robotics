import React, { useEffect, useRef } from 'react';

const MermaidDiagram = ({ chart, className = '' }) => {
  const containerRef = useRef(null);
  const diagramId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (typeof window !== 'undefined') {
        try {
          // Dynamically import mermaid
          const mermaid = await import('mermaid');

          // Initialize mermaid
          mermaid.default.initialize({
            startOnLoad: false,
            theme: 'default',
            securityLevel: 'loose',
            fontFamily: 'inherit',
          });

          // Clear the container
          if (containerRef.current) {
            containerRef.current.innerHTML = '';

            // Render the diagram
            const { svg, bindFunctions } = await mermaid.default.render(
              diagramId.current,
              chart,
              containerRef.current
            );

            // Bind any event functions if needed
            if (bindFunctions) {
              bindFunctions(containerRef.current);
            }
          }
        } catch (error) {
          console.error('Error rendering Mermaid diagram:', error);

          // Fallback: show the diagram code as text if mermaid fails
          if (containerRef.current) {
            containerRef.current.innerHTML = `
              <pre class="mermaid-error">${chart}</pre>
              <p class="mermaid-error-text">Diagram failed to render. Showing source code instead.</p>
            `;
          }
        }
      }
    };

    renderDiagram();
  }, [chart]);

  return (
    <div
      ref={containerRef}
      className={`mermaid-diagram ${className}`}
      style={{
        textAlign: 'center',
        margin: '1rem 0',
        overflowX: 'auto'
      }}
    />
  );
};

export default MermaidDiagram;