import firebase from "firebase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
    apiKey: "AIzaSyDOj2KdXXNg_CKcMFE3sgAHa5XRI6doKL4",
    authDomain: "dashboard-4246d.firebaseapp.com",
    projectId: "dashboard-4246d",
    storageBucket: "dashboard-4246d.appspot.com",
    messagingSenderId: "87531142436",
    appId: "1:87531142436:web:78dc8fd04f61391c8d47b1",
    measurementId: "G-H0TWS9Q8KL"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);



export {firebase}