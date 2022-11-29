import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import {
  getMessaging,
  getToken,
  onMessage,
  onBackgroundMessage,
} from "firebase/messaging";
import { firebaseApp } from "../utils/firebase";
import Head from "next/head";

export default function Home() {
  const router = useRouter();
  const [pusNotificationSupported, setPusNotificationSupported] =
    useState(false);
  const [pushManagerSupported, setPushManagerSupported] = useState(false);
  const [serviceWorkerSupported, setServiceWorkerSupported] = useState(false);
  const [notficationSupported, setNotficationSupported] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (currentBrowserSupportsPush()) {
      setPusNotificationSupported(true);
      messageListner();
      setNotficationSupported(true);
    }

    setupStates();
  }, []);

  function currentBrowserSupportsPush() {
    return (
      "PushManager" in window &&
      "serviceWorker" in navigator &&
      "Notification" in window
    );
  }

  function setupStates() {
    if ("PushManager" in window) {
      setPushManagerSupported(true);
    }

    if ("serviceWorker" in navigator) {
      setServiceWorkerSupported(true);
    }

    if ("Notification" in window) {
      setNotficationSupported(true);
    }
  }

  function messageListner() {
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker.addEventListener("message", (event) => {
    //     // console.log("event for the service worker", event);
    //     let notification = event.data.notification;
    //     console.log("notification", notification);
    //     setNotifications((oldNotifications) => [
    //       ...oldNotifications,
    //       notification,
    //     ]);
    //   });
    // }
  }

  function onButtonPressed(e) {
    console.log("You clicked submit.");

    toast.success("Yabba dabba do", {
      onClose: () => {
        console.log("ss");
      },
    });
  }

  function secondButtonPressed() {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        setupMessaging();
      }
    });
  }

  function setupMessaging() {
    const messaging = getMessaging(firebaseApp);
    getToken(messaging, {
      vapidKey:
        "BAba-_GySoWmjjIc3LNpXopbZQuRoAAiojrIMjjdvT_fOMqpDwTy5Sc03o8N8VyQjSt68PCyw2FZJKjMC8F34oA",
    }).then((token) => {
      if (token) {
        console.log("token", token);
        onMessage(messaging, (payload) => {
          // console.log("Message received. ", payload);

          let notification = payload.notification;
          console.log("notification", notification);

          setNotifications((oldNotifications) => [
            ...oldNotifications,
            notification,
          ]);
        });
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
      }
    });
  }

  return (
    <>
      <Head>
        <link rel="manifest" href={"/manifest.json"} />
      </Head>
      <div className={styles.container}>
        <main className={styles.main}>
          <h2>Home Page</h2>
          {pusNotificationSupported ? (
            <h3>Notification supported</h3>
          ) : (
            <h3>Notification not supported</h3>
          )}
          {pushManagerSupported && <h3>Push Manager supported</h3>}
          {serviceWorkerSupported && <h3>Service worker supported</h3>}
          {notficationSupported && <h3>Notification supported</h3>}
          <div style={{ flex: 1 }}>
            {notifications.map((notification, index) => {
              return (
                <h4 key={index}>
                  {index}. {notification.title} - {notification.body}
                </h4>
              );
            })}
          </div>
          <div style={{ flex: 1, flexDirection: "row" }}>
            <button onClick={onButtonPressed} style={{ margin: 5 }}>
              First Here
            </button>
            <button onClick={secondButtonPressed} style={{ margin: 5 }}>
              Then Here
            </button>
          </div>
        </main>
      </div>
    </>
  );
}

// import { useState, useEffect } from "react";
// import * as firebase from "firebase/app";
// import "firebase/messaging";
// import { firebaseCloudMessaging } from "../utils/firebase";
// import { toast } from "react-toastify";
// import PushNotificationLayout from "../components/PushNotificationLayout";
// import styles from "../styles/Home.module.css";
// import { useRouter } from "next/router";

