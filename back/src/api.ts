import { json, Router } from "express";
import { Article, NewArticle } from "./interfaces/article";

const generateId = () =>
  Date.now() + "_" + (Math.random() * 1e9).toFixed().padStart(10, "0");

let articles: Article[] = [
  { id: "a1", name: "Tournevis", price: 2.99, qty: 123 },
  { id: "a2", name: "Pelle", price: 5.4, qty: 51 },
];

const app = Router();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.get("/articles", (req, res) => {
  res.json(articles);
});

app.use(json());

app.post("/articles", (req, res) => {
  const newArticle: NewArticle = req.body;
  if (newArticle.name === "bad") {
    res.status(400).end("Cannot add bad article");
    return;
  }
  const id = generateId();
  const article = { ...newArticle, id };
  articles.push(article);
  res.json({ id });
});

app.delete("/articles", (req, res) => {
  const ids: string[] = req.body;
  if (ids.length === 3) {
    res.status(400).end("cannot delete 3 items at same time");
    return;
  }
  articles = articles.filter((a) => !ids.includes(a.id));
  res.status(204).end();
});

const blackListWords = new Set(["zut", "crotte"]);
app.get("/validation", (req, res) => {
  const word = req.query.word as string;
  res.json(!blackListWords.has(word));
});

export const api = app;
