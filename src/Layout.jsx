import React from "react";
import Header from "./Header"; // Подключаем ваш компонент хедера

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
};

export default Layout;
