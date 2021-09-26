import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../sw.js").then(() => {
    console.log("Service Worker Registered!");
  });
}

window.addEventListener("beforeinstallprompt", (event) => {
  console.log("beforeinstallprompt fired");
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
