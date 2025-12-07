import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useLocation, useHistory } from '@docusaurus/router';

// Simple dashboard component to show user progress
const Dashboard = () => {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const history = useHistory();

  // Check if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const authState = JSON.parse(storedAuthState);
      if (authState.isAuthenticated && authState.user) {
        setIsAuthenticated(authState.isAuthenticated);
        setUser(authState.user);
      } else {
        // Redirect to home if not authenticated
        history.push('/');
      }
    } else {
      // Redirect to home if no auth state
      history.push('/');
    }
  }, [history]);

  // Get all progress data from localStorage
  const getAllProgress = () => {
    const progressData = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('progress_')) {
        const chapterId = key.substring(9); // Remove 'progress_' prefix
        progressData[chapterId] = JSON.parse(localStorage.getItem(key));
      }
    }
    return progressData;
  };

  const progressData = getAllProgress();
  const totalChapters = Object.keys(progressData).length;
  const completedChapters = Object.values(progressData).filter(p => p.completed).length;
  const totalProgress = totalChapters > 0
    ? Math.round((completedChapters / totalChapters) * 100)
    : 0;

  const handleLogout = () => {
    localStorage.removeItem('authState');
    localStorage.removeItem('oauthState');

    // Clear all progress data
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('progress_')) {
        localStorage.removeItem(key);
      }
    });

    // Update in-memory state
    window.location.href = '/';
  };

  if (!isAuthenticated || !user) {
    return (
      <Layout
        title={`Dashboard`}
        description="Track your learning progress in Physical AI & Humanoid Robotics">
        <main>
          <div className="container margin-vert--xl">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="text--center padding-vert--xl">
                  <h1 className="padding-bottom--md">Please sign in to access your dashboard</h1>
                  <Link
                    className="button button--primary button--lg"
                    to="/">
                    Go to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </Layout>
    );
  }

  return (
    <Layout
      title={`Dashboard - ${user.username}`}
      description="Track your learning progress in Physical AI & Humanoid Robotics">
      <main>
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--12">
              <div className="text--center margin-bottom--lg">
                <h1>Your Learning Dashboard</h1>
                <p>Welcome back, <strong>{user.username}</strong>!</p>
              </div>

              <div className="row margin-bottom--lg">
                <div className="col col--4">
                  <div className="card">
                    <div className="card__body text--center">
                      <h3>{totalProgress}%</h3>
                      <p>Overall Progress</p>
                    </div>
                  </div>
                </div>
                <div className="col col--4">
                  <div className="card">
                    <div className="card__body text--center">
                      <h3>{completedChapters}</h3>
                      <p>Chapters Completed</p>
                    </div>
                  </div>
                </div>
                <div className="col col--4">
                  <div className="card">
                    <div className="card__body text--center">
                      <h3>{totalChapters}</h3>
                      <p>Total Chapters</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="margin-bottom--lg">
                <h2>Your Progress</h2>
                {totalChapters === 0 ? (
                  <div className="text--center padding-vert--lg">
                    <p>You haven't started any chapters yet.</p>
                    <Link
                      className="button button--primary button--lg"
                      to="/docs/textbook">
                      Start Learning
                    </Link>
                  </div>
                ) : (
                  <div className="row">
                    {Object.entries(progressData).map(([chapterId, data]) => (
                      <div key={chapterId} className="col col--6 margin-bottom--md">
                        <div className="card">
                          <div className="card__header">
                            <h3>{chapterId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                          </div>
                          <div className="card__body">
                            <div className="progress-bar-container">
                              <div
                                className="progress-bar"
                                style={{
                                  width: `${data.progress}%`,
                                  backgroundColor: data.completed ? '#2e8555' : '#6e6e6e',
                                  height: '20px',
                                  borderRadius: '10px'
                                }}
                              >
                                <span style={{ padding: '0 5px', color: 'white', fontSize: '12px' }}>
                                  {data.progress}%
                                </span>
                              </div>
                            </div>
                            <p className="margin-bottom--sm">
                              Status: <strong>{data.completed ? 'Completed' : 'In Progress'}</strong>
                            </p>
                            <p className="margin-bottom--sm">
                              Time spent: <strong>{Math.floor(data.timeSpent / 60)}m {data.timeSpent % 60}s</strong>
                            </p>
                            {data.notes && (
                              <p>
                                <strong>Notes:</strong> {data.notes.substring(0, 50)}{data.notes.length > 50 ? '...' : ''}
                              </p>
                            )}
                          </div>
                          <div className="card__footer">
                            <Link
                              className="button button--primary button--sm"
                              to={`/docs/chapters/${chapterId}`}>
                              {data.completed ? 'Review' : 'Continue'}
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="text--center margin-top--lg">
                <button
                  onClick={handleLogout}
                  className="button button--secondary button--lg">
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .progress-bar-container {
            width: 100%;
            background-color: #e0e0e0;
            border-radius: 10px;
            margin-bottom: 10px;
          }
          .progress-bar {
            position: relative;
            text-align: center;
            line-height: 20px;
          }
        `}</style>
      </main>
    </Layout>
  );
};

export default Dashboard;