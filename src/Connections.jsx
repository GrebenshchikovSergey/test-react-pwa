import React from "react";
import { Link } from "react-router-dom";

const Connections = () => {
	let connections = [
		{ id: 1, name: "test1" },
		{ id: 2, name: "test2" },
		{ id: 3, name: "test3" },
		{ id: 4, name: "test4" },
	];
	return (
		<div>
			{connections.map((connection) => (
				<Link
					style={{ display: "block" }}
					to={`/connections/${connection.id}`} // Изменили формирование URL
					key={connection.id}
				>
					{connection.name}
				</Link>
			))}
		</div>
	);
};

export default Connections;
