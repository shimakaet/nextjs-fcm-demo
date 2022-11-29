import React, { useEffect } from "react";
import * as firebase from "firebase/app";
import "firebase/messaging";
import { firebaseCloudMessaging } from "../utils/firebase";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";

function PushNotificationLayout({ children, messageCallback }) {
  const router = useRouter();

  useEffect(() => {
    // console.log("PushNotificationLayout Renderred");
    // var isSafari = window.safari !== undefined;
    // if (!isSafari) {
    //   console.log("user-agent is not safari");
    // if (Notification.permission === "granted") {
    //   setToken();
    // } else {
    //   Notification.requestPermission().then((permission) => {
    //     setToken();
    //   });
    // }
    // Event listener that listens for the push notification event in the background
    // if ("serviceWorker" in navigator) {
    //   navigator.serviceWorker.addEventListener("message", (event) => {
    //     console.log("event for the service worker", event);
    //     let notification = event.data.firebaseMessaging.payload.notification;
    //     messageCallback(notification);
    //   });
    // }
    // Calls the getMessage() function if the token is there
    // async function setToken() {
    //   try {
    //     const token = await firebaseCloudMessaging.init();
    //     if (token) {
    //       console.log("token", token);
    //       getMessage();
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
    // }
  }, []);

  // Handles the click function on the toast showing push notification
  const handleClickPushNotification = (url) => {
    router.push(url);
  };

  // Get the push notification message and triggers a toast to show it
  function getMessage() {
    const messaging = firebase.messaging();
    messaging.onMessage((message) => {
      toast(
        <div onClick={() => handleClickPushNotification(message?.data?.url)}>
          <h5>{message?.notification?.title}</h5>
          <h6>{message?.notification?.body}</h6>
        </div>,
        {
          closeOnClick: false,
        }
      );
    });
  }

  function onButtonPressed(e) {
    console.log("You clicked submit.");

    if (firebase.messaging.isSupported()) {
      console.log("firebase messaging is supported");
    }

    var count = 0;

    toast.success("Yabba dabba do", {
      onClose: () => {
        count = count + 1;
        if (count === 2) {
          console.log("ss");
        }
      },
    });
  }

  function secondButtonPressed() {
    console.log("triggerNotification");

    Notification.requestPermission().then((permission) => {
      if (permission !== "granted") {
        console.log("permission denined");
        return;
      }

      setToken();
    });

    // Event listener that listens for the push notification event in the background
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        console.log("event for the service worker", event);
      });
    }

    async function setToken() {
      try {
        const token = await firebaseCloudMessaging.init();
        if (token) {
          console.log("token", token);
          getMessage();
        }
      } catch (error) {
        console.log("firebaseCloudMessaging error");
        console.log(error);
      }
    }
  }

  return (
    <>
      <ToastContainer />
      {children}
      {/* <button onClick={onButtonPressed}>First Here</button>
      <button onClick={secondButtonPressed}>Then Here</button> */}
    </>
  );
}

export default PushNotificationLayout;
