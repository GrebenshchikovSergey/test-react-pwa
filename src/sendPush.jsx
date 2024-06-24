import { getToken, onMessage } from "firebase/messaging";
import React, { useEffect, useState } from "react";
import { messaging } from "./index";

const SendPush = () => {
	const [token, setToken] = useState(null);
	const [payloadMessage, setPayloadMessage] = useState(null);

	const requestPermission = async () => {
		try {
			const permission = await Notification.requestPermission();
			if (permission === "granted") {
				console.log("messaging", messaging);
				console.log("vapidKey", messaging.vapidKey);
				await getDeviceToken(
					"BDOU99-h67HcA6JeFXHbSNMu7e2yNNu3RzoMj8TM4W88jITfq7ZmPvIM1Iv-4_l2LxQcYwhqby2xGpWwzjfAnG4"
				);
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
			console.log("start get token", vapidKey);

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
