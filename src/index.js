import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connections from "./Connections";
import Integrations from "./Integrations";
import Layout from "./Layout";
import MainPage from "./MainPage";
import "./index.css";
import ConnectionDetail from "./СonnectionDetail";

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("./firebase-messaging-sw.js").then(
		(registration) => {
			console.log("Service worker registration succeeded:", registration);
		},
		(error) => {
			console.error(`Service worker registration failed: ${error}`);
		}
	);
} else {
	console.error("Service workers are not supported.");
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<BrowserRouter>
		<Layout>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/connections" element={<Connections />} />
				<Route path="/connections/:id" element={<ConnectionDetail />} />
				<Route path="/integrations" element={<Integrations />} />
			</Routes>
		</Layout>
	</BrowserRouter>
);
