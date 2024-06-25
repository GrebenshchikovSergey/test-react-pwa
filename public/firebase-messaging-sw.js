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
		clients.matchAll({ type: "window", includeUncontrolled: true }).then((windowClients) => {
			console.log("windowClients:", windowClients);
			for (let client of windowClients) {
				console.log("client:", client);
				if (client.url === "/" && "focus" in client) {
					console.log("Sending data to open client:", client);
					client.postMessage(notificationData);
					return client.focus();
				}
			}
			if (clients.openWindow) {
				console.log("Sending data to close");
				return clients.openWindow(`/`).then((windowClient) => {
					console.log("Opened new window and sending data:", windowClient);
					windowClient.postMessage(notificationData);
					console.log("sended");
				});
			}
		})
	);
	event.notification.close();
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
