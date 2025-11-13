// categories: general, maths, tech
const QUIZ_QUESTIONS = [
  {
    id: 1, category: "general", difficulty: "easy",
    question: "What is the capital of India?",
    options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
    answerIndex: 1, timeLimitSec: 15
  },
  {
    id: 2, category: "maths", difficulty: "easy",
    question: "2 + 2 * 2 equals?",
    options: ["8", "6", "4", "2"],
    answerIndex: 1, timeLimitSec: 12
  },
  {
    id: 3, category: "tech", difficulty: "medium",
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "Python", "CSS", "Java"],
    answerIndex: 2, timeLimitSec: 18
  },
  {
    id: 4, category: "general", difficulty: "medium",
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Venus", "Mars", "Jupiter"],
    answerIndex: 2, timeLimitSec: 15
  },
  {
    id: 5, category: "maths", difficulty: "hard",
    question: "Integral of 2x dx is?",
    options: ["x^2 + C", "2x + C", "x^2/2 + C", "ln x + C"],
    answerIndex: 0, timeLimitSec: 20
  },
  {
    id: 6, category: "tech", difficulty: "hard",
    question: "What does 'HTTP' stand for?",
    options: ["HyperText Transfer Protocol", "HighText Transfer Protocol", "Hyperloop Transfer Protocol", "HyperText Transmission Protocol"],
    answerIndex: 0, timeLimitSec: 18
  }
];

const CATEGORIES = Array.from(new Set(QUIZ_QUESTIONS.map(q => q.category)));
