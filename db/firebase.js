// firebase.js

// Importa los módulos necesarios desde el CDN de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

// Configuración de tu proyecto de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBYiLHEgmP5EU-aiJW6neyzGSNJjTjhbzg",
  authDomain: "alquimic-pro.firebaseapp.com",
  projectId: "alquimic-pro",
  storageBucket: "alquimic-pro.firebasestorage.app",
  messagingSenderId: "54440660896",
  appId: "1:54440660896:web:13ac5892dcdb354211dec5",
  measurementId: "G-TSPH8Z0NCN"
};

// Inicializa Firebase, Analytics y Firestore
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Exporta Firestore para usarlo en otros archivos
export { db };
