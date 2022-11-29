// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js");
// importScripts("https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging.js");

importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js"
);

var firebaseConfig = {
  apiKey: "AIzaSyBOT-s-RX4AQmnl1ZiCD6aYxpr3qLksWLk",
  authDomain: "pwapushtestapp.firebaseapp.com",
  projectId: "pwapushtestapp",
  storageBucket: "pwapushtestapp.appspot.com",
  messagingSenderId: "189028546599",
  appId: "1:189028546599:web:cc3f70753b533508ba3602",
  measurementId: "G-7LZNDW6BTM",
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log(event);
});
