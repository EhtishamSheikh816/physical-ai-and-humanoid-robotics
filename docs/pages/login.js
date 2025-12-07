import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { useLocation, useHistory } from '@docusaurus/router';
import LoginButton from '../../src/components/auth/LoginButton';

const LoginPage = () => {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const history = useHistory();

  // Check if user is already authenticated
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(() => {
    const storedAuthState = localStorage.getItem('authState');
    if (storedAuthState) {
      const authState = JSON.parse(storedAuthState);
      setIsAuthenticated(authState.isAuthenticated);

      // If already authenticated, redirect to dashboard
      if (authState.isAuthenticated) {
        history.push('/dashboard');
      }
    }
  }, [history]);

  return (
    <Layout
      title={`Login`}
      description="Sign in to access the Physical AI & Humanoid Robotics textbook and track your progress">
      <main>
        <div className="container margin-vert--xl">
          <div className="row">
            <div className="col col--6 col--offset-3">
              <div className="card">
                <div className="card__header text--center">
                  <h2>Sign in to Your Account</h2>
                  <p>Access premium content and track your learning progress</p>
                </div>
                <div className="card__body">
                  <div className="margin-bottom--lg text--center">
                    <LoginButton type="primary">
                      Sign in with GitHub
                    </LoginButton>
                  </div>

                  <div className="alert alert--info" role="alert">
                    <h5>Why GitHub Sign-In?</h5>
                    <p>
                      We use GitHub OAuth for authentication to provide a secure sign-in experience.
                      We'll use GitHub Gists to store your progress across devices.
                    </p>
                    <p>
                      <strong>We will not:</strong> Post on your behalf, access your repositories,
                      or share your information with third parties.
                    </p>
                  </div>
                </div>
                <div className="card__footer text--center">
                  <p>
                    By signing in, you agree to our <Link to="/docs/terms">Terms of Service</Link> and acknowledge our <Link to="/docs/privacy">Privacy Policy</Link>.
                  </p>
                  <p>
                    <Link to="/">← Back to Home</Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

export default LoginPage;