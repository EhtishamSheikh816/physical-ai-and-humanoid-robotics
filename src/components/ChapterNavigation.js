import React, { useState, useEffect } from 'react';
import { useLocation, useHistory } from '@docusaurus/router';

// Chapter navigation with prerequisite checking
const ChapterNavigation = ({ currentChapterId, chapters }) => {
  const location = useLocation();
  const [availableChapters, setAvailableChapters] = useState([]);

  // Define chapter prerequisites - each chapter may depend on previous ones
  const chapterPrerequisites = {
    'ros2-fundamentals': [], // No prerequisites
    'gazebo-simulation': ['ros2-fundamentals'],
    'unity-integration': ['ros2-fundamentals'],
    'isaac-sim': ['ros2-fundamentals', 'gazebo-simulation'],
    'vla-models': ['ros2-fundamentals', 'isaac-sim'],
    'capstone-project': ['ros2-fundamentals', 'gazebo-simulation', 'isaac-sim', 'vla-models']
  };

  // Check if a chapter is unlocked based on completed prerequisites
  const isChapterUnlocked = (chapterId) => {
    const prerequisites = chapterPrerequisites[chapterId] || [];

    // If no prerequisites, chapter is unlocked
    if (prerequisites.length === 0) {
      return true;
    }

    // Check if all prerequisites are completed
    return prerequisites.every(prereqId => {
      const progressData = localStorage.getItem(`progress_${prereqId}`);
      if (progressData) {
        const progress = JSON.parse(progressData);
        return progress.completed === true;
      }
      return false;
    });
  };

  // Update available chapters when location or chapters change
  useEffect(() => {
    if (chapters && chapters.length > 0) {
      const updatedChapters = chapters.map(chapter => ({
        ...chapter,
        isUnlocked: isChapterUnlocked(chapter.id),
        isCurrent: chapter.id === currentChapterId
      }));
      setAvailableChapters(updatedChapters);
    }
  }, [location, chapters, currentChapterId]);

  // Get previous and next chapters
  const getCurrentChapterIndex = () => {
    return availableChapters.findIndex(chapter => chapter.id === currentChapterId);
  };

  const getPreviousChapter = () => {
    const currentIndex = getCurrentChapterIndex();
    if (currentIndex > 0) {
      return availableChapters[currentIndex - 1];
    }
    return null;
  };

  const getNextChapter = () => {
    const currentIndex = getCurrentChapterIndex();
    if (currentIndex < availableChapters.length - 1) {
      return availableChapters[currentIndex + 1];
    }
    return null;
  };

  const previousChapter = getPreviousChapter();
  const nextChapter = getNextChapter();

  return (
    <div className="chapter-navigation">
      <hr className="divider" />
      <div className="navigation-links">
        <div className="prev-link">
          {previousChapter && (
            <a
              href={previousChapter.path || `/docs/chapters/${previousChapter.id}`}
              className={`button button--${previousChapter.isUnlocked ? 'primary' : 'secondary'} button--outline`}
              disabled={!previousChapter.isUnlocked}
            >
              ← Previous: {previousChapter.title}
            </a>
          )}
        </div>

        <div className="next-link">
          {nextChapter && (
            <a
              href={nextChapter.path || `/docs/chapters/${nextChapter.id}`}
              className={`button button--${nextChapter.isUnlocked ? 'primary' : 'secondary'} button--outline`}
              disabled={!nextChapter.isUnlocked}
            >
              Next: {nextChapter.title} →
            </a>
          )}
        </div>
      </div>

      <div className="chapter-list">
        <h4>Chapter List:</h4>
        <ul className="chapter-list-ul">
          {availableChapters.map((chapter, index) => (
            <li
              key={chapter.id}
              className={`chapter-list-item ${chapter.isCurrent ? 'current-chapter' : ''} ${!chapter.isUnlocked ? 'locked-chapter' : ''}`}
            >
              {chapter.isUnlocked ? (
                <a
                  href={chapter.path || `/docs/chapters/${chapter.id}`}
                  className={chapter.isCurrent ? 'current' : ''}
                >
                  {index + 1}. {chapter.title}
                  {chapter.isCurrent && <span className="current-indicator"> (Current)</span>}
                </a>
              ) : (
                <span className="locked">
                  {index + 1}. {chapter.title} (Locked - Complete Prerequisites)
                </span>
              )}

              {!chapter.isUnlocked && chapterPrerequisites[chapter.id] && chapterPrerequisites[chapter.id].length > 0 && (
                <div className="prerequisites">
                  <small>
                    Prerequisites: {chapterPrerequisites[chapter.id].map(prereqId => {
                      const prereqChapter = availableChapters.find(c => c.id === prereqId);
                      return prereqChapter ? prereqChapter.title : prereqId;
                    }).join(', ')}
                  </small>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <hr className="divider" />
    </div>
  );
};

// Default chapters structure for the textbook
const defaultChapters = [
  { id: 'ros2-fundamentals', title: 'ROS 2 Fundamentals', path: '/docs/chapters/ros2-fundamentals' },
  { id: 'gazebo-simulation', title: 'Gazebo Simulation', path: '/docs/chapters/gazebo-simulation' },
  { id: 'unity-integration', title: 'Unity Integration', path: '/docs/chapters/unity-integration' },
  { id: 'isaac-sim', title: 'Isaac Sim', path: '/docs/chapters/isaac-sim' },
  { id: 'vla-models', title: 'VLA Models', path: '/docs/chapters/vla-models' },
  { id: 'capstone-project', title: 'Capstone Project', path: '/docs/chapters/capstone-project' }
];

// Wrapper component that uses default chapters if none provided
const ChapterNavigationWrapper = ({ currentChapterId, chapters = defaultChapters }) => {
  return (
    <ChapterNavigation
      currentChapterId={currentChapterId}
      chapters={chapters}
    />
  );
};

export default ChapterNavigationWrapper;