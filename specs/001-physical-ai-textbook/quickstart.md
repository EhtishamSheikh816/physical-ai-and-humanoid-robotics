# Quickstart Guide: Physical AI & Humanoid Robotics Course Book

## Overview
This guide provides a quick setup and development workflow for the Physical AI & Humanoid Robotics textbook built with Docusaurus. The textbook covers ROS 2 fundamentals, Gazebo simulation, Isaac-based perception, and VLA systems with hands-on workflows and a capstone project.

## Prerequisites
- Node.js LTS (v20.x or higher)
- npm or yarn package manager
- Git
- Ubuntu 22.04 LTS (for following examples) or compatible Linux system
- Basic knowledge of ROS 2, Gazebo, and Isaac Sim (as covered in the textbook)

## Installation

1. **Clone the repository:**
```bash
git clone <repository-url>
cd <repository-name>
```

2. **Install dependencies:**
```bash
npm install
```

3. **Start the development server:**
```bash
npm start
```
This command starts a local development server and opens the textbook in your browser. Most changes are reflected live without restarting the server.

## Project Structure
```
docs/
├── chapters/            # Textbook content in MDX format
│   ├── 01-ros-fundamentals.mdx
│   ├── 02-gazebo-simulation.mdx
│   ├── 03-isaac-perception.mdx
│   ├── 04-vla-systems.mdx
│   ├── 05-hardware-setup.mdx
│   └── 06-capstone-project.mdx
├── components/          # Custom Docusaurus components
├── theme/               # Custom theme components
├── static/              # Static assets (images, diagrams)
│   └── img/
├── src/
│   ├── css/
│   └── pages/
├── sidebars.js          # Navigation configuration
├── docusaurus.config.js # Docusaurus configuration
└── package.json         # Project dependencies
```

## Adding New Content

### Creating a New Chapter
1. Create a new MDX file in the `docs/chapters/` directory:
```bash
# Example: Create a chapter about navigation
touch docs/chapters/03-navigation.mdx
```

2. Add frontmatter to your MDX file:
```md
---
title: Navigation Systems
description: Understanding robot navigation in Physical AI
sidebar_position: 3
---

# Navigation Systems

Content goes here...
```

3. Update `sidebars.js` to include your new chapter:
```js
module.exports = {
  textbook: [
    'chapters/01-ros-fundamentals',
    'chapters/02-gazebo-simulation',
    'chapters/03-navigation',  // Add your new chapter here
    'chapters/04-vla-systems',
    // ... other chapters
  ],
};
```

### Adding Diagrams
Use Mermaid.js for interactive diagrams:
```mdx
import Mermaid from '@theme/Mermaid';

<Mermaid>
graph TD
    A[Robot] --> B{Decision Point}
    B --> C[Action 1]
    B --> D[Action 2]
</Mermaid>
```

Or include static images with proper accessibility:
```mdx
import img from '@site/static/img/ros-graph.png';

<img src={img} alt="ROS graph showing nodes and topics connection" />
```

### Adding Code Examples
Use standard Docusaurus code blocks with syntax highlighting:
````mdx
```python
import rclpy
from rclpy.node import Node

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher = self.create_publisher(String, 'topic', 10)
```
````

## Building for Production

To build the static site for deployment:

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static hosting service.

## Testing Accessibility

To ensure WCAG 2.1 AA compliance:

1. **Check color contrast:**
```bash
npm run check-contrast
```

2. **Run accessibility audit:**
```bash
npm run audit-a11y
```

3. **Use automated tools like axe-core during development**

## Deployment

The site is designed for GitHub Pages deployment:

1. Commit all changes:
```bash
git add .
git commit -m "Update textbook content"
git push origin main
```

2. GitHub Actions will automatically build and deploy the site to GitHub Pages if configured.

## Commands Reference

- `npm start` - Start local development server
- `npm run build` - Build static site for production
- `npm run serve` - Serve the built site locally for testing
- `npm run swizzle` - Override Docusaurus components (use carefully)
- `npm run clear` - Clear the Docusaurus cache
- `npm run check-contrast` - Check color contrast ratios
- `npm run audit-a11y` - Run accessibility audit

## Troubleshooting

**Problem:** Diagrams not rendering
**Solution:** Check if Mermaid is properly configured in `docusaurus.config.js`

**Problem:** Images not loading
**Solution:** Ensure images are in the `static/` directory and properly referenced with the `@site` alias

**Problem:** Page load times too slow
**Solution:** Optimize images and check bundle size with `npm run build -- --bundle-analyzer`