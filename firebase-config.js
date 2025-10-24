// ============================================================
// SWITZEA FIREBASE CONFIGURATION
// Inkluder denne fil i alle apps
// ============================================================

import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, deleteDoc, query, orderBy, where, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBQoq8Y4H-fY8XbkKa5nEloDYQA3jzPPkg",
    authDomain: "switzea-test.firebaseapp.com",
    projectId: "switzea-test",
    storageBucket: "switzea-test.firebasestorage.app",
    messagingSenderId: "1006466000903",
    appId: "1:1006466000903:web:aad0adfb1ab1e5f852e2a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Export Firestore modules
export const firestoreModules = {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where,
    serverTimestamp
};

// Export Auth modules
export const authModules = {
    onAuthStateChanged,
    signOut
};

console.log('✅ Firebase initialized');