import { Duck } from "../../../shared/types/system";

async function getDucksFromFile() {
  return await window.electronAPI.getData();
}

async function addDuckToFile(duck: Duck) {
  return await window.electronAPI.addItem(duck);
}

export default { getDucksFromFile, addDuckToFile };
