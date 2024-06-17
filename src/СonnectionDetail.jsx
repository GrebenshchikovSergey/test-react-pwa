import React from "react";
import { useParams } from "react-router-dom";

const ConnectionDetail = () => {
	const { id } = useParams();

	return (
		<div>
			<h2>Connection ID: {id}</h2>
			{/* Другие детали конкретной connection можно добавить здесь */}
		</div>
	);
};

export default ConnectionDetail;
