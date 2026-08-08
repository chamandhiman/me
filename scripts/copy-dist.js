import fs from "fs";
import path from "path";

const distDir = path.resolve("dist");
const outputPublicDir = path.resolve(".output/public");

// If .output/public exists, copy assets into dist/
if (fs.existsSync(outputPublicDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  fs.cpSync(outputPublicDir, distDir, { recursive: true });
  console.log("✓ Successfully copied build output to dist/");
}

// Copy dist/index.html to dist/404.html for GitHub Pages SPA routing support
const indexHtmlPath = path.join(distDir, "index.html");
const fallbackHtmlPath = path.join(distDir, "404.html");

if (fs.existsSync(indexHtmlPath)) {
  fs.copyFileSync(indexHtmlPath, fallbackHtmlPath);
  console.log("✓ Successfully created dist/404.html for GitHub Pages fallback.");
} else {
  console.warn("⚠️ Warning: dist/index.html not found.");
}
