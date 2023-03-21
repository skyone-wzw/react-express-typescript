import express from "express";
import path from "path";

const STATIC_DIR = path.resolve("build");
const app = express();

app.use(express.static(STATIC_DIR));

// Your APIs there:
// app.use(/* Some APIs */)
app.get("/api", (req, res) => {
    res.json({version: "0.1.0"});
});

app.get("*", (req, res, next) => {
    if (req.header("Accept") !== "application/json") {
        res.sendFile(path.resolve(STATIC_DIR, "index.html"));
    }
    next();
});

// Need to change the port in </scripts/webpack/dev.js#devServer.proxy[0].target> for dev.
app.listen(9000, () => {
    console.log("Listen on: http://localhost:9000");
});
