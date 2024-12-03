import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
    // domain="rahejagagan1.us.auth0.com"
    // clientId="Df4fuwip9BOeMMMvIcsXJ2IBS7KDrJct"
    domain="dev-jwwl5gxwfd3meyy7.us.auth0.com"
    clientId="ycUoM1FmAfeDHoECKIM6MrG6vQ18vyou"
     authorizationParams={{
      redirect_uri: "http://localhost:5173"
      // redirect_uri: "https://rdg-real-estate-frontend.netlify.app/"
     }}
     audience="http://localhost:8000"
     scope="openid profile email"
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);

