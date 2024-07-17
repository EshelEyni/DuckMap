import * as path from "path";
import * as fs from "fs";
import { Duck } from "../shared/types/system";

const dataFilePath = path.join(__dirname, "data.json");

export async function getData(): Promise<Duck[]> {
  return new Promise((resolve, _) => {
    fs.readFile(dataFilePath, "utf8", (err, data) => {
      if (err) resolve([]);
      else resolve(JSON.parse(data));
    });
  });
}

export async function addItem(item: Duck) {
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