// export default function Home() {
//   const router = useRouter();
//   const [pusNotificationSupported, setPusNotificationSupported] =
//     useState(false);
//   const [pushManagerSupported, setPushManagerSupported] = useState(false);
//   const [serviceWorkerSupported, setServiceWorkerSupported] = useState(false);
//   const [notficationSupported, setNotficationSupported] = useState(false);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     if (currentBrowserSupportsPush()) {
//       setPusNotificationSupported(true);
//       messageListner();
//       setupStates();
//       setNotficationSupported(true);
//     }
//   }, []);

//   function currentBrowserSupportsPush() {
//     return (
//       "PushManager" in window &&
//       "serviceWorker" in navigator &&
//       "Notification" in window
//     );
//   }

//   function setupStates() {
//     if ("PushManager" in window) {
//       setPushManagerSupported(true);
//     }

//     if ("serviceWorker" in navigator) {
//       setServiceWorkerSupported(true);
//     }

//     if ("Notification" in window) {
//       setNotficationSupported(true);
//     }
//   }

//   // Event listener that listens for the push notification event in the background
//   function messageListner() {
//     if ("serviceWorker" in navigator) {
//       navigator.serviceWorker.addEventListener("message", (event) => {
//         // console.log("event for the service worker", event);

//         let notification = event.data.firebaseMessaging.payload.notification;
//         // console.log("notification", notification);
//         setNotifications((oldNotifications) => [
//           ...oldNotifications,
//           notification,
//         ]);
//       });
//     }
//   }

//   function onButtonPressed(e) {
//     console.log("You clicked submit.");

//     if (firebase.messaging.isSupported()) {
//       console.log("firebase messaging is supported");
//     }

//     var count = 0;

//     toast.success("Yabba dabba do", {
//       onClose: () => {
//         count = count + 1;
//         if (count === 2) {
//           console.log("ss");
//         }
//       },
//     });
//   }

//   function secondButtonPressed() {
//     console.log("triggerNotification");

//     if (!"Notification" in window) {
//       return;
//     }

//     Notification.requestPermission().then((permission) => {
//       if (permission !== "granted") {
//         console.log("permission denined");
//         return;
//       }

//       setToken();
//     });

//     // Event listener that listens for the push notification event in the background
//     if ("serviceWorker" in navigator) {
//       navigator.serviceWorker.addEventListener("message", (event) => {
//         console.log("event for the service worker", event);
//       });
//     }

//     async function setToken() {
//       try {
//         const token = await firebaseCloudMessaging.init();
//         if (token) {
//           console.log("token", token);
//           getMessage();
//         }
//       } catch (error) {
//         console.log("firebaseCloudMessaging error");
//         console.log(error);
//       }
//     }
//   }

//   // Handles the click function on the toast showing push notification
//   const handleClickPushNotification = (url) => {
//     router.push(url);
//   };

//   // Get the push notification message and triggers a toast to show it
//   function getMessage() {
//     const messaging = firebase.messaging();
//     messaging.onMessage((message) => {
//       toast(
//         <div onClick={() => handleClickPushNotification(message?.data?.url)}>
//           <h5>{message?.notification?.title}</h5>
//           <h6>{message?.notification?.body}</h6>
//         </div>,
//         {
//           closeOnClick: false,
//         }
//       );
//     });
//   }

//   return (
//     <PushNotificationLayout>
//       <div className={styles.container}>
//         <main className={styles.main}>
//           <h2>Home Page</h2>
//           {pusNotificationSupported ? (
//             <h3>Notification supported</h3>
//           ) : (
//             <h3>Notification not supported</h3>
//           )}
//           {pushManagerSupported && <h3>Push Manager supported</h3>}
//           {serviceWorkerSupported && <h3>Service worker supported</h3>}
//           {notficationSupported && <h3>Notification supported</h3>}
//           <div style={{ flex: 1 }}>
//             {notifications.map((notification, index) => {
//               return (
//                 <h4 key={index}>
//                   {index}. {notification.title} - {notification.body}
//                 </h4>
//               );
//             })}
//           </div>
//           <div style={{ flex: 1, flexDirection: "row" }}>
//             <button onClick={onButtonPressed} style={{ margin: 5 }}>
//               First Here
//             </button>
//             <button onClick={secondButtonPressed} style={{ margin: 5 }}>
//               Then Here
//             </button>
//           </div>
//         </main>
//       </div>
//     </PushNotificationLayout>
//   );
// }
