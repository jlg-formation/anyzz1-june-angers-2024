import express from "express";
import serveIndex from "serve-index";
import morgan from "morgan";
import { api } from "./api";

const app = express();
const wwwDir = ".";
const port = process.env.AGS_PORT || 3000;

app.use(morgan("dev"));

app.use("/api", api);

app.use(express.static(wwwDir));
app.use(serveIndex(wwwDir, { icons: true }));

app.listen(3000, () => {
  console.log(`Successfully started on port ${port}`);
});
