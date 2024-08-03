import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyBDmPWJTNvxv_7d1WELmmdFVwygRo6tefM",
    authDomain: "smit-reg-form.firebaseapp.com",
    projectId: "smit-reg-form",
    storageBucket: "smit-reg-form.appspot.com",
    messagingSenderId: "316026250367",
    appId: "1:316026250367:web:30102ceb34da2641e94b4a"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage();
const db = getFirestore(app);

export{
    app,
    storage, 
    ref, 
    uploadBytesResumable, 
    getDownloadURL,
    db, 
    doc, 
    setDoc,
    getDoc
}

