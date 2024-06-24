import React from "react";
import SendPush from "./sendPush";

const MainPage = ({ payloadMessage, setPayloadMessage }) => {
	return (
		<div>
			<SendPush payloadMessage={payloadMessage} setPayloadMessage={setPayloadMessage} />
		</div>
	);
};

export default MainPage;
