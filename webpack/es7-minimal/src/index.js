import moment from "moment";

import "./styles/component.css";

const createComponents = (items = []) => (Array.isArray(items) ? items : [items]).map((item) => {
  const element = document.createElement("div");
  element.innerHTML = item;
  return element;
});

const readme = [
  "Minimal es7 webpack project",
  "- babel-es2015, babel-stage-0",
  "- seperation in chunks (manifest, vendor, main)",
  "- css import for js files",
  "- html generation with hash for files names",
  "- uglifying",
  "- source maps",
  "- dev server",
  "- hot reload"
];

const components = createComponents([].concat(readme, ["Execution: " + moment().format("MMMM Do YYYY, h:mm:ss a")]));

console.debug("components", components);

components.forEach((component) => document.body.appendChild(component));
