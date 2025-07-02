importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

// Initialize Firebase (replace with your config)
firebase.initializeApp({
  apiKey: "AIzaSyDuDQ5UrRuwads8BAbZEFOaN4Od0URRvoU",
  authDomain: "mistxmahi.firebaseapp.com",
  projectId: "mistxmahi",
  messagingSenderId: "881105906685",
  appId: "1:881105906685:web:fc45fc4f9797f4e6f9c70c",
  databaseURL: "https://mistxmahi-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Background message received', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icon.png'
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});
