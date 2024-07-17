const fs = require("fs");
const path = require("path");

const sourceDir = path.join(__dirname, "frontend", "dist");
const destDir = path.join(__dirname, "dist", "electron", "client");

// Function to copy files and directories recursively
function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest);
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Ensure destination directory exists
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Copy files and directories from source to destination
copyRecursiveSync(sourceDir, destDir);

console.log(`Files from ${sourceDir} have been copied to ${destDir}`);
