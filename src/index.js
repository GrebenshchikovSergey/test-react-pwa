import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connections from "./Connections";
import Integrations from "./Integrations";
import MainPage from "./MainPage";
import Layout from "./Layout";

import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import ConnectionDetail from "./СonnectionDetail";
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
const root = ReactDOM.createRoot(document.getElementById("root"));

const firebaseConfig = {
	apiKey: "AIzaSyAIEo2Tce5G1jAM-9DR4Q8jLsnmXN_pWgQ",
	authDomain: "ksk-softorium-brand.firebaseapp.com",
	projectId: "ksk-softorium-brand",
	storageBucket: "ksk-softorium-brand.appspot.com",
	messagingSenderId: "837625796017",
	appId: "1:837625796017:web:3d5f6ce59fdd4f199fd990",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

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
