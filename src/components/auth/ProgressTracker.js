import React, { useState, useEffect } from 'react';

// Simple progress tracking using localStorage for the static site
// In a real implementation, this would connect to the GitHub Gists API

const ProgressTracker = ({ chapterId, chapterTitle, userId, projectSections = null, showDeveloperOptions = false }) => {
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);
  const [notes, setNotes] = useState('');
  const [codeExamplesCompleted, setCodeExamplesCompleted] = useState([]);
  const [projectSectionsState, setProjectSectionsState] = useState(projectSections || []);
  const [developerMode, setDeveloperMode] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // 'beginner', 'intermediate', 'advanced', 'all'

  // Load progress from localStorage on component mount
  useEffect(() => {
    const savedProgress = localStorage.getItem(`progress_${chapterId}`);
    if (savedProgress) {
      const progressData = JSON.parse(savedProgress);
      setProgress(progressData.progress || 0);
      setIsCompleted(progressData.completed || false);
      setTimeSpent(progressData.timeSpent || 0);
      setNotes(progressData.notes || '');
      setCodeExamplesCompleted(progressData.codeExamplesCompleted || []);

      // Load project sections if they exist in saved data
      if (progressData.projectSections) {
        setProjectSectionsState(progressData.projectSections);
      } else if (projectSections) {
        setProjectSectionsState(projectSections);
      }

      // Load developer mode setting if available
      if (progressData.developerMode !== undefined) {
        setDeveloperMode(progressData.developerMode);
      }
      if (progressData.difficultyFilter) {
        setDifficultyFilter(progressData.difficultyFilter);
      }
    } else if (projectSections) {
      setProjectSectionsState(projectSections);
    }
  }, [chapterId, projectSections]);

  // Track time spent separately
  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const currentTimeSpent = Math.floor((Date.now() - startTime) / 1000);
      setTimeSpent(currentTimeSpent);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    const progressData = {
      progress,
      completed: isCompleted,
      timeSpent,
      notes,
      codeExamplesCompleted,
      projectSections: projectSectionsState,
      developerMode,
      difficultyFilter,
      lastUpdated: new Date().toISOString()
    };

    localStorage.setItem(`progress_${chapterId}`, JSON.stringify(progressData));
  }, [progress, isCompleted, timeSpent, notes, codeExamplesCompleted, projectSectionsState, developerMode, difficultyFilter, chapterId]);

  const handleProgressChange = (newProgress) => {
    const clampedProgress = Math.min(100, Math.max(0, newProgress));
    setProgress(clampedProgress);
    setIsCompleted(clampedProgress === 100);
  };

  const handleMarkComplete = () => {
    setProgress(100);
    setIsCompleted(true);
  };

  const handleNoteChange = (e) => {
    setNotes(e.target.value);
  };

  const handleCodeExampleComplete = (exampleId) => {
    if (!codeExamplesCompleted.includes(exampleId)) {
      setCodeExamplesCompleted([...codeExamplesCompleted, exampleId]);
    }
  };

  const handleCodeExampleReset = (exampleId) => {
    setCodeExamplesCompleted(codeExamplesCompleted.filter(id => id !== exampleId));
  };

  const handleProjectSectionToggle = (sectionId) => {
    setProjectSectionsState(prevSections =>
      prevSections.map(section =>
        section.id === sectionId
          ? { ...section, completed: !section.completed }
          : section
      )
    );
  };

  const toggleDeveloperMode = () => {
    setDeveloperMode(!developerMode);
  };

  const handleDifficultyFilterChange = (filter) => {
    setDifficultyFilter(filter);
  };

  return (
    <div className="progress-tracker">
      <div className="card">
        <div className="card__header">
          <h3>Chapter Progress: {chapterTitle || chapterId}</h3>
        </div>
        <div className="card__body">
          <div className="margin-bottom--md">
            <label htmlFor={`progress-${chapterId}`}>
              Progress: {progress}%
            </label>
            <input
              id={`progress-${chapterId}`}
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => handleProgressChange(parseInt(e.target.value))}
              className="progress-slider"
              style={{ width: '100%' }}
            />
            <div className="progress-text">
              <span>{progress}% completed</span>
              {!isCompleted && (
                <button
                  onClick={handleMarkComplete}
                  className="button button--sm button--primary"
                  style={{ marginLeft: '10px' }}
                >
                  Mark Complete
                </button>
              )}
              {isCompleted && (
                <span style={{ marginLeft: '10px', color: 'green' }}>✓ Completed</span>
              )}
            </div>
          </div>

          <div className="margin-bottom--md">
            <label htmlFor={`notes-${chapterId}`}>
              Notes:
            </label>
            <textarea
              id={`notes-${chapterId}`}
              value={notes}
              onChange={handleNoteChange}
              placeholder="Add your notes about this chapter..."
              rows="3"
              style={{ width: '100%', marginTop: '5px' }}
            />
          </div>

          <div className="margin-bottom--md">
            <p><strong>Time Spent:</strong> {Math.floor(timeSpent / 60)}m {timeSpent % 60}s</p>
          </div>

          <div>
            <p><strong>Code Examples Completed:</strong> {codeExamplesCompleted.length} of ?</p>
            {codeExamplesCompleted.length > 0 && (
              <ul>
                {codeExamplesCompleted.map((exampleId, index) => (
                  <li key={index}>
                    {exampleId}
                    <button
                      onClick={() => handleCodeExampleReset(exampleId)}
                      className="button button--sm button--secondary"
                      style={{ marginLeft: '5px' }}
                    >
                      Reset
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Project sections for capstone projects */}
          {projectSectionsState.length > 0 && (
            <div className="margin-top--md">
              <h4>Project Sections:</h4>
              <div className="project-sections">
                {projectSectionsState.map((section, index) => (
                  <div key={section.id} className="project-section-item">
                    <label>
                      <input
                        type="checkbox"
                        checked={section.completed}
                        onChange={() => handleProjectSectionToggle(section.id)}
                        style={{ marginRight: '8px' }}
                      />
                      <strong>{section.title}</strong>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Developer options - only show if enabled */}
          {showDeveloperOptions && (
            <div className="developer-options margin-top--md">
              <div className="card">
                <div className="card__header">
                  <h4>Developer Options</h4>
                </div>
                <div className="card__body">
                  <div className="developer-controls">
                    <div className="form-group">
                      <label>
                        <input
                          type="checkbox"
                          checked={developerMode}
                          onChange={toggleDeveloperMode}
                          style={{ marginRight: '8px' }}
                        />
                        <strong>Developer Mode</strong>
                      </label>
                      <p className="help-text">Enable advanced features and detailed debugging information</p>
                    </div>

                    <div className="form-group margin-top--sm">
                      <label htmlFor="difficulty-filter"><strong>Content Difficulty Filter:</strong></label>
                      <select
                        id="difficulty-filter"
                        value={difficultyFilter}
                        onChange={(e) => handleDifficultyFilterChange(e.target.value)}
                        className="form-control"
                      >
                        <option value="all">All Content</option>
                        <option value="beginner">Beginner Only</option>
                        <option value="intermediate">Intermediate+</option>
                        <option value="advanced">Advanced Only</option>
                      </select>
                      <p className="help-text">Filter content based on difficulty level</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <style jsx>{`
            .developer-options {
              border: 2px solid #007cba;
              border-radius: 4px;
            }

            .developer-controls {
              padding: 10px 0;
            }

            .form-group {
              margin-bottom: 15px;
            }

            .form-control {
              width: 100%;
              padding: 8px 12px;
              border: 1px solid #ccc;
              border-radius: 4px;
              margin-top: 5px;
            }

            .help-text {
              font-size: 0.85em;
              color: #666;
              margin: 5px 0 0 0;
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;