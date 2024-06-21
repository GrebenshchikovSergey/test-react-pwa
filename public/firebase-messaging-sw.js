// Scripts for firebase and firebase messaging
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
	console.log("Received background message ", payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
self.addEventListener("notificationclick", function (event) {
	console.log("Notification click Received.");
	console.log("self.clients", clients.matchAll({ type: "window", includeUncontrolled: true }));
	clients.matchAll({ type: "window", includeUncontrolled: true }).then((clients) => {
		console.log("clients", clients);
		clients.forEach((client) => {
			client.postMessage({ msg: "Hello from SW" });
		});
	});
	// event.waitUntil(
	// 	clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
	// 		console.log("clientlist: ", clientList);
	// 		if (clientList.length > 0) {
	// 			let client = clientList[0];
	// 			for (let i = 0; i < clientList.length; i++) {
	// 				if (clientList[i].focused) {
	// 					client = clientList[i];
	// 				}
	// 			}
	// 			client.postMessage({ msg: "notificationClick", data: "KYKYKY" });
	// 			return client.focus();
	// 		}
	// 		return clients.openWindow("/").then((windowClient) => {
	// 			windowClient.postMessage({ msg: "notificationClick", data: "KYKYKY" });
	// 		});
	// 	})
	// );
	event.notification.close();

	event.waitUntil(clients.openWindow("/"));
});
