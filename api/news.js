// api/news.js (create this folder+file at root level, NOT inside src)
export default async function handler(req, res) {
  const { category = "general" } = req.query;
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;

  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&token=${API_KEY}&max=12`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch news" });
  }
}