// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDOj2KdXXNg_CKcMFE3sgAHa5XRI6doKL4",
    authDomain: "dashboard-4246d.firebaseapp.com",
    projectId: "dashboard-4246d",
    storageBucket: "dashboard-4246d.appspot.com",
    messagingSenderId: "87531142436",
    appId: "1:87531142436:web:78dc8fd04f61391c8d47b1",
    measurementId: "G-H0TWS9Q8KL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);