// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyAF4wpt73ylhXm5N4iK2hCEOkrRLgkLRYo",
    authDomain: "media-minds-8b8d0.firebaseapp.com",
    projectId: "media-minds-8b8d0",
    storageBucket: "media-minds-8b8d0.appspot.com",
    messagingSenderId: "117891124264",
    appId: "1:117891124264:web:78c9bcdbdd683f02dff91d",
    measurementId: "G-R3KB6CVMQB"
  };
// Initialize Firebase app
export const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);

// Example of adding data to Firestore
const storeDataInFirestore = async (data) => {
  try {
    const docRef = await addDoc(collection(db, 'your-collection-name'), data);
    console.log('Document written with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding document:', error);
  }
};

console.log(db)

storeDataInFirestore({ key: 'value' });
