import React, { useState } from 'react';

const Details = ({ children, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Find the summary element within children
  let summaryElement = null;
  let contentElements = [];

  React.Children.forEach(children, (child) => {
    if (child && child.type === 'summary') {
      summaryElement = child;
    } else if (child) {
      contentElements.push(child);
    }
  });

  return (
    <details
      open={isOpen}
      onToggle={(e) => {
        setIsOpen(e.target.open);
        if (props.onToggle) {
          props.onToggle(e);
        }
      }}
      style={{
        border: '1px solid #ddd',
        borderRadius: '4px',
        padding: '1rem',
        margin: '1rem 0',
        backgroundColor: 'var(--ifm-color-emphasis-100)'
      }}
    >
      {summaryElement && (
        <summary
          onClick={toggleOpen}
          style={{
            cursor: 'pointer',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            userSelect: 'none'
          }}
        >
          {summaryElement.props.children}
        </summary>
      )}
      <div style={{ marginTop: '0.5rem' }}>
        {contentElements}
      </div>
    </details>
  );
};

export default Details;