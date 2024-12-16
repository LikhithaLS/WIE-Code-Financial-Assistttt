export interface Expense {
  id: string;
  amount: number;
  category: ExpenseCategory;
  description: string;
  date: string;
}

export type ExpenseCategory = 
  | 'food'
  | 'travel'
  | 'education'
  | 'shopping'
  | 'healthcare'
  | 'utilities'
  | 'entertainment'
  | 'other';

export interface Goal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: GoalCategory;
  progress: number;
}

export type GoalCategory = 
  | 'emergency_fund'
  | 'education'
  | 'home'
  | 'travel'
  | 'retirement'
  | 'other';

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  category: TutorialCategory;
  completed: boolean;
  content: TutorialContent[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface TutorialContent {
  id: string;
  title: string;
  content: string;
  quizQuestions?: QuizQuestion[];
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export type TutorialCategory = 
  | 'investment'
  | 'savings'
  | 'budgeting'
  | 'debt_management'
  | 'retirement';