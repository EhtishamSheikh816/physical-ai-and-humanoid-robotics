import React, { useState, useEffect } from 'react';
import CodeBlock from '@theme/CodeBlock';

// Advanced code example component with multiple language support and execution simulation
const AdvancedExample = ({
  title = "Advanced Code Example",
  description = "",
  expectedOutput = "",
  onRun = null,
  showRunButton = true,
  children,
  languages = [], // Array of language objects with name and code
  defaultLanguage = null,
  showTabs = true,
  executionEnvironments = [], // Available execution environments (e.g., 'ros2', 'unity', 'isaac-sim')
  selectedEnvironment = null,
  onEnvironmentChange = null,
  exampleId = null, // Unique ID for progress tracking
  chapterId = null // Chapter ID for progress tracking
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [output, setOutput] = useState("");
  const [showOutput, setShowOutput] = useState(false);
  const [selectedTab, setSelectedTab] = useState(defaultLanguage || (languages.length > 0 ? languages[0].name : 'python'));
  const [selectedEnv, setSelectedEnv] = useState(selectedEnvironment || (executionEnvironments.length > 0 ? executionEnvironments[0] : null));

  // Check if example is already completed in progress tracking
  useEffect(() => {
    if (chapterId && exampleId) {
      const savedProgress = localStorage.getItem(`progress_${chapterId}`);
      if (savedProgress) {
        const progressData = JSON.parse(savedProgress);
        if (progressData.codeExamplesCompleted && progressData.codeExamplesCompleted.includes(exampleId)) {
          setIsCompleted(true);
        }
      }
    }
  }, [chapterId, exampleId]);

  // If children is provided and no languages are specified, use children as the code
  const hasChildren = React.Children.count(children) > 0 && languages.length === 0;
  const currentCode = hasChildren ? children :
    languages.find(lang => lang.name === selectedTab)?.code || '';

  const handleRun = () => {
    if (onRun) {
      onRun();
    } else {
      // Default behavior: show expected output
      setOutput(expectedOutput);
      setShowOutput(true);
      if (!isCompleted) {
        setIsCompleted(true);
        // Update progress tracking if exampleId and chapterId are provided
        if (chapterId && exampleId) {
          const savedProgress = localStorage.getItem(`progress_${chapterId}`);
          let progressData = {};
          if (savedProgress) {
            progressData = JSON.parse(savedProgress);
          }

          // Add this example to completed examples if not already there
          if (!progressData.codeExamplesCompleted) {
            progressData.codeExamplesCompleted = [];
          }

          if (!progressData.codeExamplesCompleted.includes(exampleId)) {
            progressData.codeExamplesCompleted.push(exampleId);
            localStorage.setItem(`progress_${chapterId}`, JSON.stringify(progressData));
          }
        }
      }
    }
  };

  const handleReset = () => {
    setOutput("");
    setShowOutput(false);
    if (isCompleted) {
      setIsCompleted(false);
      // Remove from progress tracking if exampleId and chapterId are provided
      if (chapterId && exampleId) {
        const savedProgress = localStorage.getItem(`progress_${chapterId}`);
        if (savedProgress) {
          const progressData = JSON.parse(savedProgress);
          if (progressData.codeExamplesCompleted) {
            progressData.codeExamplesCompleted = progressData.codeExamplesCompleted.filter(id => id !== exampleId);
            localStorage.setItem(`progress_${chapterId}`, JSON.stringify(progressData));
          }
        }
      }
    }
  };

  const handleTabChange = (langName) => {
    setSelectedTab(langName);
  };

  const handleEnvironmentChange = (env) => {
    setSelectedEnv(env);
    if (onEnvironmentChange) {
      onEnvironmentChange(env);
    }
  };

  return (
    <div className="advanced-code-example-container">
      <div className="card margin-bottom--md">
        <div className="card__header">
          <h3>{title}</h3>
          {description && <p>{description}</p>}
        </div>

        <div className="card__body">
          {/* Environment selector */}
          {executionEnvironments.length > 0 && (
            <div className="environment-selector margin-bottom--sm">
              <label htmlFor="env-select">Execution Environment:</label>
              <select
                id="env-select"
                value={selectedEnv}
                onChange={(e) => handleEnvironmentChange(e.target.value)}
                className="env-select"
              >
                {executionEnvironments.map(env => (
                  <option key={env} value={env}>
                    {env.charAt(0).toUpperCase() + env.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Language tabs */}
          {showTabs && languages.length > 0 && (
            <div className="language-tabs">
              <div className="tabs">
                {languages.map((lang, index) => (
                  <button
                    key={index}
                    className={`tab ${selectedTab === lang.name ? 'tab--active' : ''}`}
                    onClick={() => handleTabChange(lang.name)}
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Code block */}
          <div className="code-block-container">
            <CodeBlock language={hasChildren ? 'jsx' : selectedTab}>
              {currentCode}
            </CodeBlock>
          </div>

          {/* Expected output */}
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

        {/* Action buttons */}
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
        </div>

        {/* Output display */}
        {showOutput && output && (
          <div className="output-container margin-top--sm">
            <h4>Output:</h4>
            <CodeBlock language="text">
              {output}
            </CodeBlock>
          </div>
        )}
      </div>

      <style jsx>{`
        .advanced-code-example-container {
          margin: 1rem 0;
        }

        .button-group {
          display: flex;
          gap: 0.5rem;
        }

        .button-group button {
          flex: 1;
        }

        .language-tabs {
          margin-bottom: 1rem;
        }

        .tabs {
          display: flex;
          border-bottom: 1px solid #ddd;
        }

        .tab {
          padding: 0.5rem 1rem;
          border: 1px solid #ddd;
          border-bottom: none;
          background: #f8f9fa;
          cursor: pointer;
          border-radius: 4px 4px 0 0;
          margin-right: 2px;
        }

        .tab:hover {
          background: #e9ecef;
        }

        .tab--active {
          background: #007cba;
          color: white;
          border-color: #007cba;
        }

        .environment-selector {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .env-select {
          padding: 0.25rem 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .output-container {
          padding: 1rem;
          background-color: #f8f9fa;
          border-radius: 4px;
          border-left: 3px solid #007cba;
        }

        .code-block-container {
          margin: 1rem 0;
        }
      `}</style>
    </div>
  );
};

// Specialized components for different frameworks
export const Ros2Example = (props) => (
  <AdvancedExample
    {...props}
    executionEnvironments={['ros2-humble', 'ros2-iron']}
    selectedEnvironment="ros2-humble"
  />
);

export const IsaacSimExample = (props) => (
  <AdvancedExample
    {...props}
    executionEnvironments={['isaac-sim-4.0', 'isaac-sim-4.1']}
    selectedEnvironment="isaac-sim-4.1"
  />
);

export const UnityExample = (props) => (
  <AdvancedExample
    {...props}
    languages={[
      { name: 'csharp', code: props.csharpCode || '' },
      { name: 'python', code: props.pythonCode || '' }
    ]}
    executionEnvironments={['unity-2022', 'unity-2023']}
    selectedEnvironment="unity-2023"
  />
);

export const VlaExample = (props) => (
  <AdvancedExample
    {...props}
    executionEnvironments={['pytorch', 'tensorflow', 'jax']}
    selectedEnvironment="pytorch"
  />
);

export default AdvancedExample;