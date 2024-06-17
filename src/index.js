import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connections from "./Connections";
import Integrations from "./Integrations";
import MainPage from "./MainPage";
import Layout from "./Layout";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import ConnectionDetail from "./СonnectionDetail";

ReactDOM.render(
	<React.StrictMode>
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
	</React.StrictMode>,
	document.getElementById("root")
);

serviceWorkerRegistration.unregister();
