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

self.addEventListener("notificationclick", function (event) {
	console.log("Notification click received:", event);

	// Extract data from the notification
	const notificationData = event.notification.data;
	console.log("Notification data:", notificationData);

	event.waitUntil(
		clients.matchAll({ type: "window" }).then((windows) => {
			console.log("windows", windows);
			if (windows.length > 0) {
				console.log("windows.length", windows);
				const window = windows[0];
				window.postMessage(notificationData);
				window.focus();
				return;
			}
			return clients.openWindow(this.origin).then((window) => {
				console.log("window opened");
				setTimeout(() => {
					console.log("send message");
					window.postMessage(notificationData);
				}, 3000);
				return;
			});
		})
	);
});

self.addEventListener("message", (event) => {
	if (event.data && event.data.type === "SKIP_WAITING") {
		self.skipWaiting();
	}
});

self.addEventListener("install", function (event) {
	event.waitUntil(self.skipWaiting()); // Activate worker immediately
});

self.addEventListener("activate", function (event) {
	event.waitUntil(self.clients.claim()); // Become available to all pages
});
