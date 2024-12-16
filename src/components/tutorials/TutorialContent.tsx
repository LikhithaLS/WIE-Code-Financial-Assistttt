import React, { useState } from 'react';
import type { Tutorial, QuizQuestion } from '../../types';

interface TutorialContentProps {
  tutorial: Tutorial;
  onComplete: (id: string) => void;
}

export default function TutorialContent({ tutorial, onComplete }: TutorialContentProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const handleAnswer = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleComplete = () => {
    const allCorrect = tutorial.content
      .flatMap(content => content.quizQuestions || [])
      .every((question, index) => question.correctAnswer === answers[index]);

    if (allCorrect) {
      onComplete(tutorial.id);
    }
  };

  const currentContent = tutorial.content[currentStep];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-4">{currentContent.title}</h2>
        <div className="prose max-w-none">
          {currentContent.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>

        {currentContent.quizQuestions && (
          <div className="mt-8 space-y-6">
            {currentContent.quizQuestions.map((question, qIndex) => (
              <div key={question.id} className="space-y-4">
                <p className="font-medium">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, oIndex) => (
                    <label key={oIndex} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                        checked={answers[qIndex] === oIndex}
                        onChange={() => handleAnswer(qIndex, oIndex)}
                        className="h-4 w-4 text-purple-600"
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(step => step - 1)}
          disabled={currentStep === 0}
          className="px-4 py-2 text-purple-600 disabled:text-gray-400"
        >
          Previous
        </button>
        {currentStep === tutorial.content.length - 1 ? (
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Complete Tutorial
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(step => step + 1)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}