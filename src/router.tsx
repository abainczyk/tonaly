import { createBrowserRouter } from "react-router-dom";
import { Home } from "./components/Home.tsx";
import { BASE_URL } from "./config/environments.ts";

export const router = createBrowserRouter(
	[
		{
			path: "",
			element: <Home />,
		},
	],
	{
		basename: BASE_URL,
	},
);
