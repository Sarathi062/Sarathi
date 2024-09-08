import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Auth0Provider
			domain="dev-hd5pr7monl10ts6x.us.auth0.com"
			clientId="49edm2EBYQ8ucZsiU243l5DI9qH8ypDQ"
			authorizationParams={{
				redirect_uri: window.location.origin,
			}}
		>
			<App />
		</Auth0Provider>
	</StrictMode>
);
