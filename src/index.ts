import { multiply } from "./multiply";
import { sum } from "./sum";
import { getName } from "./names";
import readme from "./README.txt";

document.getElementById('a').innerHTML = sum(1, 2).toString();
document.getElementById('b').innerHTML = multiply(1, 2).toString();
document.getElementById('c').innerHTML = readme;

getName().then(function(name) {
    document.getElementById('d').innerHTML = name;
});