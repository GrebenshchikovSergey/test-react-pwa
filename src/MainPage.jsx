import React, { useEffect, useState } from "react";
import SendPush from "./sendPush";

const MainPage = () => {
	const [payloadMessage, setPayloadMessage] = useState(null);

	const registerServiceWorker = async () => {
		try {
			const registration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
			console.log("Service Worker registered:", registration);

			navigator.serviceWorker.addEventListener("message", (event) => {
				console.log("Received data from service worker:", event.data);
				setPayloadMessage(event.data);
			});
		} catch (error) {
			console.error("Service Worker registration failed:", error);
		}
	};

	useEffect(() => {
		if ("serviceWorker" in navigator) {
			registerServiceWorker();
		} else {
			console.log("Service Worker not supported");
		}
	}, []);

	return (
		<div>
			<SendPush payloadMessage={payloadMessage} setPayloadMessage={setPayloadMessage} />
		</div>
	);
};

export default MainPage;
