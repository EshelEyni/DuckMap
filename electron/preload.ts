import { contextBridge, ipcRenderer } from "electron";
import { Duck } from "shared/types/system";

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, (process.versions as any)[dependency]);
  }
});

contextBridge.exposeInMainWorld("electronAPI", {
  getData: () => ipcRenderer.invoke("get-data"),
  addItem: (item: Duck) => ipcRenderer.invoke("add-item", item),
});
