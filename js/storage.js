// ==========================================================================
// CHITTHI (চিঠি) — Resilient Live Firestore (chithi-a67f5) + Fallback Storage
// ==========================================================================

import { FIREBASE_CONFIG, isFirebaseConfigured } from "./firebase-config.js";

let db = null;
let firestoreModules = null;

function withTimeout(promise, ms = 5000) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error("Request timeout")), ms))
  ]);
}

async function initFirestore() {
  if (db) return db;
  if (!isFirebaseConfigured()) return null;
  try {
    const appMod = await withTimeout(
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js"),
      5000
    );
    const fsMod = await withTimeout(
      import("https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js"),
      5000
    );
    const app = appMod.initializeApp(FIREBASE_CONFIG);
    db = fsMod.getFirestore(app);
    firestoreModules = fsMod;
    return db;
  } catch (err) {
    console.warn("Firebase init fallback to local/URL mode:", err);
    return null;
  }
}

export function generateStampCode() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `BD-${num}`;
}

export function generateLetterId() {
  return "ltr_" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function encodePayload(obj) {
  try {
    const json = JSON.stringify(obj);
    const bytes = new TextEncoder().encode(json);
    let bin = "";
    bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  } catch (_) {
    return "";
  }
}

export function decodePayload(str) {
  try {
    let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
    while (b64.length % 4) b64 += "=";
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return JSON.parse(new TextDecoder().decode(bytes));
  } catch (_) {
    return null;
  }
}

export function getSentHistory() {
  try {
    return JSON.parse(localStorage.getItem("chitthi_sent_history") || "[]");
  } catch (_) {
    return [];
  }
}

export async function saveLetter(letterData) {
  const id = generateLetterId();
  const stampCode = generateStampCode();
  const pages = Array.isArray(letterData.pages) && letterData.pages.length
    ? letterData.pages
    : [letterData.body || ""];
  const record = {
    id,
    stampCode,
    toName: letterData.toName || "প্রিয় মানুষ",
    fromName: letterData.fromName || "বেনামী প্রেরক",
    envelopeAddress: letterData.envelopeAddress || "",
    targetBox: (letterData.targetBox || "").trim().toLowerCase(),
    occasion: letterData.occasion || "personal",
    body: letterData.body,
    pages,
    pageStyles: Array.isArray(letterData.pageStyles) ? letterData.pageStyles : [],
    paperTheme: letterData.paperTheme || "cream",
    deskTheme: letterData.deskTheme || "walnut",
    pageBgTheme: letterData.pageBgTheme || "default",
    coffeeStains: letterData.coffeeStains !== false,
    waxColor: letterData.waxColor || "crimson",
    stampId: letterData.stampId || "dhaka_curzon",
    penMode: letterData.penMode || "fountain",
    fontClass: letterData.fontClass || "font-noto-serif",
    aroma: letterData.aroma || "none",
    weatherMode: letterData.weatherMode || "golden",
    voiceNoteData: letterData.voiceNoteData || "",
    postmark: letterData.postmark || "ঢাকা জিপিও • সোনালি গোধূলি",
    songId: letterData.songId || "kichhu_manush",
    songTitle: letterData.songTitle || "কিছু মানুষ মরে যায় পঁচিশে",
    songUrl: letterData.songUrl || "",
    unlockAt: letterData.unlockAt || null,
    burnAfterReading: Boolean(letterData.burnAfterReading),
    keystrokes: (letterData.keystrokes || []).slice(0, 1000),
    reply: null,
    createdAt: Date.now()
  };

  try {
    const localVault = JSON.parse(localStorage.getItem("chitthi_letters") || "{}");
    localVault[id] = record;
    localStorage.setItem("chitthi_letters", JSON.stringify(localVault));

    const codeIndex = JSON.parse(localStorage.getItem("chitthi_codes") || "{}");
    codeIndex[stampCode] = id;
    localStorage.setItem("chitthi_codes", JSON.stringify(codeIndex));

    const sentHistory = JSON.parse(localStorage.getItem("chitthi_sent_history") || "[]");
    sentHistory.unshift({ id, stampCode, toName: record.toName, createdAt: record.createdAt });
    localStorage.setItem("chitthi_sent_history", JSON.stringify(sentHistory.slice(0, 25)));
  } catch (_) {}

  // Save to Firebase Firestore (with safe catch so UI never freezes if rules aren't published yet)
  let savedToCloud = false;
  try {
    const firestore = await initFirestore();
    if (firestore && firestoreModules) {
      const { doc, setDoc } = firestoreModules;
      await withTimeout(setDoc(doc(firestore, "letters", id), record), 5500);
      await withTimeout(
        setDoc(doc(firestore, "stampCodes", stampCode), { letterId: id, createdAt: record.createdAt }),
        5500
      );
      savedToCloud = true;
    }
  } catch (err) {
    console.warn("Firestore save warning (falling back to portable link):", err);
  }

  // Always embed a compact fallback payload (&d=...) so the link works everywhere (Messenger, WhatsApp, offline, or cloud)
  const compactRecord = {
    id: record.id,
    stampCode: record.stampCode,
    toName: record.toName,
    fromName: record.fromName,
    envelopeAddress: record.envelopeAddress,
    body: record.body,
    pages: record.pages,
    pageStyles: record.pageStyles,
    paperTheme: record.paperTheme,
    deskTheme: record.deskTheme,
    pageBgTheme: record.pageBgTheme,
    coffeeStains: record.coffeeStains,
    waxColor: record.waxColor,
    stampId: record.stampId,
    penMode: record.penMode,
    fontClass: record.fontClass,
    aroma: record.aroma,
    weatherMode: record.weatherMode,
    voiceNoteData: record.voiceNoteData && record.voiceNoteData.length < 18000 ? record.voiceNoteData : "",
    postmark: record.postmark,
    songId: record.songId,
    songTitle: record.songTitle,
    songUrl: record.songUrl,
    unlockAt: record.unlockAt,
    burnAfterReading: record.burnAfterReading,
    keystrokes: []
  };
  const encodedFallback = encodePayload(compactRecord);
  const baseUrl = window.location.origin + window.location.pathname.replace(/[^/]*$/, "");
  const shareUrl = encodedFallback
    ? `${baseUrl}open.html?id=${id}&d=${encodedFallback}`
    : `${baseUrl}open.html?id=${id}`;

  return { record, shareUrl, savedToCloud };
}

export async function getLetter(id, fallbackEncoded = null) {
  // 1. Try reading latest live document from Firebase Firestore (includes replies & burn status)
  try {
    const firestore = await initFirestore();
    if (firestore && firestoreModules && id) {
      const { doc, getDoc } = firestoreModules;
      const snap = await withTimeout(getDoc(doc(firestore, "letters", id)), 5000);
      if (snap.exists()) {
        return snap.data();
      }
    }
  } catch (e) {
    console.warn("Firestore read fallback:", e);
  }

  // 2. Check same-device localStorage
  try {
    const localVault = JSON.parse(localStorage.getItem("chitthi_letters") || "{}");
    if (id && localVault[id]) return localVault[id];
  } catch (_) {}

  // 3. Decode portable URL payload (&d=...)
  if (fallbackEncoded) {
    const decoded = decodePayload(fallbackEncoded);
    if (decoded) return decoded;
  }

  return null;
}

export async function sendSecretReply(letterId, stampCode, replyText) {
  const replyObj = {
    text: replyText,
    repliedAt: Date.now()
  };

  try {
    const localVault = JSON.parse(localStorage.getItem("chitthi_letters") || "{}");
    if (localVault[letterId]) {
      localVault[letterId].reply = replyObj;
      localStorage.setItem("chitthi_letters", JSON.stringify(localVault));
    }
  } catch (_) {}

  try {
    const firestore = await initFirestore();
    if (firestore && firestoreModules && letterId) {
      const { doc, updateDoc } = firestoreModules;
      await withTimeout(updateDoc(doc(firestore, "letters", letterId), { reply: replyObj }), 5000);
    }
  } catch (err) {
    console.warn("Firestore reply update warning:", err);
  }
  return replyObj;
}

export async function getLetterByStampCode(rawCode) {
  const code = rawCode.trim().toUpperCase().replace(/^#/, "");
  try {
    const firestore = await initFirestore();
    if (firestore && firestoreModules) {
      const { doc, getDoc } = firestoreModules;
      const codeSnap = await withTimeout(getDoc(doc(firestore, "stampCodes", code)), 5000);
      if (codeSnap.exists()) {
        const { letterId } = codeSnap.data();
        const letterSnap = await withTimeout(getDoc(doc(firestore, "letters", letterId)), 5000);
        if (letterSnap.exists()) return letterSnap.data();
      }
    }
  } catch (e) {
    console.warn("Firestore stamp code lookup fallback:", e);
  }

  try {
    const codeIndex = JSON.parse(localStorage.getItem("chitthi_codes") || "{}");
    const localVault = JSON.parse(localStorage.getItem("chitthi_letters") || "{}");
    const id = codeIndex[code];
    return id ? localVault[id] : null;
  } catch (_) {
    return null;
  }
}

export async function deleteBurnedLetter(letterId) {
  try {
    const localVault = JSON.parse(localStorage.getItem("chitthi_letters") || "{}");
    if (localVault[letterId]) {
      delete localVault[letterId];
      localStorage.setItem("chitthi_letters", JSON.stringify(localVault));
    }
  } catch (_) {}

  try {
    const firestore = await initFirestore();
    if (firestore && firestoreModules && letterId) {
      const { doc, deleteDoc } = firestoreModules;
      await withTimeout(deleteDoc(doc(firestore, "letters", letterId)), 5000);
    }
  } catch (_) {}
}

export async function createOrGetPostbox(handle, displayName, occasion = "personal", batchUnlockAt = null) {
  const cleanHandle = handle.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  if (!cleanHandle) throw new Error("Invalid handle");

  const boxData = {
    handle: cleanHandle,
    displayName: displayName || cleanHandle,
    occasion,
    batchUnlockAt,
    createdAt: Date.now()
  };

  try {
    localStorage.setItem("chitthi_my_postbox", JSON.stringify(boxData));
  } catch (_) {}

  try {
    const firestore = await initFirestore();
    if (firestore && firestoreModules) {
      const { doc, setDoc } = firestoreModules;
      await withTimeout(setDoc(doc(firestore, "postboxes", cleanHandle), boxData, { merge: true }), 5000);
    }
  } catch (err) {
    console.warn("Firestore postbox save warning:", err);
  }
  return boxData;
}

export async function getPostboxInfo(handle) {
  const cleanHandle = handle.trim().toLowerCase();
  try {
    const firestore = await initFirestore();
    if (firestore && firestoreModules && cleanHandle) {
      const { doc, getDoc } = firestoreModules;
      const snap = await withTimeout(getDoc(doc(firestore, "postboxes", cleanHandle)), 4000);
      if (snap.exists()) return snap.data();
    }
  } catch (_) {}

  try {
    const saved = JSON.parse(localStorage.getItem("chitthi_my_postbox") || "null");
    return saved && saved.handle === cleanHandle ? saved : null;
  } catch (_) {
    return null;
  }
}

export async function getLettersForPostbox(handle) {
  const cleanHandle = handle.trim().toLowerCase();
  const results = [];

  try {
    const firestore = await initFirestore();
    if (firestore && firestoreModules) {
      const { collection, query, where, getDocs } = firestoreModules;
      const q = query(collection(firestore, "letters"), where("targetBox", "==", cleanHandle));
      const snap = await withTimeout(getDocs(q), 5000);
      snap.forEach((docSnap) => results.push(docSnap.data()));
      return results.sort((a, b) => b.createdAt - a.createdAt);
    }
  } catch (e) {
    console.warn("Firestore inbox fetch fallback:", e);
  }

  try {
    const localVault = JSON.parse(localStorage.getItem("chitthi_letters") || "{}");
    Object.values(localVault).forEach((item) => {
      if (item.targetBox === cleanHandle) results.push(item);
    });
  } catch (_) {}
  return results.sort((a, b) => b.createdAt - a.createdAt);
}
