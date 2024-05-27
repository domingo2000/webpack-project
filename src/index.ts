import { multiply } from "./lib/multiply.ts";
import { sum } from "./lib/sum.ts";
import { getName } from "./lib/names.ts";
import { printMe } from "./lib/print.ts";
import readme from "./README.txt";
import App from "./components/react/App.tsx";
import { createRoot, Root } from "react-dom/client";
import React from "react";
import AppVue from "./components/vue/App.vue";
import { createApp } from "vue";
import "./main.css";

createApp(AppVue).mount("#root-vue");

document.getElementById("a").innerHTML = sum(1, 2).toString();
document.getElementById("b").innerHTML = multiply(1, 2).toString();
document.getElementById("c").innerHTML = readme;

document.getElementById("name").addEventListener("click", async () => {
  const name = await getName();
  document.getElementById("d").innerHTML = name;
});

printMe();

// Avoids recreation of root element on hot reload
let root: Root;
document.addEventListener("DOMContentLoaded", function (event) {
  const rootElement = document.getElementById("root");
  root = createRoot(rootElement);
  const element = React.createElement(App);
  root.render(element);
});

if (module.hot) {
  // Hot module replacement for react component without recreating root element
  module.hot.accept("./components/react/App.tsx", () => {
    const newElement = React.createElement(App);
    root.render(newElement);
  });

  // Hot module replacement for other modules
  module.hot.accept();
}

if (process.env.NODE_ENV === "production") {
  // Register service worker for PWA
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/webpack-project/service-worker.js", {
          scope: "/webpack-project/",
        })
        .then((registration) => {
          console.log("SW registered: ", registration);
        })
        .catch((registrationError) => {
          console.log("SW registration failed: ", registrationError);
        });
    });
  }
}
