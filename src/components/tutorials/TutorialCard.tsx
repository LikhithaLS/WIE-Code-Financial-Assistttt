import React from 'react';
import { CheckCircle, ChevronRight } from 'lucide-react';
import type { Tutorial } from '../../types';

interface TutorialCardProps {
  tutorial: Tutorial;
  onStart: (id: string) => void;
}

export default function TutorialCard({ tutorial, onStart }: TutorialCardProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{tutorial.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{tutorial.description}</p>
          <div className="flex items-center space-x-2 mt-2">
            <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full capitalize">
              {tutorial.category}
            </span>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full capitalize">
              {tutorial.difficulty}
            </span>
          </div>
        </div>
        {tutorial.completed ? (
          <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
        ) : (
          <button
            onClick={() => onStart(tutorial.id)}
            className="flex items-center text-sm text-purple-600 hover:text-purple-700"
          >
            Start
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        )}
      </div>
    </div>
  );
}