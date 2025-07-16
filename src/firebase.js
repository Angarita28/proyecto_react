import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider,signOut} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "AIzaSyDh9z50OIaa1fJXPflw8Xz8i9BUsQhrJu0",
  authDomain: "proyectoreact-841ce.firebaseapp.com",
  projectId: "proyectoreact-841ce",
  storageBucket: "proyectoreact-841ce.firebasestorage.app",
  messagingSenderId: "790998690520",
  appId: "1:790998690520:web:d408122402965a7a80c5ad",
  measurementId: "G-C01Y9X507V"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

//FireStore
const db = getFirestore(app);
export { auth, provider, db, signOut };
