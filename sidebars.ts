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
      collapsed: false,
      items: [
        'intro',
      ],
    },
    {
      type: 'category',
      label: 'ROS 2 Fundamentals',
      collapsed: false,
      items: [
        'chapters/ros2-fundamentals',
      ],
    },
    {
      type: 'category',
      label: 'Gazebo Simulation',
      collapsed: false,
      items: [
        'chapters/gazebo-simulation',
      ],
    },
    {
      type: 'category',
      label: 'Unity Integration',
      collapsed: false,
      items: [
        'chapters/unity-integration',
      ],
    },
    {
      type: 'category',
      label: 'Isaac Sim',
      collapsed: false,
      items: [
        'chapters/isaac-sim',
      ],
    },
    {
      type: 'category',
      label: 'Vision-Language-Action Models',
      collapsed: false,
      items: [
        'chapters/vla-models',
      ],
    },
    {
      type: 'category',
      label: 'Capstone Project',
      collapsed: false,
      items: [
        'chapters/capstone-project',
      ],
    },
  ],
};

export default sidebars;
