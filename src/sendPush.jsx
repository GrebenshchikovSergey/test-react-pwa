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

	// Инициализация Firebase
	const app = initializeApp(firebaseConfig);

	// Получение экземпляра Messaging
	const messaging = getMessaging(app);
	// Функция для запроса разрешений на уведомления
	const requestPermission = async () => {
		try {
			const permission = await Notification.requestPermission();
			alert(permission);
			if (permission === "granted") {
				console.log("Notification permission granted.");
				await getDeviceToken();
			} else {
				console.error("Unable to get permission to notify.");
			}
		} catch (error) {
			console.error("Unable to get permission to notify.", error);
		}
	};

	// Функция для получения токена устройства
	const getDeviceToken = async () => {
		try {
			const currentToken = await getToken(messaging, {
				vapidKey:
					"BJnOfnt64f9T1hTmNTfuoLm4oqM8zN_MSckjBAHAEvTlqmbQdpjTR9qsxRyGdgW4XYGout8gYJDX1RLvzV6xSVo",
			});
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

	const copyToClipBoard = () => {
		navigator.clipboard.writeText(token);
		alert("Токен скопирован");
	};

	onMessage(messaging, (payload) => {
		console.log("Message received. ", payload);
		setPayloadMessage(payload);
	});

	return (
		<div>
			<button onClick={requestPermission}>Запросить разрешения</button>
			<div onClick={copyToClipBoard}>{token}</div>
			<div style={{ marginTop: "10px" }}>Payload message: {JSON.stringify(payloadMessage)}</div>
		</div>
	);
};

export default SendPush;
