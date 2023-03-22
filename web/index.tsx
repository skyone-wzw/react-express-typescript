import React from "react";
import ReactDOM from "react-dom/client";
import "./default.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    <h1>Hello world!</h1>,
);

fetch("/api", {headers: {"Accept": "application/json"}})
    .then(head => head.json())
    .then(console.log);

if (module && module.hot) {
    module.hot.accept();
}
