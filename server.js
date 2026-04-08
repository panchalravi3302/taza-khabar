require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/api/news", async (req, res) => {
  const { category = "general" } = req.query;
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  console.log("API_KEY:", API_KEY);
  console.log("Category:", category);

  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&token=${API_KEY}&max=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("GNews response:", data);
    res.json(data);
  } catch (error) {
    console.error("Fetch error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

app.listen(3001, () => console.log("✅ API server running on port 3001"));