import React from "react";

const MainPage = () => {
	const sendPush = async () => {
		const perm = await Notification.requestPermission();
		if (perm !== "granted") {
			return;
		}
		new Notification("Hi everyone", {
			body: "test test",
		});
	};
	return (
		<div>
			<button onClick={sendPush}>sendPush</button>
		</div>
	);
};

export default MainPage;
