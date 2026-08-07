import fs from "fs";
import path from "path";

const src = path.resolve(".output/public");
const dest = path.resolve("dist");

if (fs.existsSync(src)) {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log("✓ Successfully copied build output from .output/public to dist/");

  // Find generated CSS and JS files in dist/assets
  const assetsDir = path.join(dest, "assets");
  if (fs.existsSync(assetsDir)) {
    const files = fs.readdirSync(assetsDir);
    const cssFile = files.find((f) => f.startsWith("styles-") && f.endsWith(".css"));
    const jsFile = files.find((f) => f.startsWith("index-") && f.endsWith(".js"));

    const cssTag = cssFile ? `<link rel="stylesheet" href="/portfolio/assets/${cssFile}">` : "";
    const jsTag = jsFile ? `<script type="module" src="/portfolio/assets/${jsFile}"></script>` : "";

    const htmlContent = `<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Chaman Lal — UI/UX Designer & Responsive Front-End Developer</title>
    <meta name="description" content="Portfolio of Chaman Lal, Sr. UI/UX Designer and Front-End Developer with 8+ years of continuous product experience across driving school software ecosystems, enterprise dashboards, and responsive web platforms." />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700&family=Manrope:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" />
    <link rel="icon" href="/portfolio/favicon.ico" type="image/x-icon" />
    ${cssTag}
  </head>
  <body class="dark bg-ink text-foreground">
    <div id="root"></div>
    ${jsTag}
  </body>
</html>`;

    fs.writeFileSync(path.join(dest, "index.html"), htmlContent, "utf-8");
    fs.writeFileSync(path.join(dest, "404.html"), htmlContent, "utf-8");
    console.log("✓ Successfully generated dist/index.html and dist/404.html for GitHub Pages");
  }
} else {
  console.warn("⚠️ Warning: .output/public does not exist.");
}
