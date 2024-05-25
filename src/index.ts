import { multiply } from "./lib/multiply";
import { sum } from "./lib/sum";
import { getName } from "./lib/names";
import { printMe } from "./lib/print";
import readme from "./README.txt";

document.getElementById("a").innerHTML = sum(1, 2).toString();
document.getElementById("b").innerHTML = multiply(1, 2).toString();
document.getElementById("c").innerHTML = readme;

document.getElementById("name").addEventListener("click", async () => {
  const name = await getName();
  document.getElementById("d").innerHTML = name;
});

printMe();

if (module.hot) {
  module.hot.accept();
}
