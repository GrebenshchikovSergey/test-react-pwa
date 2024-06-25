import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import React, { useEffect, useState } from "react";
import Header from "./Header"; // Подключаем ваш компонент хедера
import InstallPwaBanner from "./InstallPwaBanner";

const Layout = ({ children }) => {
	const [payloadMessage, setPayloadMessage] = useState(null);

	navigator.serviceWorker.onmessage = function (event) {
		console.log("Received message from service worker:", event.data);
		setPayloadMessage(event.data);
	};

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

	const [token, setToken] = useState(null);

	const requestPermission = async () => {
		try {
			const permission = await Notification.requestPermission();
			if (permission === "granted") {
				await getDeviceToken();
			} else {
				alert("not granted");
				requestPermission();
				console.error("Unable to get permission to notify.");
			}
		} catch (error) {
			console.error("Unable to get permission to notify.", error);
		}
	};

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

	useEffect(() => {
		requestPermission();
	}, []);

	const copyToClipBoard = () => {
		navigator.clipboard.writeText(token);
		alert("Токен скопирован");
	};

	onMessage(messaging, (payload) => {
		console.log("Received foreground message ", payload);
		setPayloadMessage(payload);
	});

	return (
		<div>
			<Header />
			<div>Payload message: {JSON.stringify(payloadMessage)}</div>
			<div>
				Device Token:<div onClick={copyToClipBoard}> {token}</div>
			</div>
			<InstallPwaBanner token={token} />
			{children}
		</div>
	);
};

export default Layout;
