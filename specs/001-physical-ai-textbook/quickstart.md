# Quickstart Guide: Physical AI & Humanoid Robotics Textbook

## Prerequisites

- Node.js (v18.x or later)
- npm or yarn package manager
- Git
- GitHub account (for authentication and progress tracking)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-name>
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment Configuration
Create a `.env` file in the root directory with the following:
```env
# GitHub OAuth App configuration
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# For local development only
LOCAL_DEVELOPMENT=true
```

### 4. Run Development Server
```bash
npm start
# or
yarn start
```

This will start the Docusaurus development server at `http://localhost:3000`.

## Adding New Chapters

### 1. Create Chapter File
Create a new MDX file in the `docs/chapters/` directory:
```bash
# Example: Creating a new chapter on ROS2 services
touch docs/chapters/ros2-services.mdx
```

### 2. Follow Chapter Template
```mdx
---
title: ROS 2 Services
sidebar_position: 3
description: Understanding ROS 2 services and their implementation
---

# ROS 2 Services

## Introduction

[Your chapter content here]

## Key Concepts

- Concept 1
- Concept 2
- Concept 3

## Code Example

import CodeExample from '@site/src/components/code-examples/Example';

<CodeExample
  title="Simple Service Server"
  language="python"
  code={`# Your code here`}
  description="This example demonstrates how to create a simple service server."
/>

## Summary

[Chapter summary]

## Next Steps

- [Previous Chapter](./previous-chapter.mdx)
- [Next Chapter](./next-chapter.mdx)
```

### 3. Update Sidebar
Add your new chapter to `docs/sidebar.js`:
```javascript
module.exports = {
  textbook: [
    // ... other chapters
    'chapters/ros2-services',
    // ... remaining chapters
  ],
};
```

## Running Tests

### Unit Tests
```bash
npm test
# or
yarn test
```

### End-to-End Tests
```bash
npm run test:e2e
# or
yarn test:e2e
```

### Content Validation
```bash
npm run lint:content
# or
yarn lint:content
```

## Building for Production

```bash
npm run build
# or
yarn build
```

The built static files will be in the `build/` directory and ready for deployment to GitHub Pages.

## Deployment to GitHub Pages

The project is configured for GitHub Actions deployment. To deploy:

1. Push changes to the `main` branch
2. Ensure the GitHub Pages settings in your repository are configured to use the `/build` folder from the `main` branch

Alternatively, you can manually deploy:
```bash
npm run deploy
# or
yarn deploy
```

## Adding Interactive Components

### Custom MDX Components
To add interactive elements like progress tracking or code execution:

1. Create the component in `src/components/`
2. Import and use in your MDX files

Example for a progress tracker:
```jsx
import ProgressTracker from '@site/src/components/ProgressTracker';

<ProgressTracker chapterId="ros2-services" />
```

## Accessibility Guidelines

All content should meet WCAG 2.1 AA standards:

1. Use proper heading hierarchy (h1, h2, h3, etc.)
2. Include alt text for all images
3. Ensure sufficient color contrast
4. Provide text alternatives for diagrams
5. Use semantic HTML elements

## Content Standards

1. **Word Count**: Keep chapters between 800-1500 words
2. **Code Examples**: All code must be validated against official documentation
3. **Citations**: Reference official documentation sources only
4. **Diagrams**: Use Mermaid or D3.js for accessibility-compliant diagrams
5. **Tone**: Educational, concise, beginner-friendly

## Troubleshooting

### Common Issues

**Problem**: GitHub authentication not working in development
**Solution**: Ensure your GitHub OAuth app is configured with the correct callback URL (`http://localhost:3000` for development)

**Problem**: Code examples not rendering properly
**Solution**: Check that the language is properly specified and the code block is correctly formatted

**Problem**: Slow build times
**Solution**: Consider splitting large chapters into smaller sections or optimizing images

## Getting Help

- Check the [documentation](https://docusaurus.io/docs) for Docusaurus-specific issues
- Review the [GitHub repository](https://github.com/) for project-specific issues
- Contact the development team for assistance