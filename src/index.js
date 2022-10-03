import React from "react";
import {createRoot} from "react-dom/client";
import {BaseProvider, LightTheme} from 'baseui';
import {Provider as StyletronProvider} from "styletron-react";
import {Client as Styletron} from "styletron-engine-atomic";
import App from "./App";
import axios from "axios";
import {RecoilRoot} from "recoil";
import "./index.css";

const engine = new Styletron();

const rootElement = document.getElementById("root");

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

const root = createRoot(rootElement);
root.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <RecoilRoot>
        <App/>
      </RecoilRoot>
    </BaseProvider>
  </StyletronProvider>,
);
