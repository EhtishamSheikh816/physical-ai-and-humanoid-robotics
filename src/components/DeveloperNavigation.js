import React, { useState, useEffect } from 'react';

// Developer-specific navigation and search features
const DeveloperNavigation = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [activeTab, setActiveTab] = useState('search'); // 'search', 'api', 'examples', 'resources'
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [technologyFilter, setTechnologyFilter] = useState('all');

  // Mock data for search functionality
  const allContent = [
    {
      id: 1,
      title: 'ROS 2 Fundamentals',
      type: 'chapter',
      technology: 'ros2',
      difficulty: 'beginner',
      url: '/docs/chapters/ros2-fundamentals',
    },
    {
      id: 2,
      title: 'Gazebo Simulation',
      type: 'chapter',
      technology: 'gazebo',
      difficulty: 'intermediate',
      url: '/docs/chapters/gazebo-simulation',
    },
    {
      id: 3,
      title: 'Unity Integration',
      type: 'chapter',
      technology: 'unity',
      difficulty: 'advanced',
      url: '/docs/chapters/unity-integration',
    },
    {
      id: 4,
      title: 'Isaac Sim Integration',
      type: 'chapter',
      technology: 'isaac-sim',
      difficulty: 'advanced',
      url: '/docs/chapters/isaac-sim',
    },
    {
      id: 5,
      title: 'Vision-Language-Action Models',
      type: 'chapter',
      technology: 'vla',
      difficulty: 'advanced',
      url: '/docs/chapters/vla-models',
    },
    {
      id: 6,
      title: 'Capstone Project',
      type: 'chapter',
      technology: 'project',
      difficulty: 'advanced',
      url: '/docs/chapters/capstone-project',
    },
    {
      id: 7,
      title: 'ROS 2 Publisher Example',
      type: 'example',
      technology: 'ros2',
      difficulty: 'beginner',
      url: '/docs/chapters/ros2-fundamentals#publisher-example',
    },
    {
      id: 8,
      title: 'Isaac Sim Environment Setup',
      type: 'example',
      technology: 'isaac-sim',
      difficulty: 'intermediate',
      url: '/docs/chapters/isaac-sim#environment-setup',
    },
    {
      id: 9,
      title: 'VLA Model Training',
      type: 'example',
      technology: 'vla',
      difficulty: 'advanced',
      url: '/docs/chapters/vla-models#training',
    },
    {
      id: 10,
      title: 'Unity ROS Bridge',
      type: 'example',
      technology: 'unity',
      difficulty: 'intermediate',
      url: '/docs/chapters/unity-integration#ros-bridge',
    },
  ];

  // API documentation mock data
  const apiDocs = [
    {
      name: 'ROS 2 Client Libraries',
      category: 'ROS 2',
      description:
        'API for ROS 2 client libraries in C++, Python, and other languages',
    },
    {
      name: 'Isaac Sim Python API',
      category: 'Isaac Sim',
      description:
        'Python API for controlling Isaac Sim simulation environment',
    },
    {
      name: 'Unity Robotics Hub',
      category: 'Unity',
      description: 'Package for connecting Unity to ROS networks',
    },
    {
      name: 'Gazebo ROS Packages',
      category: 'Gazebo',
      description: 'ROS packages for controlling Gazebo simulation',
    },
    {
      name: 'VLA Model Interface',
      category: 'VLA',
      description: 'Interface for Vision-Language-Action models',
    },
  ];

  // Filter content based on search and filters
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const filtered = allContent.filter(item => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.technology.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === 'all' || item.difficulty === difficultyFilter;
      const matchesTechnology =
        technologyFilter === 'all' || item.technology === technologyFilter;

      return matchesSearch && matchesDifficulty && matchesTechnology;
    });

    setSearchResults(filtered);
  }, [searchQuery, difficultyFilter, technologyFilter]);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const filteredApiDocs = apiDocs.filter(doc => {
    if (searchQuery.trim() === '') return true;
    return (
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <div className="developer-navigation">
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <div className="card">
              <div className="card__header">
                <h3>Developer Tools</h3>
              </div>
              <div className="card__body">
                {/* Tabs for different developer tools */}
                <div className="dev-tabs">
                  <div className="tabs">
                    <button
                      className={`tab ${activeTab === 'search' ? 'tab--active' : ''}`}
                      onClick={() => setActiveTab('search')}
                    >
                      Search
                    </button>
                    <button
                      className={`tab ${activeTab === 'api' ? 'tab--active' : ''}`}
                      onClick={() => setActiveTab('api')}
                    >
                      API Docs
                    </button>
                    <button
                      className={`tab ${activeTab === 'examples' ? 'tab--active' : ''}`}
                      onClick={() => setActiveTab('examples')}
                    >
                      Code Examples
                    </button>
                    <button
                      className={`tab ${activeTab === 'resources' ? 'tab--active' : ''}`}
                      onClick={() => setActiveTab('resources')}
                    >
                      Resources
                    </button>
                  </div>
                </div>

                {/* Search tab */}
                {activeTab === 'search' && (
                  <div className="dev-tab-content">
                    <div className="search-section">
                      <div className="search-bar">
                        <input
                          type="text"
                          placeholder="Search chapters, examples, APIs..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          className="search-input"
                          onFocus={() => setShowSearch(true)}
                        />
                        {searchQuery && (
                          <button
                            className="clear-search"
                            onClick={clearSearch}
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Filters */}
                      <div className="filters">
                        <div className="filter-group">
                          <label htmlFor="difficulty-filter">Difficulty:</label>
                          <select
                            id="difficulty-filter"
                            value={difficultyFilter}
                            onChange={e => setDifficultyFilter(e.target.value)}
                            className="filter-select"
                          >
                            <option value="all">All Levels</option>
                            <option value="beginner">Beginner</option>
                            <option value="intermediate">Intermediate</option>
                            <option value="advanced">Advanced</option>
                          </select>
                        </div>

                        <div className="filter-group">
                          <label htmlFor="technology-filter">Technology:</label>
                          <select
                            id="technology-filter"
                            value={technologyFilter}
                            onChange={e => setTechnologyFilter(e.target.value)}
                            className="filter-select"
                          >
                            <option value="all">All Technologies</option>
                            <option value="ros2">ROS 2</option>
                            <option value="gazebo">Gazebo</option>
                            <option value="unity">Unity</option>
                            <option value="isaac-sim">Isaac Sim</option>
                            <option value="vla">VLA Models</option>
                          </select>
                        </div>
                      </div>

                      {/* Search results */}
                      {searchQuery && searchResults.length > 0 && (
                        <div className="search-results">
                          <h4>Search Results ({searchResults.length})</h4>
                          <ul className="results-list">
                            {searchResults.map(item => (
                              <li key={item.id} className="result-item">
                                <a href={item.url}>
                                  <div className="result-header">
                                    <span className="result-title">
                                      {item.title}
                                    </span>
                                    <span
                                      className={`result-type type-${item.type}`}
                                    >
                                      {item.type}
                                    </span>
                                  </div>
                                  <div className="result-meta">
                                    <span
                                      className={`difficulty difficulty-${item.difficulty}`}
                                    >
                                      {item.difficulty}
                                    </span>
                                    <span className="technology">
                                      {item.technology}
                                    </span>
                                  </div>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {searchQuery && searchResults.length === 0 && (
                        <div className="no-results">
                          <p>
                            No results found for "{searchQuery}". Try different
                            keywords.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* API Docs tab */}
                {activeTab === 'api' && (
                  <div className="dev-tab-content">
                    <div className="api-docs">
                      <h4>API Documentation</h4>
                      <div className="api-categories">
                        <div className="api-category">
                          <h5>ROS 2 APIs</h5>
                          <ul className="api-list">
                            <li>
                              <a
                                href="https://docs.ros.org/en/humble/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                ROS 2 Humble Documentation
                              </a>
                              <p>
                                Official ROS 2 documentation for the Humble
                                Hawksbill distribution
                              </p>
                            </li>
                            <li>
                              <a
                                href="https://docs.ros.org/en/humble/p/rclpy/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                rclpy Documentation
                              </a>
                              <p>Python client library for ROS 2</p>
                            </li>
                            <li>
                              <a
                                href="https://docs.ros.org/en/humble/p/rclcpp/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                rclcpp Documentation
                              </a>
                              <p>C++ client library for ROS 2</p>
                            </li>
                          </ul>
                        </div>

                        <div className="api-category">
                          <h5>Simulation APIs</h5>
                          <ul className="api-list">
                            <li>
                              <a
                                href="https://gazebosim.org/api/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Gazebo API Reference
                              </a>
                              <p>API for Gazebo simulation engine</p>
                            </li>
                            <li>
                              <a
                                href="https://docs.omniverse.nvidia.com/isaacsim/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Isaac Sim Documentation
                              </a>
                              <p>API for Isaac Sim simulation environment</p>
                            </li>
                            <li>
                              <a
                                href="https://docs.unity3d.com/Manual/UnityAR.html"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Unity Robotics
                              </a>
                              <p>Unity packages for robotics integration</p>
                            </li>
                          </ul>
                        </div>

                        <div className="api-category">
                          <h5>AI/ML APIs</h5>
                          <ul className="api-list">
                            <li>
                              <a
                                href="https://pytorch.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                PyTorch
                              </a>
                              <p>
                                Deep learning framework for AI model development
                              </p>
                            </li>
                            <li>
                              <a
                                href="https://tensorflow.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                TensorFlow
                              </a>
                              <p>End-to-end open source platform for ML</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Examples tab */}
                {activeTab === 'examples' && (
                  <div className="dev-tab-content">
                    <div className="examples-section">
                      <h4>Code Examples by Technology</h4>
                      <div className="examples-grid">
                        <div className="example-category">
                          <h5>ROS 2 Examples</h5>
                          <ul className="example-list">
                            <li>
                              <a href="/docs/chapters/ros2-fundamentals#publisher-example">
                                Simple Publisher
                              </a>
                            </li>
                            <li>
                              <a href="/docs/chapters/ros2-fundamentals#service-example">
                                Service Client
                              </a>
                            </li>
                            <li>
                              <a href="/docs/chapters/ros2-fundamentals#action-example">
                                Action Server
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="example-category">
                          <h5>Simulation Examples</h5>
                          <ul className="example-list">
                            <li>
                              <a href="/docs/chapters/gazebo-simulation#model-example">
                                Gazebo Model
                              </a>
                            </li>
                            <li>
                              <a href="/docs/chapters/isaac-sim#environment-example">
                                Isaac Sim Env
                              </a>
                            </li>
                            <li>
                              <a href="/docs/chapters/unity-integration#ros-bridge">
                                Unity ROS Bridge
                              </a>
                            </li>
                          </ul>
                        </div>

                        <div className="example-category">
                          <h5>AI/ML Examples</h5>
                          <ul className="example-list">
                            <li>
                              <a href="/docs/chapters/vla-models#training">
                                VLA Training
                              </a>
                            </li>
                            <li>
                              <a href="/docs/chapters/capstone-project#voice-command">
                                Voice Processing
                              </a>
                            </li>
                            <li>
                              <a href="/docs/chapters/capstone-project#perception">
                                Object Detection
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resources tab */}
                {activeTab === 'resources' && (
                  <div className="dev-tab-content">
                    <div className="resources-section">
                      <h4>Developer Resources</h4>
                      <div className="resources-grid">
                        <div className="resource-category">
                          <h5>Development Tools</h5>
                          <ul className="resource-list">
                            <li>
                              <a
                                href="https://colcon.readthedocs.io/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Colcon Build Tool
                              </a>
                              <p>Multi-package build system for ROS 2</p>
                            </li>
                            <li>
                              <a
                                href="https://index.ros.org/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                ROS Index
                              </a>
                              <p>Package index for ROS distributions</p>
                            </li>
                            <li>
                              <a
                                href="https://hub.docker.com/_/ros/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                ROS Docker Images
                              </a>
                              <p>Official Docker images for ROS development</p>
                            </li>
                          </ul>
                        </div>

                        <div className="resource-category">
                          <h5>Simulation Tools</h5>
                          <ul className="resource-list">
                            <li>
                              <a
                                href="https://gazebosim.org/tutorials"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Gazebo Tutorials
                              </a>
                              <p>Step-by-step guides for Gazebo simulation</p>
                            </li>
                            <li>
                              <a
                                href="https://docs.omniverse.nvidia.com/isaacsim/latest/tutorial_index.html"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Isaac Sim Tutorials
                              </a>
                              <p>Guides for Isaac Sim development</p>
                            </li>
                            <li>
                              <a
                                href="https://learn.unity.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Unity Learn
                              </a>
                              <p>Tutorials for Unity development</p>
                            </li>
                          </ul>
                        </div>

                        <div className="resource-category">
                          <h5>AI/ML Resources</h5>
                          <ul className="resource-list">
                            <li>
                              <a
                                href="https://pytorch.org/tutorials/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                PyTorch Tutorials
                              </a>
                              <p>Learning resources for deep learning</p>
                            </li>
                            <li>
                              <a
                                href="https://huggingface.co/docs/transformers/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Transformers Library
                              </a>
                              <p>Pre-trained models for NLP and vision tasks</p>
                            </li>
                            <li>
                              <a
                                href="https://github.com/google-deepmind/rt-1"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                RT-1 Repository
                              </a>
                              <p>Robotics Transformer implementation</p>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .developer-navigation {
          margin: 2rem 0;
        }

        .dev-tabs {
          margin-bottom: 1.5rem;
        }

        .tabs {
          display: flex;
          border-bottom: 1px solid #ddd;
          overflow-x: auto;
        }

        .tab {
          padding: 0.75rem 1.5rem;
          border: 1px solid #ddd;
          border-bottom: none;
          background: #f8f9fa;
          cursor: pointer;
          border-radius: 4px 4px 0 0;
          margin-right: 2px;
          white-space: nowrap;
        }

        .tab:hover {
          background: #e9ecef;
        }

        .tab--active {
          background: #007cba;
          color: white;
          border-color: #007cba;
        }

        .dev-tab-content {
          padding: 1rem 0;
        }

        .search-section {
          position: relative;
        }

        .search-bar {
          position: relative;
          margin-bottom: 1rem;
        }

        .search-input {
          width: 100%;
          padding: 0.75rem 2.5rem 0.75rem 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }

        .clear-search {
          position: absolute;
          right: 0.5rem;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: #666;
        }

        .filters {
          display: flex;
          gap: 1rem;
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
        }

        .filter-group {
          display: flex;
          flex-direction: column;
          flex: 1;
          min-width: 200px;
        }

        .filter-group label {
          font-weight: bold;
          margin-bottom: 0.25rem;
          font-size: 0.9rem;
        }

        .filter-select {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        .search-results {
          margin-top: 1rem;
        }

        .results-list {
          list-style: none;
          padding: 0;
        }

        .result-item {
          border: 1px solid #eee;
          border-radius: 4px;
          margin-bottom: 0.5rem;
        }

        .result-item a {
          display: block;
          padding: 1rem;
          text-decoration: none;
          color: inherit;
        }

        .result-item a:hover {
          background-color: #f8f9fa;
        }

        .result-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }

        .result-title {
          font-weight: bold;
          font-size: 1.1rem;
        }

        .result-type {
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .type-chapter {
          background-color: #d4edda;
          color: #155724;
        }

        .type-example {
          background-color: #d1ecf1;
          color: #0c5460;
        }

        .result-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: #666;
        }

        .difficulty {
          padding: 0.125rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          font-weight: bold;
        }

        .difficulty-beginner {
          background-color: #d4edda;
          color: #155724;
        }

        .difficulty-intermediate {
          background-color: #fff3cd;
          color: #856404;
        }

        .difficulty-advanced {
          background-color: #f8d7da;
          color: #721c24;
        }

        .technology {
          background-color: #e2e3e5;
          color: #383d41;
          padding: 0.125rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
        }

        .no-results {
          padding: 2rem;
          text-align: center;
          color: #666;
        }

        .api-docs,
        .examples-section,
        .resources-section {
          padding: 1rem 0;
        }

        .api-categories,
        .examples-grid,
        .resources-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .api-category,
        .example-category,
        .resource-category {
          margin-bottom: 1.5rem;
        }

        .api-category h5,
        .example-category h5,
        .resource-category h5 {
          border-bottom: 2px solid #007cba;
          padding-bottom: 0.5rem;
          margin-bottom: 1rem;
        }

        .api-list,
        .example-list,
        .resource-list {
          list-style: none;
          padding: 0;
        }

        .api-list li,
        .example-list li,
        .resource-list li {
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid #eee;
        }

        .api-list a,
        .example-list a,
        .resource-list a {
          font-weight: bold;
          text-decoration: none;
          color: #007cba;
        }

        .api-list a:hover,
        .example-list a:hover,
        .resource-list a:hover {
          text-decoration: underline;
        }

        .api-list p,
        .resource-list p {
          margin: 0.5rem 0 0 0;
          color: #666;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
};

export default DeveloperNavigation;
