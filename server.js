const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

// Serve static files (style.css, script.js, images) from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Serve index.html when visiting "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Frontend running at http://localhost:${PORT}`);
});
