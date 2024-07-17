import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import * as fs from "fs";
import { Duck } from "../shared/types/system";

const isDev = process.env.NODE_ENV === "development";

const dataFilePath = path.join(__dirname, "data.json");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev) {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, "frontend", "index.html");
    win.loadFile(indexPath);
  }
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

async function getData(): Promise<Duck[]> {
  return new Promise((resolve, _) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) resolve([]);
      else resolve(JSON.parse(data));
    });
  });
}

async function addItem(item: Duck) {
  const data = await getData();
  data.push(item);
  return new Promise((resolve, reject) => {
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve(item);
      }
    });
  });
}

// IPC handlers to interact with renderer process
ipcMain.handle("get-data", async () => {
  return await getData();
});

ipcMain.handle("add-item", async (_, item: Duck) => {
  return await addItem(item);
});
