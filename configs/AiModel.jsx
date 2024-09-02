/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require('@google/generative-ai');

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: 'application/json',
};

export const GenerateCourseLayout = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Generate A Course Tutorial on Following Detail with field as Course Name, Description, along with Chapter Name, About, Duration: Category: ‘Programming’, Topic: Python, Level: Basic, Duration:1 hour, NoOfChapters:5, in JSON format',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```json\n{\n  "course": {\n    "name": "Python Programming Fundamentals",\n    "description": "This course provides a comprehensive introduction to Python programming, covering the basics of syntax, data types, operators, control flow, functions, and modules. You will learn how to write clear, efficient, and readable Python code.",\n    "chapters": [\n      {\n        "name": "Introduction to Python",\n        "about": "This chapter introduces the Python programming language, its history, applications, and its advantages.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Basic Syntax and Data Types",\n        "about": "This chapter covers the fundamental syntax of Python, including variables, data types, operators, and basic input/output operations.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Control Flow Statements",\n        "about": "This chapter explores control flow statements like conditional statements (if-else), loops (for, while), and the concept of indentation in Python.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Functions and Modules",\n        "about": "This chapter introduces the concept of functions, their creation, calling, and parameters. It also covers the use of built-in and custom modules.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Basic Data Structures",\n        "about": "This chapter explores basic data structures like lists, tuples, dictionaries, and sets, along with their operations and use cases.",\n        "duration": "10 minutes"\n      }\n    ],\n    "category": "Programming",\n    "topic": "Python",\n    "level": "Basic",\n    "duration": "1 hour",\n    "noOfChapters": 5\n  }\n}\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage('INSERT_INPUT_HERE');
// console.log(result.response.text());
