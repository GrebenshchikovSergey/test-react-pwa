import React, { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const SendPush = () => {
	const [token, setToken] = useState(null);
	const [payloadMessage, setPayloadMessage] = useState(null);

	const firebaseConfig = {
		apiKey: "AIzaSyAIEo2Tce5G1jAM-9DR4Q8jLsnmXN_pWgQ",
		authDomain: "ksk-softorium-brand.firebaseapp.com",
		projectId: "ksk-softorium-brand",
		storageBucket: "ksk-softorium-brand.appspot.com",
		messagingSenderId: "837625796017",
		appId: "1:837625796017:web:3d5f6ce59fdd4f199fd990",
	};

	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const messaging = getMessaging(app);

	const requestPermission = async () => {
		try {
			const permission = await Notification.requestPermission();
			if (permission === "granted") {
				console.log("Notification permission granted.");
				alert("granted");
				await getDeviceToken(messaging.vapidKey);
			} else {
				alert("not granted");
				console.error("Unable to get permission to notify.");
			}
		} catch (error) {
			console.error("Unable to get permission to notify.", error);
		}
	};

	const getDeviceToken = async (vapidKey) => {
		try {
			const currentToken = await getToken(messaging, { vapidKey });
			if (currentToken) {
				console.log("Device token:", currentToken);
				setToken(currentToken);
			} else {
				console.log("No registration token available. Request permission to generate one.");
			}
		} catch (error) {
			console.error("An error occurred while retrieving token. ", error);
		}
	};

	onMessage(messaging, (payload) => {
		console.log("Received foreground message ", payload);
		setPayloadMessage(payload);
	});

	useEffect(() => {
		requestPermission();
	}, []);

	const copyToClipBoard = () => {
		navigator.clipboard.writeText(token);
		alert("Токен скопирован");
	};

	setTimeout(() => {
		console.log("set timeout");
		navigator.serviceWorker.addEventListener("message", (event) => {
			console.log("kykyky");
			alert(JSON.stringify(event.data));
			setPayloadMessage(event.data);
		});
	}, 10000);

	return (
		<div>
			<div>
				Device Token:<div onClick={copyToClipBoard}> {token}</div>
			</div>
			<div>Payload Message: {JSON.stringify(payloadMessage)}</div>
		</div>
	);
};

export default SendPush;
