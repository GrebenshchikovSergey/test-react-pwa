import React from "react";
import Header from "./Header"; // Подключаем ваш компонент хедера
import InstallPwaBanner from "./InstallPwaBanner";

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<InstallPwaBanner />
			{children}
		</div>
	);
};

export default Layout;
