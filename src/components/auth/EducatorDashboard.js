import React, { useState, useEffect } from 'react';
import { useAuth } from '@site/src/components/auth/ProgressTracker';

// Educator dashboard component with curriculum planning features
const EducatorDashboard = () => {
  const { user, loading } = useAuth();
  const [curriculumPlan, setCurriculumPlan] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedChapter, setSelectedChapter] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');

  // Load curriculum plan and assignments from localStorage
  useEffect(() => {
    const savedPlan = localStorage.getItem('curriculum_plan');
    if (savedPlan) {
      setCurriculumPlan(JSON.parse(savedPlan));
    }

    const savedAssignments = localStorage.getItem('educator_assignments');
    if (savedAssignments) {
      setAssignments(JSON.parse(savedAssignments));
    }
  }, []);

  // Save curriculum plan to localStorage
  useEffect(() => {
    localStorage.setItem('curriculum_plan', JSON.stringify(curriculumPlan));
  }, [curriculumPlan]);

  // Save assignments to localStorage
  useEffect(() => {
    localStorage.setItem('educator_assignments', JSON.stringify(assignments));
  }, [assignments]);

  const addChapterToPlan = () => {
    if (selectedChapter) {
      const newPlanItem = {
        id: Date.now(),
        chapterId: selectedChapter,
        title: getChapterTitle(selectedChapter),
        order: curriculumPlan.length,
        estimatedTime: '2-3 hours',
        objectives: [],
        assignments: []
      };
      setCurriculumPlan([...curriculumPlan, newPlanItem]);
      setSelectedChapter('');
    }
  };

  const addAssignmentToChapter = (chapterId) => {
    const chapter = curriculumPlan.find(item => item.chapterId === chapterId);
    if (chapter && assignmentTitle && assignmentDescription) {
      const newAssignment = {
        id: Date.now(),
        title: assignmentTitle,
        description: assignmentDescription,
        dueDate: new Date().toISOString(),
        createdDate: new Date().toISOString(),
        status: 'active'
      };

      const updatedPlan = curriculumPlan.map(item => {
        if (item.chapterId === chapterId) {
          return {
            ...item,
            assignments: [...item.assignments, newAssignment]
          };
        }
        return item;
      });

      setCurriculumPlan(updatedPlan);
      setAssignmentTitle('');
      setAssignmentDescription('');
      setSelectedChapter(chapterId); // Keep the chapter selected for more assignments
    }
  };

  const removeAssignmentFromChapter = (chapterId, assignmentId) => {
    const updatedPlan = curriculumPlan.map(item => {
      if (item.chapterId === chapterId) {
        return {
          ...item,
          assignments: item.assignments.filter(assignment => assignment.id !== assignmentId)
        };
      }
      return item;
    });

    setCurriculumPlan(updatedPlan);
  };

  const removeChapterFromPlan = (id) => {
    setCurriculumPlan(curriculumPlan.filter(item => item.id !== id));
  };

  const addAssignment = () => {
    if (assignmentTitle && assignmentDescription) {
      const newAssignment = {
        id: Date.now(),
        title: assignmentTitle,
        description: assignmentDescription,
        dueDate: new Date().toISOString(),
        chapterId: selectedChapter,
        createdDate: new Date().toISOString()
      };
      setAssignments([...assignments, newAssignment]);
      setAssignmentTitle('');
      setAssignmentDescription('');
    }
  };

  const getChapterTitle = (chapterId) => {
    const chapterTitles = {
      'ros2-fundamentals': 'ROS 2 Fundamentals',
      'gazebo-simulation': 'Gazebo Simulation',
      'unity-integration': 'Unity Integration',
      'isaac-sim': 'Isaac Sim',
      'vla-models': 'VLA Models',
      'capstone-project': 'Capstone Project'
    };
    return chapterTitles[chapterId] || chapterId;
  };

  // Get available chapters for assignment
  const availableChapters = [
    'ros2-fundamentals',
    'gazebo-simulation',
    'unity-integration',
    'isaac-sim',
    'vla-models',
    'capstone-project'
  ];

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  if (!user) {
    return <div>Please log in to access the educator dashboard.</div>;
  }

  return (
    <div className="educator-dashboard">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h1>Educator Dashboard</h1>
            <p>Welcome, {user.name || user.login || 'Educator'}! Plan your curriculum and create assignments for your students.</p>
          </div>
        </div>

        <div className="row margin-top--lg">
          {/* Curriculum Planning Section */}
          <div className="col col--6">
            <div className="card">
              <div className="card__header">
                <h3>Curriculum Planning</h3>
              </div>
              <div className="card__body">
                <div className="margin-bottom--md">
                  <label htmlFor="chapter-select">Add Chapter to Curriculum:</label>
                  <select
                    id="chapter-select"
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select a chapter...</option>
                    {availableChapters.map(chapterId => (
                      <option key={chapterId} value={chapterId}>
                        {getChapterTitle(chapterId)}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={addChapterToPlan}
                    className="button button--primary margin-left--sm"
                    disabled={!selectedChapter}
                  >
                    Add to Plan
                  </button>
                </div>

                <div>
                  <h4>Curriculum Plan ({curriculumPlan.length} chapters)</h4>
                  {curriculumPlan.length === 0 ? (
                    <p>No chapters added to curriculum yet.</p>
                  ) : (
                    <ul className="curriculum-list">
                      {curriculumPlan.map((item, index) => (
                        <li key={item.id} className="curriculum-item">
                          <div className="curriculum-item-header">
                            <span className="curriculum-order">#{index + 1}</span>
                            <span className="curriculum-title">{item.title}</span>
                            <button
                              onClick={() => removeChapterFromPlan(item.id)}
                              className="button button--sm button--danger"
                            >
                              Remove
                            </button>
                          </div>
                          <div className="curriculum-details">
                            <small>Estimated Time: {item.estimatedTime}</small>

                            {/* Assignment creation for this chapter */}
                            <div className="chapter-assignments margin-top--sm">
                              <h5>Assignments for this chapter:</h5>
                              <div className="assignment-input-group">
                                <input
                                  type="text"
                                  value={assignmentTitle}
                                  onChange={(e) => setAssignmentTitle(e.target.value)}
                                  placeholder="Assignment title..."
                                  className="form-control form-control-sm"
                                />
                                <textarea
                                  value={assignmentDescription}
                                  onChange={(e) => setAssignmentDescription(e.target.value)}
                                  placeholder="Assignment description..."
                                  rows="2"
                                  className="form-control form-control-sm margin-top--sm"
                                />
                                <button
                                  onClick={() => addAssignmentToChapter(item.chapterId)}
                                  className="button button--sm button--primary margin-top--sm"
                                  disabled={!assignmentTitle || !assignmentDescription}
                                >
                                  Add Assignment
                                </button>
                              </div>

                              {/* List of assignments for this chapter */}
                              {item.assignments && item.assignments.length > 0 && (
                                <div className="chapter-assignments-list margin-top--sm">
                                  <h6>Created Assignments:</h6>
                                  <ul>
                                    {item.assignments.map(assignment => (
                                      <li key={assignment.id} className="assignment-item-sm">
                                        <strong>{assignment.title}</strong>
                                        <p>{assignment.description}</p>
                                        <button
                                          onClick={() => removeAssignmentFromChapter(item.chapterId, assignment.id)}
                                          className="button button--sm button--danger"
                                        >
                                          Remove
                                        </button>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Assignment Creation Section */}
          <div className="col col--6">
            <div className="card">
              <div className="card__header">
                <h3>Create Assignment</h3>
              </div>
              <div className="card__body">
                <div className="margin-bottom--md">
                  <label htmlFor="assignment-title">Assignment Title:</label>
                  <input
                    id="assignment-title"
                    type="text"
                    value={assignmentTitle}
                    onChange={(e) => setAssignmentTitle(e.target.value)}
                    placeholder="e.g., ROS 2 Publisher Exercise"
                    className="form-control"
                  />
                </div>

                <div className="margin-bottom--md">
                  <label htmlFor="assignment-chapter">Associated Chapter:</label>
                  <select
                    id="assignment-chapter"
                    value={selectedChapter}
                    onChange={(e) => setSelectedChapter(e.target.value)}
                    className="form-control"
                  >
                    <option value="">Select a chapter...</option>
                    {availableChapters.map(chapterId => (
                      <option key={chapterId} value={chapterId}>
                        {getChapterTitle(chapterId)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="margin-bottom--md">
                  <label htmlFor="assignment-description">Assignment Description:</label>
                  <textarea
                    id="assignment-description"
                    value={assignmentDescription}
                    onChange={(e) => setAssignmentDescription(e.target.value)}
                    placeholder="Describe the assignment requirements..."
                    rows="4"
                    className="form-control"
                  />
                </div>

                <button
                  onClick={addAssignment}
                  className="button button--primary"
                  disabled={!assignmentTitle || !assignmentDescription || !selectedChapter}
                >
                  Create Assignment
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Student Progress Tracking */}
        <div className="row margin-top--lg">
          <div className="col col--12">
            <div className="card">
              <div className="card__header">
                <h3>Student Progress Tracking</h3>
              </div>
              <div className="card__body">
                <div className="student-tracking-controls">
                  <h4>Track your students' progress through the curriculum.</h4>
                  <div className="filter-controls">
                    <select className="form-control form-control-sm" style={{width: 'auto', display: 'inline-block', marginRight: '10px'}}>
                      <option>All Chapters</option>
                      {availableChapters.map(chapterId => (
                        <option key={chapterId} value={chapterId}>{getChapterTitle(chapterId)}</option>
                      ))}
                    </select>
                    <select className="form-control form-control-sm" style={{width: 'auto', display: 'inline-block'}}>
                      <option>All Statuses</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                      <option>Not Started</option>
                    </select>
                  </div>
                </div>

                <div className="table-container margin-top--sm">
                  <table className="progress-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Chapter</th>
                        <th>Progress</th>
                        <th>Time Spent</th>
                        <th>Assignments Completed</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>John Doe</td>
                        <td>ROS 2 Fundamentals</td>
                        <td>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{width: '75%'}}></div>
                            <span className="progress-text">75%</span>
                          </div>
                        </td>
                        <td>2h 30m</td>
                        <td>3/5</td>
                        <td>Needs help with services</td>
                        <td><span className="status-badge status-in-progress">In Progress</span></td>
                        <td>
                          <button className="button button--sm button--outline">View</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Jane Smith</td>
                        <td>ROS 2 Fundamentals</td>
                        <td>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{width: '100%'}}></div>
                            <span className="progress-text">100%</span>
                          </div>
                        </td>
                        <td>3h 15m</td>
                        <td>5/5</td>
                        <td>Completed all exercises</td>
                        <td><span className="status-badge status-completed">Completed</span></td>
                        <td>
                          <button className="button button--sm button--outline">View</button>
                        </td>
                      </tr>
                      <tr>
                        <td>Bob Johnson</td>
                        <td>Gazebo Simulation</td>
                        <td>
                          <div className="progress-bar">
                            <div className="progress-fill" style={{width: '45%'}}></div>
                            <span className="progress-text">45%</span>
                          </div>
                        </td>
                        <td>1h 45m</td>
                        <td>2/4</td>
                        <td>Good with physics, needs work on plugins</td>
                        <td><span className="status-badge status-in-progress">In Progress</span></td>
                        <td>
                          <button className="button button--sm button--outline">View</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="chart-placeholder margin-top--md">
                  <h5>Class Progress Overview</h5>
                  <div style={{height: '200px', backgroundColor: '#f8f9fa', borderRadius: '4px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-around', padding: '10px'}}>
                    <div style={{textAlign: 'center'}}>
                      <div style={{height: '120px', width: '30px', backgroundColor: '#007cba', marginBottom: '5px'}}></div>
                      <small>ROS 2</small>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{height: '80px', width: '30px', backgroundColor: '#007cba', marginBottom: '5px'}}></div>
                      <small>Gazebo</small>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{height: '60px', width: '30px', backgroundColor: '#007cba', marginBottom: '5px'}}></div>
                      <small>Unity</small>
                    </div>
                    <div style={{textAlign: 'center'}}>
                      <div style={{height: '30px', width: '30px', backgroundColor: '#007cba', marginBottom: '5px'}}></div>
                      <small>Isaac</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Created Assignments */}
        <div className="row margin-top--lg">
          <div className="col col--12">
            <div className="card">
              <div className="card__header">
                <h3>Your Assignments</h3>
              </div>
              <div className="card__body">
                {assignments.length === 0 ? (
                  <p>No assignments created yet.</p>
                ) : (
                  <div className="assignments-list">
                    {assignments.map(assignment => (
                      <div key={assignment.id} className="assignment-item card">
                        <div className="card__header">
                          <h4>{assignment.title}</h4>
                          <small>Created: {new Date(assignment.createdDate).toLocaleDateString()}</small>
                        </div>
                        <div className="card__body">
                          <p><strong>Chapter:</strong> {getChapterTitle(assignment.chapterId)}</p>
                          <p><strong>Description:</strong> {assignment.description}</p>
                        </div>
                        <div className="card__footer">
                          <button className="button button--secondary">View Details</button>
                          <button className="button button--outline">Share Assignment</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .form-control {
          width: 100%;
          padding: 8px 12px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-bottom: 10px;
        }

        .curriculum-list {
          list-style: none;
          padding: 0;
        }

        .curriculum-item {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 10px;
          margin-bottom: 8px;
        }

        .curriculum-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 5px;
        }

        .curriculum-order {
          font-weight: bold;
          color: #666;
        }

        .curriculum-title {
          flex-grow: 1;
        }

        .curriculum-details {
          padding-left: 20px;
        }

        .table-container {
          overflow-x: auto;
        }

        .progress-table {
          width: 100%;
          border-collapse: collapse;
        }

        .progress-table th,
        .progress-table td {
          border: 1px solid #ddd;
          padding: 8px 12px;
          text-align: left;
        }

        .progress-table th {
          background-color: #f5f5f5;
        }

        .assignments-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
        }

        .assignment-item {
          margin-bottom: 16px;
        }

        .form-control-sm {
          width: 100%;
          padding: 4px 8px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-bottom: 5px;
        }

        .chapter-assignments {
          border-left: 2px solid #007cba;
          padding-left: 15px;
          margin-left: 10px;
        }

        .assignment-input-group {
          background-color: #f8f9fa;
          padding: 10px;
          border-radius: 4px;
          margin-top: 10px;
        }

        .assignment-item-sm {
          border: 1px solid #eee;
          padding: 8px;
          margin-bottom: 8px;
          border-radius: 4px;
        }

        .assignment-item-sm button {
          margin-top: 5px;
        }

        .progress-bar {
          position: relative;
          width: 100px;
          height: 20px;
          background-color: #e9ecef;
          border-radius: 10px;
          overflow: hidden;
        }

        .progress-fill {
          height: 100%;
          background-color: #28a745;
          transition: width 0.3s ease;
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 12px;
          font-weight: bold;
          color: #333;
        }

        .status-badge {
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: bold;
        }

        .status-completed {
          background-color: #d4edda;
          color: #155724;
        }

        .status-in-progress {
          background-color: #fff3cd;
          color: #856404;
        }

        .filter-controls {
          margin-top: 10px;
        }

        .chart-placeholder {
          padding: 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
        }

        .chapter-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 10px;
        }
      `}</style>

      {/* Educator Quick Navigation */}
      <div className="container margin-top--lg">
        <div className="row">
          <div className="col col--12">
            <div className="card">
              <div className="card__header">
                <h3>Quick Chapter Access</h3>
              </div>
              <div className="card__body">
                <div className="chapter-links-grid">
                  {availableChapters.map(chapterId => (
                    <a
                      key={chapterId}
                      href={`/docs/chapters/${chapterId}`}
                      className="button button--outline button--block"
                    >
                      {getChapterTitle(chapterId)}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorDashboard;