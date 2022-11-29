import { initializeApp } from "firebase/app";
import { getMessaging, onBackgroundMessage } from "firebase/messaging/sw";

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
const firebaseApp = initializeApp({
  apiKey: "AIzaSyBOT-s-RX4AQmnl1ZiCD6aYxpr3qLksWLk",
  authDomain: "pwapushtestapp.firebaseapp.com",
  projectId: "pwapushtestapp",
  storageBucket: "pwapushtestapp.appspot.com",
  messagingSenderId: "189028546599",
  appId: "1:189028546599:web:cc3f70753b533508ba3602",
  measurementId: "G-7LZNDW6BTM",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = getMessaging(firebaseApp);

onBackgroundMessage(messaging, (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
