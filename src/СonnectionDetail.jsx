import React from "react";
import { useParams } from "react-router-dom";

const ConnectionDetail = () => {
	const { id } = useParams();

	return (
		<div>
			<h2>Connection ID: {id}</h2>
		</div>
	);
};

export default ConnectionDetail;
