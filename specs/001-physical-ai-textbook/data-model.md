# Data Model: Physical AI & Humanoid Robotics Textbook

## Overview

This document defines the data model for the Physical AI & Humanoid Robotics textbook application, focusing on client-side data structures and GitHub Gists API integration for progress tracking.

## Core Entities

### User
- **Description**: Represents an authenticated user account
- **Fields**:
  - `id`: string (GitHub user ID)
  - `username`: string (GitHub username)
  - `email`: string (GitHub email)
  - `avatarUrl`: string (GitHub profile image URL)
  - `createdAt`: timestamp
  - `lastLoginAt`: timestamp
  - `preferences`: object (user preferences like theme, accessibility settings)

### Chapter
- **Description**: A self-contained unit of learning content
- **Fields**:
  - `id`: string (unique identifier, typically filename)
  - `title`: string (chapter title)
  - `module`: string (associated module: ROS2, Gazebo, Unity, Isaac, VLA, Capstone)
  - `wordCount`: number (estimated word count)
  - `estimatedReadingTime`: number (in minutes)
  - `prerequisites`: array of strings (chapter IDs that should be completed first)
  - `learningObjectives`: array of strings (what the user should learn)
  - `contentPath`: string (path to MDX file)

### ProgressRecord
- **Description**: Tracks a user's progress through a specific chapter
- **Fields**:
  - `userId`: string (foreign key to User)
  - `chapterId`: string (foreign key to Chapter)
  - `completedAt`: timestamp (when chapter was marked complete)
  - `completionPercentage`: number (0-100)
  - `timeSpent`: number (in seconds)
  - `notes`: string (user's personal notes on the chapter)
  - `codeExamplesCompleted`: array of strings (IDs of completed code examples)

### CodeExample
- **Description**: A runnable code snippet within a chapter
- **Fields**:
  - `id`: string (unique identifier)
  - `chapterId`: string (foreign key to Chapter)
  - `title`: string (brief description)
  - `language`: string (programming language)
  - `code`: string (the actual code)
  - `description`: string (what the example demonstrates)
  - `expectedOutput`: string (what the user should expect to see)

### CapstoneProject
- **Description**: The integrated project that combines concepts from multiple chapters
- **Fields**:
  - `id`: string (unique identifier)
  - `title`: string (project title)
  - `description`: string (project overview)
  - `requirements`: array of strings (what the project should accomplish)
  - `components`: array of strings (ROS 2, Gazebo, Isaac Sim, Unity components involved)
  - `milestones`: array of objects (progress checkpoints)
  - `resources`: array of strings (links to additional resources)

### UserCapstoneProgress
- **Description**: Tracks a user's progress on the capstone project
- **Fields**:
  - `userId`: string (foreign key to User)
  - `capstoneId`: string (foreign key to CapstoneProject)
  - `status`: string (not-started, in-progress, completed)
  - `milestoneProgress`: array of objects (status for each milestone)
  - `completedAt`: timestamp (when project was marked complete)
  - `notes`: string (user's notes on the project)

## Data Relationships

### User → ProgressRecord
- One-to-Many relationship
- A user can have progress records for multiple chapters

### Chapter → ProgressRecord
- One-to-Many relationship
- A chapter can have progress records from multiple users

### Chapter → CodeExample
- One-to-Many relationship
- A chapter can contain multiple code examples

### User → UserCapstoneProgress
- One-to-Many relationship
- A user can have progress on multiple capstone projects (if multiple exist)

### CapstoneProject → UserCapstoneProgress
- One-to-Many relationship
- A capstone project can have progress records from multiple users

## Validation Rules

1. **ProgressRecord validation**:
   - `completionPercentage` must be between 0 and 100
   - `completedAt` must be null if `completionPercentage` < 100
   - `userId` and `chapterId` combination must be unique

2. **User validation**:
   - `username` must be unique
   - `email` must be a valid email format

3. **Chapter validation**:
   - `id` must be unique
   - `wordCount` must be positive
   - `estimatedReadingTime` must be positive

## State Transitions

### ProgressRecord States
- `in-progress` (0% < completionPercentage < 100%)
- `completed` (completionPercentage = 100%)
- `not-started` (completionPercentage = 0%)

### Capstone Progress States
- `not-started`
- `in-progress`
- `completed`

## Data Storage Strategy

Since the application is built as a static site for GitHub Pages:

1. **Authentication Data**: Stored in browser's localStorage/sessionStorage with GitHub OAuth tokens
2. **Progress Data**: Stored in GitHub Gists associated with the user's GitHub account
3. **Static Content**: Chapters, code examples, and other content are pre-built as static files
4. **User Preferences**: Stored in browser's localStorage

This approach allows for user progress synchronization across devices while maintaining the static site architecture required for GitHub Pages deployment.