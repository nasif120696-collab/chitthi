// ==========================================================================
// CHITTHI (চিঠি) — Live Firebase Configuration (Project: chithi-a67f5)
// ==========================================================================

export const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAjXPeK1X9LGgYqIrUXanSlacQ1vHcBDxc",
  authDomain: "chithi-a67f5.firebaseapp.com",
  projectId: "chithi-a67f5",
  storageBucket: "chithi-a67f5.firebasestorage.app",
  messagingSenderId: "674416603310",
  appId: "1:674416603310:web:52912df73163cd2f337d3f",
  measurementId: "G-2T48W81GRK"
};

export function isFirebaseConfigured() {
  return Boolean(
    FIREBASE_CONFIG &&
    typeof FIREBASE_CONFIG.apiKey === "string" &&
    FIREBASE_CONFIG.apiKey !== "YOUR_API_KEY" &&
    FIREBASE_CONFIG.projectId !== "YOUR_PROJECT_ID"
  );
}
