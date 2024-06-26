import React from "react";
import Header from "./Header";
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
