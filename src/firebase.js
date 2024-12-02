// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Firestore
import { getStorage } from "firebase/storage"; // Firebase Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_tdo8dVVpSYSGpx2lo4cfBOGQR6Ok2ns",
  authDomain: "camseltry.firebaseapp.com",
  projectId: "camseltry",
  storageBucket: "camseltry.appspot.com",
  messagingSenderId: "855349177144",
  appId: "1:855349177144:web:403cfa7bd3e0bd151eefcd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Firebase Storage
const db = getFirestore(app);
const storage = getStorage(app); // Firebase Storage

// Export both db and storage
export { db, storage };
