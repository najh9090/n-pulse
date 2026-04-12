const http = require("http");

let reviews = [];

const server = http.createServer((req, res) => {

  // السماح للمتصفح
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  // إضافة تقييم
  if (req.method === "POST" && req.url === "/review") {
    let body = "";

    req.on("data", chunk => body += chunk);

    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        reviews.push(data);
        res.end(JSON.stringify({ ok: true }));
      } catch {
        res.end(JSON.stringify({ ok: false }));
      }
    });
  }

  // عرض التقييمات
  else if (req.method === "GET" && req.url === "/reviews") {
    res.end(JSON.stringify(reviews));
  }

  else {
    res.end("Server Running 🔥");
  }
});

server.listen(3000, () => {
  console.log("http://localhost:3000");
});