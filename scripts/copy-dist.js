import fs from "fs";
import path from "path";

const src = path.resolve(".output/public");
const dest = path.resolve("dist");

if (fs.existsSync(src)) {
  fs.mkdirSync(dest, { recursive: true });
  fs.cpSync(src, dest, { recursive: true });
  console.log("✓ Successfully copied build output from .output/public to dist/");
} else {
  console.warn("⚠️ Warning: .output/public does not exist.");
}
