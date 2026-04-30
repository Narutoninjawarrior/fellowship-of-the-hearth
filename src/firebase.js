import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fellowship-of-the-hearth.firebaseapp.com",
  projectId: "fellowship-of-the-hearth",
  storageBucket: "fellowship-of-the-hearth.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || ""
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
