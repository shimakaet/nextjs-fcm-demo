import { initializeApp } from "firebase/app";

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

// import "firebase/messaging";
// import firebase from "firebase/app";
// import localforage from "localforage";

// const firebaseCloudMessaging = {
//   init: async () => {
//     if (!firebase?.apps?.length) {
//       // Initialize the Firebase app with the credentials
//       firebase?.initializeApp({
//         apiKey: "AIzaSyBOT-s-RX4AQmnl1ZiCD6aYxpr3qLksWLk",
//         authDomain: "pwapushtestapp.firebaseapp.com",
//         projectId: "pwapushtestapp",
//         storageBucket: "pwapushtestapp.appspot.com",
//         messagingSenderId: "189028546599",
//         appId: "1:189028546599:web:cc3f70753b533508ba3602",
//       });

//       try {
//         const messaging = firebase.messaging();
//         const tokenInLocalForage = await localforage.getItem("fcm_token");

//         // Return the token if it is alredy in our local storage
//         if (tokenInLocalForage !== null) {
//           return tokenInLocalForage;
//         } else {
//           console.log("token is not in localforage");
//         }

//         // Request the push notification permission from browser
//         if (Notification.permission !== "granted") {
//           console.log("denied");
//           return null;
//         }

//         // Get new token from Firebase
//         const fcm_token = await messaging.getToken({
//           vapidKey:
//             "BAba-_GySoWmjjIc3LNpXopbZQuRoAAiojrIMjjdvT_fOMqpDwTy5Sc03o8N8VyQjSt68PCyw2FZJKjMC8F34oA",
//         });

//         // Set token in our local storage
//         if (fcm_token) {
//           localforage.setItem("fcm_token", fcm_token);
//           return fcm_token;
//         }
//       } catch (error) {
//         console.error("firebase error");
//         console.error(error);
//         return null;
//       }
//     }
//   },
// };

// export { firebaseCloudMessaging };

// ----------------------------------------------------------------------------------------

// import "firebase/messaging";
// import firebase from "firebase/app";
// import localforage from "localforage";

// const firebaseCloudMessaging = {
//   init: async () => {
//     if (!firebase?.apps?.length) {
//       // Initialize the Firebase app with the credentials
//       firebase?.initializeApp({
//         apiKey: "AIzaSyBOT-s-RX4AQmnl1ZiCD6aYxpr3qLksWLk",
//         authDomain: "pwapushtestapp.firebaseapp.com",
//         projectId: "pwapushtestapp",
//         storageBucket: "pwapushtestapp.appspot.com",
//         messagingSenderId: "189028546599",
//         appId: "1:189028546599:web:cc3f70753b533508ba3602",
//       });

//       try {
//         const messaging = firebase.messaging();
//         const tokenInLocalForage = await localforage.getItem("fcm_token");

//         // Return the token if it is alredy in our local storage
//         if (tokenInLocalForage !== null) {
//           return tokenInLocalForage;
//         }

//         // Request the push notification permission from browser
//         const status = await Notification.requestPermission();
//         if (status && status === "granted") {
//           // Get new token from Firebase
//           const fcm_token = await messaging.getToken({
//             vapidKey:
//               "BAba-_GySoWmjjIc3LNpXopbZQuRoAAiojrIMjjdvT_fOMqpDwTy5Sc03o8N8VyQjSt68PCyw2FZJKjMC8F34oA",
//           });

//           // Set token in our local storage
//           if (fcm_token) {
//             localforage.setItem("fcm_token", fcm_token);
//             return fcm_token;
//           }
//         }
//       } catch (error) {
//         console.error("firebase error");
//         console.error(error);
//         return null;
//       }
//     }
//   },
// };

// export { firebaseCloudMessaging };
