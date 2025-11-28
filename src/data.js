// simple mock data stored as JS object for initial load
export const initialCourses = [
  {
    id: "c1",
    title: "Introduction to C Programming",
    summary: "Basics of C, data types, control flow, functions",
    instructor: "Kondakari Shiva",
    lessons: [
      { id: "c1-l1", title: "Setup & Hello World", content: "Install GCC, write first program" },
      { id: "c1-l2", title: "Variables & Data Types", content: "int, float, char..." },
    ],
    quizzes: [
      {
        id: "q1",
        title: "C Basics Quiz",
        questions: [
          { id:"q1-1", text: "Which header is needed for printf?", options:["<stdio.h>","<stdlib.h>","<math.h>"], answer:0 },
          { id:"q1-2", text: "What is size of int (approx)?", options:["2 bytes","4 bytes","8 bytes"], answer:1 }
        ],
        passingScore: 50
      }
    ],
    certificate: { enabled:true, templateText: "Certificate of Completion: {name} completed {course}" }
  },
  {
    id: "c2",
    title: "Web Development Basics",
    summary: "HTML, CSS, JavaScript fundamentals",
    instructor: "KS-MA-JUNE-FIRST",
    lessons: [],
    quizzes: [],
    certificate: { enabled:true, templateText: "Certificate of Completion: {name} completed {course}" }
  }
];
