import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  textbook: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: true,
      items: [
        'intro',
      ],
    },
    {
      type: 'category',
      label: 'ROS 2 Fundamentals',
      collapsed: true,
      items: [
        'chapters/ros2-fundamentals',
      ],
    },
    {
      type: 'category',
      label: 'Gazebo Simulation',
      collapsed: true,
      items: [
        'chapters/gazebo-simulation',
      ],
    },
    {
      type: 'category',
      label: 'Unity Integration',
      collapsed: true,
      items: [
        'chapters/unity-integration',
      ],
    },
    {
      type: 'category',
      label: 'Isaac Sim',
      collapsed: true,
      items: [
        'chapters/isaac-sim',
      ],
    },
    {
      type: 'category',
      label: 'Vision-Language-Action Models',
      collapsed: true,
      items: [
        'chapters/vla-models',
      ],
    },
    {
      type: 'category',
      label: 'Capstone Project',
      collapsed: true,
      items: [
        'chapters/capstone-project',
      ],
    },
  ],
};

export default sidebars;
