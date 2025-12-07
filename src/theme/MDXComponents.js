import React from 'react';
import CodeBlock from '@theme/CodeBlock';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
import TabItem from '@theme/TabItem';
import Tabs from '@theme/Tabs';

// Custom components for the textbook
import LoginButton from '../components/auth/LoginButton';
import ProgressTracker from '../components/auth/ProgressTracker';
import CodeExample from '../components/code-examples/Example';
import ChapterNavigationWrapper from '../components/ChapterNavigation';
import DeveloperNavigation from '../components/DeveloperNavigation';
import Details from '../components/utils/Details';

// Ensure all default MDX components are still available
const MDXComponents = {
  code: (props) => {
    // Check if this is a code example component
    if (props.className && props.className.includes('code-example')) {
      return <CodeExample {...props} />;
    }
    return <CodeBlock {...props} />;
  },
  h1: (props) => <Heading as="h1" {...props} />,
  h2: (props) => <Heading as="h2" {...props} />,
  h3: (props) => <Heading as="h3" {...props} />,
  h4: (props) => <Heading as="h4" {...props} />,
  h5: (props) => <Heading as="h5" {...props} />,
  h6: (props) => <Heading as="h6" {...props} />,
  a: (props) => <Link {...props} />,
  // Use the custom Details component instead of @theme/Details
  details: (props) => <Details {...props} />,
  tabItem: (props) => <TabItem {...props} />,
  tabs: (props) => <Tabs {...props} />,

  // Custom textbook components
  LoginButton,
  ProgressTracker,
  CodeExample,
  ChapterNavigationWrapper,
  DeveloperNavigation,
};

export default MDXComponents;