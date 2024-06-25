import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Connections from "./Connections";
import Integrations from "./Integrations";
import Layout from "./Layout";
import MainPage from "./MainPage";
import "./index.css";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import ConnectionDetail from "./СonnectionDetail";

const root = ReactDOM.createRoot(document.getElementById("root"));
serviceWorkerRegistration.registerValidSW("./firebase-messaging-sw.js");

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

serviceWorkerRegistration.unregister();
