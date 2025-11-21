import { createRoot } from "react-dom/client";
import "./style.css";
import { App } from "./app";
const div = document.createElement("div");
div.id = "__root";
const appRoot = document.querySelector("#app");
if (!appRoot) throw new Error("Can't find App root element");
appRoot.appendChild(div);

appRoot.setAttribute("style", "display:flex;height:auto;");

const rootContainer = document.querySelector("#__root");
if (!rootContainer) throw new Error("Can't find Content root element");
const root = createRoot(rootContainer);
root.render(<App />);

try {
  console.log("content script loaded");
} catch (e) {
  console.error(e);
}
