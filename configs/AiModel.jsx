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
          text: '```json\n{\n  "course": {\n    "name": "Python Programming Fundamentals",\n    "description": "This course provides a comprehensive introduction to Python programming, covering the basics of syntax, data types, operators, control flow, functions, and modules. You will learn how to write clear, efficient, and readable Python code.",\n    "chapters": [\n      {\n        "name": "Introduction to Python",\n        "about": "This chapter introduces the Python programming language, its history, applications, and its advantages.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Basic Syntax and Data Types",\n        "about": "This chapter covers the fundamental syntax of Python, including variables, data types, operators, and basic input/output operations.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Control Flow Statements",\n        "about": "This chapter explores control flow statements like conditional statements (if-else), loops (for, while), and the concept of indentation in Python.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Functions and Modules",\n        "about": "This chapter introduces the concept of functions, their creation, calling, and parameters. It also covers the use of built-in and custom modules.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Basic Data Structures",\n        "about": "This chapter explores basic data structures like lists, tuples, dictionaries, and sets, along with their operations and use cases.",\n        "duration": "10 minutes"\n      }\n    ],\n    "category": "Programming",\n    "topic": "Python",\n    "level": "Beginner",\n    "duration": "1 hour",\n    "noOfChapters": 5\n  }\n}\n```',
        },
      ],
    },
  ],
});

// const result = await chatSession.sendMessage('INSERT_INPUT_HERE');
// console.log(result.response.text());

export const GenerateCourseChapter_AI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: 'user',
      parts: [
        {
          text: 'Explain the concept in Detail on Topic: Python Basic, Chapter:Variables and Data Types, in JSON Format with list of array with field as title, explanation on given chapter detail, Code Example(Code field in <precode> format) if applicable',
        },
      ],
    },
    {
      role: 'model',
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "Introduction to Variables",\n    "explanation": "Variables are like containers that store data in your Python program. They allow you to give meaningful names to pieces of information so you can easily access and manipulate them.",\n    "code_example": "<precode>name = \\"Alice\\"  # Storing a string value\\nage = 30      # Storing an integer value\\nprint(name)  # Output: Alice\\nprint(age)   # Output: 30</precode>"\n  },\n  {\n    "title": "Variable Naming Rules",\n    "explanation": "- Variable names must start with a letter (a-z, A-Z) or an underscore (_).\\n- They can contain letters, numbers, and underscores.\\n- Variable names are case-sensitive (e.g., `age` is different from `Age`).\\n- It\'s best to choose descriptive names that reflect the data they store.",\n    "code_example": "<precode>my_variable = 10  # Valid variable name\\n_another_variable = 20  # Valid\\n2nd_variable = 30  # Invalid (starts with a number)\\nmy-variable = 40  # Invalid (contains a hyphen)</precode>"\n  },\n  {\n    "title": "Data Types",\n    "explanation": "Python has various built-in data types to represent different kinds of information:\\n\\n- **Integer (int):** Whole numbers (e.g., 10, -5, 0)\\n- **Float (float):** Numbers with decimal points (e.g., 3.14, -2.5)\\n- **String (str):** Text enclosed in quotes (e.g., \\"Hello\\", \'Python\')\\n- **Boolean (bool):** Represents truth values (True or False)\\n- **List (list):** Ordered collections of items (e.g., [1, 2, 3], [\'apple\', \'banana\'])",\n    "code_example": "<precode>age = 25        # Integer\\nprice = 19.99   # Float\\nmessage = \\"Hello\\"  # String\\nis_active = True    # Boolean\\nfruits = [\'apple\', \'banana\', \'orange\']  # List</precode>"\n  },\n  {\n    "title": "Data Type Conversions",\n    "explanation": "You can convert data from one type to another using built-in functions:\\n\\n- **int():** Convert to integer\\n- **float():** Convert to float\\n- **str():** Convert to string\\n- **bool():** Convert to boolean",\n    "code_example": "<precode>number = \\"10\\"    # String representation of a number\\ninteger_number = int(number)  # Convert to integer\\nprint(integer_number)  # Output: 10</precode>"\n  },\n  {\n    "title": "Variable Assignment",\n    "explanation": "You assign values to variables using the `=` operator. The value on the right side is assigned to the variable on the left side.",\n    "code_example": "<precode>x = 5  # Assigning the value 5 to the variable x\\ny = \\"Hello\\"   # Assigning the string \\"Hello\\" to the variable y</precode>"\n  },\n  {\n    "title": "Variable Reassignment",\n    "explanation": "You can change the value of a variable by assigning a new value to it.",\n    "code_example": "<precode>count = 10\\nprint(count)  # Output: 10\\ncount = count + 5  # Incrementing the value\\nprint(count)  # Output: 15</precode>"\n  }\n]\n```',
        },
      ],
    },
  ],
});
