importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
	apiKey: "AIzaSyAIEo2Tce5G1jAM-9DR4Q8jLsnmXN_pWgQ",
	authDomain: "ksk-softorium-brand.firebaseapp.com",
	projectId: "ksk-softorium-brand",
	storageBucket: "ksk-softorium-brand.appspot.com",
	messagingSenderId: "837625796017",
	appId: "1:837625796017:web:3d5f6ce59fdd4f199fd990",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		data: payload.data, // Attach any additional data to the notification
	};
	self.registration.showNotification(notificationTitle, notificationOptions);
});

// self.addEventListener("message", (event) => {
// 	if (event.data && event.data.type === "SKIP_WAITING") {
// 		self.skipWaiting();
// 	}
// });

// self.addEventListener("install", function (event) {
// 	event.waitUntil(self.skipWaiting()); // Activate worker immediately
// });

// self.addEventListener("activate", function (event) {
// 	event.waitUntil(self.clients.claim()); // Become available to all pages
// });

// self.addEventListener("notificationclick", function (event) {
// 	console.log("Notification click received:", event);
// 	// Extract data from the notification
// 	const notificationData = event.notification.data;
// 	console.log("Notification data:", notificationData);

// 	event.notification.close();

// 	event.waitUntil(
// 		clients
// 			.matchAll()
// 			.then((windows) => {
// 				console.log("clients.matchAll() called");
// 				console.log("windows array length:", windows.length);
// 				console.log("windows:", windows);

// 				if (windows.length > 0) {
// 					const window = windows[0];
// 					window.postMessage(notificationData);
// 					window.focus();
// 					console.log("Message posted and window focused");
// 					return;
// 				} else {
// 					console.log(
// 						"No open windows found, opening a new window with scope:",
// 						event.target.registration.scope
// 					);
// 					return clients
// 						.openWindow("/connections/1")
// 						.then((window) => {
// 							if (window) {
// 								console.log("New window opened:", window);
// 								setTimeout(() => {
// 									console.log("Sending message to new window");
// 									window.postMessage(notificationData);
// 								}, 3000);
// 							} else {
// 								console.log("Window not opened");
// 							}
// 						})
// 						.catch((error) => {
// 							console.error("Error opening window:", error);
// 						});
// 				}
// 			})
// 			.catch((error) => {
// 				console.error("Error matching clients:", error);
// 			})
// 	);
// });
self.addEventListener("notificationclick", function (event) {
	console.log("Notification click Received.");

	event.notification.close();

	event.waitUntil(clients.openWindow("/connections/2"));
});
