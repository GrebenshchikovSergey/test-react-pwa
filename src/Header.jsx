import React from "react";
import { Link } from "react-router-dom";
const Header = () => {
	return (
		<div style={{ display: "flex", gap: "10px" }}>
			<Link to={"/"}>Main</Link>
			<Link to={"/connections"}>Connections</Link>
			<Link to={"/integrations"}>Integrations</Link>
		</div>
	);
};

export default Header;
