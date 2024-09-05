// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'next-ai-course-generator.firebaseapp.com',
  projectId: 'next-ai-course-generator',
  storageBucket: 'next-ai-course-generator.appspot.com',
  messagingSenderId: '500987348169',
  appId: '1:500987348169:web:a4913df06dfc36fd69b918',
  measurementId: 'G-K19T7N8PMJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const storage = getStorage(app);
