const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const requiredFiles = [
  "index.html",
  "styles.css",
  "app.js",
  "assets/ilan.jpg",
];
const requiredInHtml = ["styles.css", "app.js"];

let failed = false;

console.log("Verifying build...");

for (const file of requiredFiles) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    console.error("Missing:", file);
    failed = true;
  }
}

const htmlPath = path.join(root, "index.html");
const html = fs.readFileSync(htmlPath, "utf8");
for (const ref of requiredInHtml) {
  if (!html.includes(ref)) {
    console.error("index.html does not reference:", ref);
    failed = true;
  }
}

if (!html.includes("</html>") || !html.includes("<html")) {
  console.error("index.html appears invalid (missing html tags)");
  failed = true;
}

if (failed) {
  process.exit(1);
}
console.log("Build OK");
process.exit(0);
