import React, { useState } from "react";
import Header from "./Header"; // Подключаем ваш компонент хедера
import InstallPwaBanner from "./InstallPwaBanner";

const Layout = ({ children }) => {
	const [payloadMessage, setPayloadMessage] = useState(null);

	navigator.serviceWorker.addEventListener("message", (event) => {
		console.log("DATATAA", JSON.stringify(event.data));
		setPayloadMessage(event.data);
	});

	return (
		<div>
			<Header />
			<InstallPwaBanner />
			{React.Children.map(children, (child) => {
				return React.cloneElement(child, {
					payloadMessage: payloadMessage,
					setPayloadMessage: setPayloadMessage,
				});
			})}
			;
		</div>
	);
};

export default Layout;
