importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/8.2.3/firebase-messaging.js")

firebase.initializeApp({
  apiKey: "AIzaSyDj4BpuPMUeCiGQNllLqSLgza7W_KfA2V8",
  authDomain: "reactfirebasechat-12470.firebaseapp.com",
  projectId: "reactfirebasechat-12470",
  storageBucket: "reactfirebasechat-12470.appspot.com",
  messagingSenderId: "392492279219",
  appId: "1:392492279219:web:33a39ce3baf87a379b57c6",
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  window.alert(payload)
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  )
  // Customize notification here
  const notificationTitle = "Background Message Title"
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
