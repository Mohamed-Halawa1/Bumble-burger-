// Firebase v10 modular SDK loaded from the official CDN.
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics, isSupported } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
import { addDoc, collection, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDNx0PEsxFLAkP9OduqlDbmC5qLeSMjcIo",
  authDomain: "bumble-burger.firebaseapp.com",
  projectId: "bumble-burger",
  storageBucket: "bumble-burger.firebasestorage.app",
  messagingSenderId: "156447714282",
  appId: "1:156447714282:web:e6fc46446c35dfe3292093",
  measurementId: "G-Y009X2F2QC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Analytics is optional and may be unsupported in local or privacy-restricted browsers.
isSupported().then((supported) => {
  if (supported) getAnalytics(app);
}).catch(() => {});

async function saveOrder(order) {
  const orderDocument = {
    ...order,
    createdAt: serverTimestamp(),
    orderDate: new Date().toISOString()
  };

  const orderReference = await addDoc(collection(db, "orders"), orderDocument);
  return orderReference.id;
}

async function getUserProfile(uid) {
  const profileSnapshot = await getDoc(doc(db, "users", uid));
  return profileSnapshot.exists() ? profileSnapshot.data() : null;
}

async function saveUserProfile(uid, profile) {
  await setDoc(doc(db, "users", uid), {
    ...profile,
    updatedAt: serverTimestamp()
  }, { merge: true });
}

function subscribeToOrders(callback, onError) {
  const ordersQuery = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(ordersQuery, callback, onError);
}

async function updateOrderStatus(orderId, status) {
  await updateDoc(doc(db, "orders", orderId), { status, updatedAt: serverTimestamp() });
}

async function getOrders() {
  const snapshot = await getDocs(collection(db, "orders"));
  return snapshot.docs.map(order => ({ id: order.id, ...order.data() }));
}

window.BumbleFirebase = {
  auth,
  googleProvider,
  onAuthStateChanged,
  getUserProfile,
  getOrders,
  saveOrder,
  saveUserProfile,
  subscribeToOrders,
  updateOrderStatus,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
};

export {
  auth,
  googleProvider,
  getUserProfile,
  getOrders,
  onAuthStateChanged,
  saveUserProfile,
  subscribeToOrders,
  updateOrderStatus,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut
};
