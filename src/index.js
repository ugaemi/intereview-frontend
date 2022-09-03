import React from "react";
import {createRoot} from "react-dom/client";
import {BaseProvider, LightTheme} from 'baseui';
import { Provider as StyletronProvider } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import App from "./App";

const engine = new Styletron();

const rootElement = document.getElementById("root");

const root = createRoot(rootElement);
root.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
    </BaseProvider>
  </StyletronProvider>,
);
