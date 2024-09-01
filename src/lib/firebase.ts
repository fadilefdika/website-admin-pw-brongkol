// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBqbcAjO5xjwZzzrZbWJADs3igRA4a1s6o',
  authDomain: 'brongkol-backend-4d1a5.firebaseapp.com',
  projectId: 'brongkol-backend-4d1a5',
  storageBucket: 'brongkol-backend-4d1a5.appspot.com',
  messagingSenderId: '1001776365979',
  appId: '1:1001776365979:web:18763a12b7917290cc613e',
  measurementId: 'G-EQ22WX4KDG',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
