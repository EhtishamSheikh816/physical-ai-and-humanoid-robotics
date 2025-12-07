import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';

const CodeExample = ({
  title = "Code Example",
  language = "python",
  code,
  description = "",
  expectedOutput = "",
  onRun = null,
  showRunButton = true,
  children
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);

  const handleRun = () => {
    if (onRun) {
      onRun();
    } else {
      // Default behavior: show expected output
      setOutput(expectedOutput);
      setShowOutput(true);
      setIsCompleted(true);
    }
  };

  const handleReset = () => {
    setOutput("");
    setShowOutput(false);
    setIsCompleted(false);
  };

  // If children is provided, use that as the code
  const codeToDisplay = children ? children : code;

  return (
    <div className="code-example-container">
      <div className="card margin-bottom--md">
        <div className="card__header">
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>
        <div className="card__body">
          <CodeBlock language={language}>
            {codeToDisplay}
          </CodeBlock>

          {expectedOutput && (
            <div className="margin-top--md">
              <details>
                <summary>Expected Output</summary>
                <CodeBlock language="text">
                  {expectedOutput}
                </CodeBlock>
              </details>
            </div>
          )}
        </div>

        <div className="card__footer">
          {showRunButton && (
            <div className="button-group button-group--block">
              <button
                className={`button button--${isCompleted ? 'success' : 'primary'}`}
                onClick={handleRun}
                disabled={isCompleted}
              >
                {isCompleted ? '✓ Completed' : 'Run Example'}
              </button>

              {isCompleted && (
                <button
                  className="button button--secondary"
                  onClick={handleReset}
                >
                  Reset
                </button>
              )}
            </div>
          )}

          {showOutput && output && (
            <div className="margin-top--sm">
              <h4>Output:</h4>
              <CodeBlock language="text">
                {output}
              </CodeBlock>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .code-example-container {
          margin: 1rem 0;
        }

        .button-group {
          display: flex;
          gap: 0.5rem;
        }

        .button-group button {
          flex: 1;
        }
      `}</style>
    </div>
  );
};

export default CodeExample;