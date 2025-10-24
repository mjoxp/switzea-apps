// ============================================================
// SWITZEA SHARED UTILITIES
// Fælles funktioner brugt på tværs af alle apps
// ============================================================

import { auth, db, firestoreModules, authModules } from './firebase-config.js';

// ============================================================
// AUTHENTICATION
// ============================================================

/**
 * Check if user is authenticated
 * Redirects to login if not authenticated
 * @returns {Promise<User>} Authenticated user
 */
export async function checkAuth() {
    return new Promise((resolve, reject) => {
        authModules.onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log('✅ User authenticated:', user.email);
                resolve(user);
            } else {
                console.log('❌ No user - redirecting to login');
                window.location.href = 'index.html';
                reject(new Error('Not authenticated'));
            }
        });
    });
}

/**
 * Logout current user
 */
export async function handleLogout() {
    if (!confirm('Er du sikker på at du vil logge ud?')) {
        return false;
    }
    
    try {
        await authModules.signOut(auth);
        window.location.href = 'index.html';
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        alert('Fejl ved logout: ' + error.message);
        return false;
    }
}

/**
 * Get current user info
 */
export function getCurrentUser() {
    return auth.currentUser;
}

// ============================================================
// FIRESTORE CRUD OPERATIONS
// ============================================================

/**
 * Create a new document in Firestore
 * @param {string} collectionName - Name of collection
 * @param {object} data - Data to save
 * @returns {Promise<string>} Document ID
 */
export async function createDocument(collectionName, data) {
    const { collection, addDoc } = firestoreModules;
    
    try {
        const docRef = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: new Date().toISOString(),
            createdBy: auth.currentUser?.uid || 'unknown'
        });
        
        console.log('✅ Document created:', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('❌ Create error:', error);
        throw error;
    }
}

/**
 * Get all documents from a collection
 * @param {string} collectionName - Name of collection
 * @param {string} orderByField - Field to order by (optional)
 * @param {string} orderDirection - 'asc' or 'desc' (default: 'desc')
 * @returns {Promise<Array>} Array of documents
 */
export async function getAllDocuments(collectionName, orderByField = 'createdAt', orderDirection = 'desc') {
    const { collection, getDocs, query, orderBy } = firestoreModules;
    
    try {
        const q = query(
            collection(db, collectionName),
            orderBy(orderByField, orderDirection)
        );
        
        const snapshot = await getDocs(q);
        const documents = [];
        
        snapshot.forEach((doc) => {
            documents.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        console.log('✅ Loaded', documents.length, 'documents from', collectionName);
        return documents;
    } catch (error) {
        console.error('❌ Load error:', error);
        return [];
    }
}

/**
 * Update a document in Firestore
 * @param {string} collectionName - Name of collection
 * @param {string} docId - Document ID
 * @param {object} data - Data to update
 */
export async function updateDocument(collectionName, docId, data) {
    const { doc, updateDoc } = firestoreModules;
    
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, {
            ...data,
            updatedAt: new Date().toISOString()
        });
        
        console.log('✅ Document updated:', docId);
        return true;
    } catch (error) {
        console.error('❌ Update error:', error);
        throw error;
    }
}

/**
 * Delete a document from Firestore
 * @param {string} collectionName - Name of collection
 * @param {string} docId - Document ID
 */
export async function deleteDocument(collectionName, docId) {
    const { doc, deleteDoc } = firestoreModules;
    
    if (!confirm('Er du sikker på at du vil slette?')) {
        return false;
    }
    
    try {
        await deleteDoc(doc(db, collectionName, docId));
        console.log('✅ Document deleted:', docId);
        return true;
    } catch (error) {
        console.error('❌ Delete error:', error);
        throw error;
    }
}

// ============================================================
// UTILITY FUNCTIONS
// ============================================================

/**
 * Format date to Danish format (DD-MM-YYYY)
 */
export function formatDanishDate(dateString) {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}-${month}-${year}`;
}

/**
 * Show success message
 */
export function showSuccess(message) {
    alert('✅ ' + message);
}

/**
 * Show error message
 */
export function showError(message) {
    alert('❌ ' + message);
}

/**
 * Validate required fields
 */
export function validateRequired(fields) {
    for (const [name, value] of Object.entries(fields)) {
        if (!value || value.trim() === '') {
            showError(`Udfyld venligst: ${name}`);
            return false;
        }
    }
    return true;
}

console.log('✅ Shared utilities loaded');