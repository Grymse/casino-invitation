import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase configuration
// NOTE: Replace these values with your actual Firebase project configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA-QTkvdobCKIiEIXCi0-V4CXK8e2IuUdg',
  authDomain: 'fake-stocks-5587a.firebaseapp.com',
  projectId: 'fake-stocks-5587a',
  storageBucket: 'fake-stocks-5587a.firebasestorage.app',
  messagingSenderId: '843416322475',
  appId: '1:843416322475:web:a3c7aacf2b5d75ce3f52ee',
  measurementId: 'G-K6EMRRBT43',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
const db = getFirestore(app)

export { db }
