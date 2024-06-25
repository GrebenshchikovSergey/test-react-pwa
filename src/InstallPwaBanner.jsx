import React, { useState, useEffect } from "react";

const InstallPwaBanner = ({ token }) => {
	const [deferredPrompt, setDeferredPrompt] = useState(null);

	const handler = (e) => {
		setDeferredPrompt(e);
	};

	useEffect(() => {
		if (!token) return;

		window.addEventListener("beforeinstallprompt", handler);

		return () => {
			window.removeEventListener("beforeinstallprompt", handler);
		};
	}, [token]);

	const handleInstallClick = () => {
		if (deferredPrompt) {
			deferredPrompt.prompt();

			deferredPrompt.userChoice.then((choiceResult) => {
				if (choiceResult.outcome === "accepted") {
					console.log("Пользователь принял установку");
				} else {
					console.log("Пользователь отклонил установку");
				}
				setDeferredPrompt(null);
			});
		}
	};

	if (!deferredPrompt) {
		return null; // Не показываем баннер, если deferredPrompt еще не установлен
	}

	return (
		<div
			style={{
				position: "fixed",
				top: "10px",
				left: "50%",
				transform: "translateX(-50%)",
				zIndex: 1000,
				background: "#ffffff",
				padding: "10px",
				boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
				borderRadius: "5px",
			}}
		>
			<p>Хотите установить это приложение на свой главный экран?</p>
			<button onClick={handleInstallClick}>Установить</button>
		</div>
	);
};

export default InstallPwaBanner;
