import { app, BrowserWindow, ipcMain } from "electron";
import * as path from "path";
import { Duck } from "../shared/types/system";
import { addItem, getData } from "./dataService";

const isDev = process.env.NODE_ENV === "development";

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

// IPC handlers to interact with renderer process
ipcMain.handle("get-data", async () => {
  return await getData();
});

ipcMain.handle("add-item", async (_, item: Duck) => {
  return await addItem(item);
});
