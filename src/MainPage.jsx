import React from "react";

const MainPage = () => {
	const sendPush = async () => {
		try {
			const perm = await Notification.requestPermission();
			console.log("Permission:", perm);

			if (perm !== "granted") {
				alert("Уведомления не разрешены пользователем");
				return;
			}

			new Notification("Hi everyone", {
				body: "test test",
			});
		} catch (error) {
			console.error("Ошибка при запросе разрешения на уведомления:", error);
			alert("Ошибка при запросе разрешения на уведомления");
		}
	};

	return (
		<div>
			<button onClick={sendPush}>Отправить уведомление</button>
		</div>
	);
};

export default MainPage;
