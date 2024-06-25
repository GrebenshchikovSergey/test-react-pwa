import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connections from "./Connections";
import Integrations from "./Integrations";
import Layout from "./Layout";
import MainPage from "./MainPage";
import "./index.css";

import ConnectionDetail from "./СonnectionDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
export function registerValidSW(swUrl, config) {
	navigator.serviceWorker
		.register(swUrl)
		.then((registration) => {
			console.log("registration successful");
			registration.onupdatefound = () => {
				const installingWorker = registration.installing;
				if (installingWorker == null) {
					return;
				}
				installingWorker.onstatechange = () => {
					if (installingWorker.state === "installed") {
						if (navigator.serviceWorker.controller) {
							// At this point, the updated precached content has been fetched,
							// but the previous service worker will still serve the older
							// content until all client tabs are closed.
							console.log(
								"New content is available and will be used when all " +
									"tabs for this page are closed. See https://cra.link/PWA."
							);

							// Execute callback
							if (config && config.onUpdate) {
								config.onUpdate(registration);
							}
						} else {
							// At this point, everything has been precached.
							// It's the perfect time to display a
							// "Content is cached for offline use." message.
							console.log("Content is cached for offline use.");

							// Execute callback
							if (config && config.onSuccess) {
								config.onSuccess(registration);
							}
						}
					}
				};
			};
		})
		.catch((error) => {
			console.error("Error during service worker registration:", error);
		});
}

registerValidSW("/firebase-messaging-sw.js");
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

export function unregister() {
	if ("serviceWorker" in navigator) {
		navigator.serviceWorker.ready
			.then((registration) => {
				registration.unregister();
			})
			.catch((error) => {
				console.error(error.message);
			});
	}
}
unregister();
