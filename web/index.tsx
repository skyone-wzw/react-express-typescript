import React from "react";
import ReactDOM from "react-dom/client";
import "./default.css";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
root.render(
    (() => <p>123456</p>)(),
);

fetch("/api", {headers: {"Accept": "application/json"}})
    .then(head => head.json())
    .then(console.log);

if (module && module.hot) {
    module.hot.accept();
}
