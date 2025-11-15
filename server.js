import express from "express";
import fetch from "node-fetch";
import pkg from "https-proxy-agent";
const { HttpsProxyAgent } = pkg;

const app = express();
const PORT = process.env.PORT || 3000;

// Residential proxy có user/pass
//const PROXY = "http://username:password@ip:port";
const PROXY = "http://shopuytin49901:v58kt@103.82.132.171:49901";

app.get("/bds", async (req, res) => {
  try {
    const page = req.query.page || 1;
    const url = `https://batdongsan.com.vn/nha-dat-ban-nhon-trach-dna?page=${page}`;
    const agent = new HttpsProxyAgent(PROXY);

    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        "Accept-Language": "vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7"
      },
      agent
    });

    const html = await response.text();
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.send(html);

  } catch (err) {
    res.status(500).send(err.toString());
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
