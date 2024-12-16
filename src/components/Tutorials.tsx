import React, { useState } from 'react';
import { BookOpen } from 'lucide-react';
import type { Tutorial } from '../types';
import TutorialCard from './tutorials/TutorialCard';
import TutorialContent from './tutorials/TutorialContent';

const TUTORIALS: Tutorial[] = [
  {
    id: '1',
    title: 'Understanding Investment Basics',
    description: 'Learn the fundamentals of investing and building wealth.',
    category: 'investment',
    completed: false,
    difficulty: 'beginner',
    content: [
      {
        id: '1-1',
        title: 'What is Investing?',
        content: 'Investing is the act of allocating resources, usually money, with the expectation of generating an income or profit...',
        quizQuestions: [
          {
            id: '1-1-1',
            question: 'What is the primary goal of investing?',
            options: [
              'To spend money',
              'To generate returns',
              'To lose money',
              'To avoid taxes'
            ],
            correctAnswer: 1
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Budgeting 101',
    description: 'Master the basics of personal budgeting.',
    category: 'budgeting',
    completed: false,
    difficulty: 'beginner',
    content: [
      {
        id: '2-1',
        title: 'Creating Your First Budget',
        content: 'A budget is a financial plan that helps you track your income and expenses...',
        quizQuestions: [
          {
            id: '2-1-1',
            question: 'What is the 50/30/20 rule?',
            options: [
              'A diet plan',
              'A workout routine',
              'A budgeting principle for needs, wants, and savings',
              'A sleeping schedule'
            ],
            correctAnswer: 2
          }
        ]
      }
    ]
  }
];

export default function Tutorials() {
  const [tutorials, setTutorials] = useState<Tutorial[]>(TUTORIALS);
  const [activeTutorial, setActiveTutorial] = useState<string | null>(null);

  const handleStartTutorial = (id: string) => {
    setActiveTutorial(id);
  };

  const handleCompleteTutorial = (id: string) => {
    setTutorials(tutorials.map(tutorial =>
      tutorial.id === id ? { ...tutorial, completed: true } : tutorial
    ));
    setActiveTutorial(null);
  };

  const currentTutorial = tutorials.find(t => t.id === activeTutorial);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center mb-6">
        <BookOpen className="h-6 w-6 text-purple-600" />
        <h2 className="ml-2 text-xl font-semibold text-gray-900">Learning Center</h2>
      </div>

      {currentTutorial ? (
        <TutorialContent
          tutorial={currentTutorial}
          onComplete={handleCompleteTutorial}
        />
      ) : (
        <div className="space-y-4">
          {tutorials.map(tutorial => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              onStart={handleStartTutorial}
            />
          ))}
        </div>
      )}
    </div>
  );
}