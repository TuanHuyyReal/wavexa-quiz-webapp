const firebaseConfig = {
  apiKey: "AIzaSyBEvfO_opYWpdNo795UNFp943W-2vv1HHA",
  authDomain: "quiz-homework-68bfd.firebaseapp.com",
  projectId: "quiz-homework-68bfd",
  storageBucket: "quiz-homework-68bfd.firebasestorage.app",
  messagingSenderId: "60614184865",
  appId: "1:60614184865:web:5f39d14ffdc61b462405e0",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export { db, auth };
