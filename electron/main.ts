import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  const indexPath = path.join(__dirname, "dist", "index.html");
  console.log(indexPath);
  win.loadFile(indexPath);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Function to read JSON file
function readJSONFile(filePath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

// Function to write to JSON file
function writeJSONFile(filePath: string, data: any) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8", (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(true);
      }
    });
  });
}

// IPC event listeners
ipcMain.handle("read-data", async (event) => {
  try {
    const data = await readJSONFile(path.join(__dirname, "data.json"));
    return data;
  } catch (error) {
    console.error("Error reading JSON file:", error);
    throw error;
  }
});

ipcMain.handle("write-data", async (event, newData) => {
  try {
    await writeJSONFile(path.join(__dirname, "data.json"), newData);
    return true;
  } catch (error) {
    console.error("Error writing to JSON file:", error);
    throw error;
  }
});
