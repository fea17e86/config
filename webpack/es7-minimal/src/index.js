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
  "- file names with hash"
];

createComponents([].concat(readme, ["Execution: " + moment().format("MMMM Do YYYY, h:mm:ss a")]))
  .forEach((component) => document.body.appendChild(component));
