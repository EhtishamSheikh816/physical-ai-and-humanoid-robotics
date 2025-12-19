# Data Model: Physical AI & Humanoid Robotics Course Book

## Overview

This document defines the data model for the Physical AI & Humanoid Robotics textbook, focusing on content structure and organization for static delivery without user tracking. The model encompasses chapters, diagrams, code examples, and capstone projects as specified in the feature requirements.

## Core Entities

### Chapter
- **Description**: A self-contained unit of learning content covering specific Physical AI or robotics concepts
- **Fields**:
  - `id`: string (unique identifier, typically filename)
  - `title`: string (chapter title)
  - `module`: string (associated module: ROS2, Gazebo, Isaac, VLA, Capstone)
  - `wordCount`: number (estimated word count)
  - `estimatedReadingTime`: number (in minutes)
  - `prerequisites`: array of strings (chapter IDs that should be completed first)
  - `learningObjectives`: array of strings (what the student should learn)
  - `contentPath`: string (path to MDX file)
  - `order`: number (sequence number for navigation)

### Diagram
- **Description**: Architecture diagrams for ROS graph, simulation pipeline, VLA pipeline, hardware stack, sim-to-real workflow
- **Fields**:
  - `id`: string (unique identifier)
  - `chapterId`: string (foreign key to Chapter)
  - `title`: string (diagram title)
  - `type`: string (type: "mermaid", "d3", "static-image", etc.)
  - `content`: string (diagram code or path to image)
  - `caption`: string (caption for accessibility)
  - `altText`: string (alternative text for accessibility)

### CodeExample
- **Description**: A runnable code snippet demonstrating concepts discussed in a chapter
- **Fields**:
  - `id`: string (unique identifier)
  - `chapterId`: string (foreign key to Chapter)
  - `title`: string (brief description)
  - `language`: string (programming language: Python, C++, etc.)
  - `code`: string (the actual code)
  - `description`: string (what the example demonstrates)
  - `expectedOutput`: string (what the student should expect to see)
  - `environment`: string (required environment: ROS 2 Humble/Iron, Gazebo, Isaac Sim 4.x, etc.)

### CapstoneProject
- **Description**: The integrated project that combines concepts from multiple chapters
- **Fields**:
  - `id`: string (unique identifier)
  - `title`: string (project title)
  - `description`: string (project overview)
  - `requirements`: array of strings (what the project should accomplish)
  - `components`: array of strings (ROS 2, Gazebo, Isaac Sim components involved)
  - `steps`: array of strings (step-by-step instructions)
  - `resources`: array of strings (links to additional resources)
  - `expectedOutcome`: string (what the completed project should do)

## Data Relationships

### Chapter → Diagram
- One-to-Many relationship
- A chapter can contain multiple diagrams

### Chapter → CodeExample
- One-to-Many relationship
- A chapter can contain multiple code examples

## Validation Rules

1. **Chapter validation**:
   - `id` must be unique
   - `wordCount` must be between 800 and 1500 (as per spec)
   - `order` must be a positive integer
   - `title` must not be empty

2. **Diagram validation**:
   - `altText` must not be empty (for accessibility compliance)
   - `type` must be one of: "mermaid", "d3", "static-image"
   - `chapterId` must reference an existing chapter

3. **CodeExample validation**:
   - `language` must be a valid programming language identifier
   - `code` must not be empty
   - `chapterId` must reference an existing chapter
   - `environment` must match specified software stack requirements

4. **CapstoneProject validation**:
   - `title` must not be empty
   - `description` must not be empty
   - `requirements` must contain at least one requirement
   - `steps` must contain at least one step

## State Transitions

### Chapter States (for content development)
- `draft` → `in-review` → `approved` → `published`

## Data Storage Strategy

Since the application is built as a static site for GitHub Pages:

1. **Content Data**: Chapters, diagrams, and code examples are pre-built as static MDX files
2. **Navigation Data**: Sidebar configuration stored in `sidebars.js`
3. **Assets**: Images and diagrams stored in `static/img/` directory
4. **No User Data**: No user-specific data is stored as per feature requirements

This approach provides fast loading times and global CDN distribution while maintaining the static content delivery requirement.