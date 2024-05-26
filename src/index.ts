import { multiply } from "./lib/multiply.ts";
import { sum } from "./lib/sum.ts";
import { getName } from "./lib/names.ts";
import { printMe } from "./lib/print.ts";
import readme from "./README.txt";
import { Counter } from "./components/Counter.tsx";
import { createRoot, Root } from "react-dom/client";
import React from "react";
import CounterVue from "./vue/Counter.vue";
import { createApp } from "vue";
import "./main.css";

createApp(CounterVue).mount("#root-vue");

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
  const element = React.createElement(Counter);
  root.render(element);
});

if (module.hot) {
  // Hot module replacement for react component without recreating root element
  module.hot.accept("./components/Counter.tsx", () => {
    const newElement = React.createElement(Counter);
    root.render(newElement);
  });

  // Hot module replacement for other modules
  module.hot.accept();
}
