import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("sw.js").then(() => {
    console.log("Service Worker Registered!");
  });
}

// interface BeforeInstallPromptEvent extends Event {
//   readonly platforms: string[];
//   readonly userChoice: Promise<{
//     outcome: "accepted" | "dismissed";
//     platform: string;
//   }>;
//   prompt(): Promise<void>;
// }

// declare global {
//   interface WindowEventMap {
//     beforeinstallprompt: BeforeInstallPromptEvent;
//   }
// }
// let deferredPrompt: BeforeInstallPromptEvent | null;

// window.addEventListener(
//   "beforeinstallprompt",
//   (event: BeforeInstallPromptEvent) => {
//     console.log("beforeinstallprompt fired");
//     event.preventDefault();
//     deferredPrompt = event;
//     if (deferredPrompt) {
//       deferredPrompt.prompt();
//       deferredPrompt.userChoice.then((choiceResult) => {
//         console.log(choiceResult.outcome);
//         if (choiceResult.outcome === "dismissed") {
//           console.log("User cancelled installation");
//         } else {
//           console.log("User added to home screen");
//         }
//       });
//       deferredPrompt = null;
//     }
//     return false;
//   }
// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
