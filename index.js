import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const categoryIds = req.query.categoryIds || "650,362,361";
    const pageSize = req.query.pageSize || 30;

    const apiUrl = `https://gateway.batdongsan.com.vn/api/Article/GetArticleListV2?categoryIds=${categoryIds}&page=${page}&pageSize=${pageSize}`;

    const r = await fetch(apiUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": "https://batdongsan.com.vn/",
        "Origin": "https://batdongsan.com.vn/",
      }
    });

    const text = await r.text();
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.send(text);

  } catch (err) {
    res.status(500).json({ error: err.toString() });
  }
});

app.get("/test", (req, res) => {
  res.send("Proxy is running OK!");
});

app.listen(3000, () => console.log("Proxy started on port 3000"));
