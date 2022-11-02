import React from "react";
import {createRoot} from "react-dom/client";
import {BaseProvider, LightTheme} from 'baseui';
import {Provider as StyletronProvider} from "styletron-react";
import {Client as Styletron} from "styletron-engine-atomic";
import App from "./App";
import axios from "axios";
import {RecoilRoot} from "recoil";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

const engine = new Styletron();

const rootElement = document.getElementById("root");

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const auth = JSON.parse(localStorage.getItem("user"));
  if (auth) {
    config.headers.Authorization = `Bearer ` + auth["access_token"];
  }
  return config;
});

const root = createRoot(rootElement);
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID}>
    <StyletronProvider value={engine}>
      <BaseProvider theme={LightTheme}>
          <RecoilRoot>
            <BrowserRouter>
              <App/>
            </BrowserRouter>
          </RecoilRoot>
      </BaseProvider>
    </StyletronProvider>
  </GoogleOAuthProvider>
);
