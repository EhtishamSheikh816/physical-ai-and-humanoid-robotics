# Contributing to Physical AI & Humanoid Robotics Textbook

Thank you for your interest in contributing to the Physical AI & Humanoid Robotics textbook! This guide will help you understand how to contribute content, fix issues, and add new features to the textbook.

## Table of Contents

- [Getting Started](#getting-started)
- [Content Standards](#content-standards)
- [Chapter Structure](#chapter-structure)
- [Code Examples](#code-examples)
- [Diagrams and Visuals](#diagrams-and-visuals)
- [Writing Style](#writing-style)
- [Pull Request Process](#pull-request-process)
- [Development Setup](#development-setup)

## Getting Started

### Prerequisites

- Node.js (v18.x or later)
- npm or yarn package manager
- Git
- GitHub account

### Setup Instructions

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR-USERNAME/physical-ai-humanoid-robotics-textbook.git
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm start
   ```

## Content Standards

### Accuracy Requirements

- All technical claims must reference official documentation or credible sources
- Code examples must be validated and error-free
- All content must be factually correct and free from hallucinations
- Citations must follow APA or official-docs hyperlinking standards

### Writing Standards

- Educational, concise, beginner-friendly tone
- Clear learning outcomes per chapter
- Minimum 800 words, maximum 1500 words per chapter
- Consistent terminology throughout the textbook
- WCAG 2.1 AA accessibility compliance

## Chapter Structure

Each chapter should follow this template:

```mdx
---
title: Chapter Title
sidebar_position: X
description: Brief description of the chapter content
---

# Chapter Title

## Introduction

Brief introduction to the topic and its importance in humanoid robotics.

## Key Concepts

- Concept 1
- Concept 2
- Concept 3

## Detailed Explanation

Detailed explanation of the concepts with examples.

## Code Example

import CodeExample from '@site/src/components/code-examples/Example';

<CodeExample
  title="Example Title"
  language="python"
  code={`# Your code here`}
  description="Description of what the example demonstrates."
/>

## Practical Applications

How the concepts apply to humanoid robotics specifically.

## Best Practices

Recommended approaches and considerations.

## Summary

Brief summary of the key points covered.

## Next Steps

Links to previous and next chapters.
```

## Code Examples

### Requirements

- All code examples must be runnable and tested
- Examples should be relevant to humanoid robotics applications
- Include proper error handling where appropriate
- Use ROS 2, Gazebo, Unity, or Isaac Sim as appropriate for the context

### Format

Code examples should use the custom `CodeExample` component:

```mdx
<CodeExample
  title="Example Title"
  language="python"  // or cpp, bash, yaml, etc.
  code={`your code here`}
  description="What this example demonstrates."
/>
```

## Diagrams and Visuals

### Diagram Components

Use the custom diagram components:

- `MermaidDiagram` for flowcharts and process diagrams
- `D3Diagram` for data visualization

### Static Images

- Place images in `static/img/`
- Use descriptive filenames
- Include alternative text for accessibility
- Optimize images for web (compress where possible)

## Writing Style

### Tone

- Educational and approachable
- Technical but accessible to beginners
- Consistent with other chapters
- Focused on practical applications in humanoid robotics

### Accessibility

- Use proper heading hierarchy (h1, h2, h3, etc.)
- Include alt text for all images
- Ensure sufficient color contrast
- Provide text alternatives for diagrams
- Use semantic HTML elements

## Pull Request Process

1. Create a feature branch from the main branch
2. Make your changes following the content standards
3. Test your changes locally
4. Update the sidebar if adding new chapters
5. Submit a pull request with a clear description
6. Address any feedback from reviewers

### Before Submitting

- Run content validation: `npm run lint:content`
- Verify the build works: `npm run build`
- Test in multiple browsers
- Check accessibility

## Development Setup

### Running the Development Server

```bash
npm start
```

The site will be available at `http://localhost:3000/physical-ai-humanoid-robotics-textbook/`

### Building for Production

```bash
npm run build
```

### Content Validation

```bash
# Check for markdown issues
npm run lint:content

# Auto-fix issues where possible
npm run lint:content:fix
```

### Testing

```bash
# Run code linting
npm run lint

# Run code formatting
npm run format
```

## Questions?

If you have questions about contributing, please open an issue in the repository or contact the maintainers.

Thank you for helping make the Physical AI & Humanoid Robotics textbook better for everyone!