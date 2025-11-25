
export enum ExerciseType {
  MULTIPLE_CHOICE = 'multiple_choice',
  TRUE_FALSE = 'true_false',
  SHORT_ANSWER = 'short_answer', // Includes Fill-in-the-blank
  MATCHING = 'matching', // Drag & drop pairing
  ORDERING = 'ordering', // Sequence
  INTERACTIVE = 'interactive' // Simulation/Game placeholder
}

export interface Exercise {
  id: string;
  topicId: string;
  statement: string; // The question, scenario, or story
  type: ExerciseType;
  
  // Multiple Choice / True False
  options?: string[];
  correctAnswer?: number; // index of correct option
  
  // Short Answer / Fill-in
  correctText?: string; // The expected string (case insensitive check)
  
  // Matching
  pairs?: { left: string; right: string }[]; // The correct pairs
  
  // Ordering
  sequenceItems?: string[]; // The items in the CORRECT order
  
  explanation: string;
}

export interface Flashcard {
  id: string;
  disciplineId: string;
  moduleId?: string; // Optional linkage to specific module
  front: string; // Question or Concept
  back: string; // Answer or Definition
  
  // SRS Fields (Anki-like)
  nextReviewDate: Date;
  interval: number; // in days
  easeFactor: number; // default 2.5
  repetitions: number;
}

export interface Topic {
  id: string;
  moduleId: string;
  title: string;
  content: string; // Markdown or HTML
  order: number;
  isCompleted: boolean;
  exercises?: Exercise[];
}

export interface Module {
  id: string;
  disciplineId: string;
  title: string;
  description: string;
  order: number;
  topics: Topic[];
}

export interface Discipline {
  id: string;
  name: string; // e.g., Mathematics
  description: string;
  progress: number; // 0-100
  color: string;
  modules: Module[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

export interface Teacher {
  id: string;
  name: string;
  specialty: string;
  avatarUrl?: string;
  bio: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin'; // Added 'admin'
  targetCourse?: string; // Student only
  academicLevel?: number; // Student only
  streakDays?: number; // Student only
  totalXP?: number; // Student only
  teacherId?: string; // Student only
  
  // Teacher specific fields
  specialty?: string;
  bio?: string;
  
  // Admin specific
  lastLogin?: Date;
  status?: 'active' | 'inactive';
}

export interface Recommendation {
  id: string;
  type: 'content' | 'exercise';
  title: string;
  reason: string;
  targetId: string;
}
